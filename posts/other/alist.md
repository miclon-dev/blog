---
title: 好物分享 - AList
icon: tool
order: 1
date: 2023-01-03
category:
- 好物分享
tag:
- alist
- tool
isOriginal: true
---

::: tip
有了它，手上的NAS瞬间不香了呢！白嫖怪狂喜！
:::

## 介绍

`AList`一个支持多种存储的文件列表程序，它可以将几十种不同的存储方式整合到一个列表中，包括本地文件、网络云盘、网络相册等等。其中网络云盘支持[二十余项](https://alist.nn.ci/zh/guide/#support-storage)。初识它是油管上看到使用闲置手机搭建的，当时就觉得很酷。虽然没有闲置手机，但是有闲置的服务器，就想着在自己服务器上搭建一个，于是就有了这篇文章。


## 安装

笔者这里选择了docker-compose的方式进行安装，具体安装方法可以参考[官方文档](https://alist.nn.ci/zh/guide/install/docker.html)。

```yaml
version: '3.3'
services:
    alist:
        restart: always
        volumes:
            - '/etc/alist:/opt/alist/data'
        ports:
            - '5244:5244'
        environment:
            - PUID=0
            - PGID=0
            - UMASK=022
        container_name: alist
        image: 'xhofe/alist:latest'
```

如果你只想使用docker安装，可以使用以下命令：

```bash
docker run -d --restart=always -v /etc/alist:/opt/alist/data -p 5244:5244 -e PUID=0 -e PGID=0 -e UMASK=022 --name="alist" xhofe/alist:latest
```

随后在服务器终端上运行：
  
  ```bash
  docker-compose up -d
  ```

如果默认用上面docker-compose进行安装，服务将在端口5244上运行，你可以通过`http://ip:5244`访问。

当你成功出现以下界面时，恭喜你，安装成功了！

![](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20230103141647.png)

## 配置

上面图片中出现的错误提示，是因为我们还未能配置任何存储，所以我们需要配置一下。

点击下方登录，进入管理界面。如果不知道密码需要进入docker容器，输入：
> docker exec -it alist /bin/bash
> 
> ./alist admin


![](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20230103141954.png)

接下来即可添加存储，这里以添加`阿里云`为例。

![](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20230103142111.png)

阿里云盘需要获取刷新令牌，用于更新token，这里需要使用`阿里云盘`的`刷新令牌`，具体获取方法可以参考[官方文档](https://alist.nn.ci/zh/guide/drivers/aliyundrive.html)。

![](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20230103142351.png)

添加成功后，即可在列表中看到你的阿里云盘了。

进入首页，即可看到你的阿里云盘文件列表了。

![](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20230103142431.png)

其他存储方式，可以参考[官方文档](https://alist.nn.ci/zh/guide/drivers/common.html)。

## 页面加密

笔者发现，如果你的`AList`是公网可访问的，那么你的文件列表也是公开的，这样的话，你的文件列表就不安全了。所以，我们需要对页面进行加密。

进入管理页面，点击`元信息`后，如下图所示：

![](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20230103142752.png)


## WebDAV 

WebDAV是一种网络协议，它允许用户通过网络连接直接访问存储在服务器上的文件。`AList`支持WebDAV，可以通过WebDAV访问你的文件。

默认情况下，`AList`的WebDAV端口为`5244`，你可以通过`http://ip:5245/dav`访问。当然，这无法直接http访问，所以我们需要使用`WebDAV`客户端进行访问。

在安卓上，可以使用`ES文件浏览器`进行操作。


![](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20230103143535.png)

![](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20230103143706.png)

![](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20230103143807.png)


## 总结

本文主要是对`AList`的引荐，以及安装和配置的方法。通过它，你可以将多个不同平台的文件，统一管理起来。当然，它还有很多功能，比如：文件搜索、文件分享、文件视频预览等等，你可以自行探索。


[1] [AList](https://alist.nn.ci/zh/)
