---
title: 史上最简单GitHub Actions发布Docker多平台镜像
icon: git
order: 2
date: 2022-06-28
category:
- git
tag:
- github
- actions
- docker
# 此页面会在文章列表置顶
sticky: true
# 此页面会出现在文章收藏中
star: true
isOriginal: true
---

### 前言

最近开发一个Node项目，里面使用了GitHub Actions来做镜像的打包与发布，并且docker镜像可以支持多平台。

### 流程

- step1: 

如往常一样，需要先编写好镜像的Dockerfile，然后把Dockerfile放到项目的根目录下。

```dockerfile
FROM zenato/puppeteer

USER root

COPY . /app

RUN cd /app && npm install --quiet

EXPOSE 3000

WORKDIR /app

CMD npm run start
```

- step2:

在项目根目录下建立github workflow

> .github/workflows/docker-image.yml

- step3:

编写github workflow的规则。

本次Docker workflow使用的是：`ilteoood/docker_buildx@master`，它可以十分简单方便的配置多平台的镜像。
```yaml
name: Docker Image CI

on:       # 触发器
  push:   # 当镜像推送到仓库时触发
    branches: [ ci ]  # 只触发ci分支的推送

jobs:    # 任务
  build:  # 构建镜像
    runs-on: ubuntu-latest  # 构建ubuntu-latest平台的镜像
    steps:  # 构建步骤
      - uses: actions/checkout@v2 # 官方镜像，用于checkout代码
        name: Check out code  # 步骤名称

      - uses: ilteoood/docker_buildx@master # docker_buildx镜像，用于构建镜像
        name: Build & push Docker image # 步骤名称
        with: # 参数，可以指定构建的action中查看
          publish: true
          imageName: miclon/puppeteer-render
          tags: latest
          platform: linux/amd64,linux/arm64,linux/arm/v7
          dockerHubUser: ${{ secrets.DOCKER_USERNAME }}
          dockerHubPassword: ${{ secrets.DOCKER_PASSWORD }}
```

- step4:

你可以发现，上面`docker-image.yml`中有两个变量分别是：`DOCKER_USERNAME`和`DOCKER_PASSWORD`，
这两个变量是在GitHub Actions中配置的。

进入github的此项目中，点击右上角的`Settings`，然后点击`Secrets`，添加两个新的变量，如下图：

![](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20220628141924.png)


- step5:

接下来，你可以在`ci`分支上，push本地代码到GitHub，然后在GitHub Actions中，会自动运行此workflow。

观察效果：

github actions

![](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20220628143737.png)

dockerhub

![](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20220628143907.png)

在服务器上拉取镜像并运行：

![](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20220628144027.png)

接口测试：

![](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20220628144133.png)

### 手动触发actions

有些时候，你并不想因为某些事件直接触发actions，而是想手动触发。只需要在触发器(on)上添加`workflow_dispatch`即可。

比如上述的`docker-image.yml`中，我想手动触发，并且我想指定build的平台，那么可以这样写：


```yaml
...

on:
  workflow_dispatch:
    inputs:
      platform:
        description: 'Platform to build for'
        required: true
        default: 'linux/amd64,linux/arm64,linux/arm/v7'

...

```

这样的效果就是，我们可以在github的actions中，手动触发workflow，并且可以指定平台。并且指定参数`platform`的值，会传递给镜像。

我们可以通过`github.event.inputs.platform`来获取到这个值。


![](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20221027091511.png)


手动`run workflow`：

![](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20221027091556.png)
