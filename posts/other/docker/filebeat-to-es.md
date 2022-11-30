---
title: 小记filebeat日志收集
icon: docker
order: 1
date: 2022-11-30
category:
- filebeat
tag:
- filebeat
- logging
- docker
- es
# 此页面会在文章列表置顶
sticky: true
# 此页面会出现在文章收藏中
star: true
isOriginal: true
---

::: tip
本文并非面向新手，如果你还不了解filebeat，不了解它的配置，建议先去[官网](https://www.elastic.co/guide/en/beats/filebeat/current/index.html)学习。
:::

## 一版
项目早期使用的是logstash收集日志，后来由于logstash的性能问题，改为使用filebeat收集日志。filebeat使用go语言重写，性能极高，无依赖，配置简单。

在使用filebeat时，一开始采用的是程序将日志输出到文件，然后将日志文件映射给filebeat容器，filebeat容器将日志文件读取后发送到es。

所以，我会在程序里注册日志文件的路径，使日志输出到指定文件中。

```python
# 伪代码，会将日志输出到文件

def register_logger(app_name: str, file_or_path: str):
    logger.add(file_or_path, format=JsonFormatter("task").format, rotation="200 MB", retention="10 days")
    return logger.bind(app_name=app_name)

register_logger(app_name="app", file_or_path="/app/logs/app.log")
```

随后，我将配置filebeat的配置文件，使其准确的读取目标文件。

```yaml
filebeat.inputs:
- type: log
  enabled: true
  paths:
    - "/app/logs/*.log"

……
```

## 二版
随后第二个版本，我不再对外输出日志文件，而是直接将日志输出到stdout，然后将docker容器的log文件夹映射给filebeat容器，这样的好处就是，不管起多少个容器，只要符合我条件的日志，都将被`filebeat`收集到。未来会将`filebeat`服务集成到基础系统中，使得热部署的机器自动就能收集日志。

![](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20221130214119.png)

```python
def register_logger(app_name: str):
    logger.add(sys.stdout, format=JsonFormatter(app_name).format)
    return logger.bind(app_name=app_name)
```

```yaml
filebeat.inputs:
- type: filestream
  enabled: true
  encoding: utf-8
  paths:
    # 读取docker容器的日志文件
    - "/var/lib/docker/containers/*/*-json.log"
  parsers:
    - container:
        stream: stdout
    - ndjson:
        target: ""
        add_error_key: true
        message_key: log
……
```

## 完整的文件

### docker-compose.yml

```yaml
version: '3.3'
services:
  filebeat:
    container_name: filebeat
    # 使filebeat容器能够读取docker容器的日志文件
    user: root
    image: docker.elastic.co/beats/filebeat:8.2.0
    ports:
      - "5044:5044"
    volumes:
      # 将自定义的filebeat配置文件映射到容器中
      - ./filebeat/filebeat.yml:/usr/share/filebeat/filebeat.yml
      # 将docker容器的日志文件映射给filebeat容器，并且设置权限read-only
      - /var/lib/docker/containers:/var/lib/docker/containers:ro
    environment:
      - TZ=Asia/Shanghai
```


### filebeat.yml

```yaml
setup.ilm.enabled: false
setup.template.enabled: false

filebeat.inputs:
# 8.0版本后，filebeat的配置文件发生了变化，需要使用filestream，而不是log，也不是docker
- type: filestream
  enabled: true
  encoding: utf-8
  paths:
    # 读取docker容器的日志文件
    - "/var/lib/docker/containers/*/*-json.log"
  parsers:
    # 读取docker容器的日志文件，只读取stdout的日志
    - container:
        stream: stdout
    # json解析，由于docker日志都是{"log": {……}}包裹的，所以需要设置message_key
    - ndjson:
        target: ""
        add_error_key: true
        message_key: log
processors:
  - decode_json_fields:
      fields: ["message"]
      max_depth: 3
      target: ""
  - drop_fields:
      fields: ["ecs", "agent", "log", "host", "input"]

output.elasticsearch:
  hosts: ["http://elasticsearch:9200"]
  username: elastic
  password: elastic
```

## kibana

![](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20221130215148.png)
