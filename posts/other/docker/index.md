---
# 这是文章的标题
title: Docker基础教程
---

## 初始环境
#### 卸载旧版本
::: code-tabs#shell

@tab ubuntu
```bash
sudo apt-get remove docker docker-engine docker.io containerd runc
```

@tab centos
```bash
sudo yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-engine
```
:::

#### 其他配置项
::: code-tabs#shell

@tab ubuntu
```bash
# 更新apt-get
sudo apt-get update
# 安装包以允许apt通过 HTTPS 使用存储库
sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common
# 添加 Docker 的官方 GPG 密钥
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
# 添加软件源
sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"
# 更新apt包索引
sudo apt-get update
```

@tab centos
```bash
# 安装工具包
sudo yum install -y yum-utils \
  device-mapper-persistent-data \
  lvm2

# 添加软件仓库
sudo yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo

sudo yum-config-manager --enable docker-ce-nightly
sudo yum-config-manager --enable docker-ce-test
sudo yum-config-manager --disable docker-ce-nightly
```
:::


#### 安装docker
::: code-tabs#shell

@tab ubuntu
```bash
# 安装最新版本的 Docker CE 和 containerd
sudo apt-get install docker-ce docker-ce-cli containerd.io
# 停止、启动、重启 docker
sudo systemctl start | stop | restart docker.service
# 加入开机自启
sudo systemctl enable docker
# 开机启动检测
sudo systemctl list-unit-files | grep docker
```

@tab centos

```bash
# 默认源里的containerd.io版本太低，需要安装最新版本
sudo yum -y install https://download.docker.com/linux/centos/7/x86_64/stable/Packages/containerd.io-1.2.6-3.3.el7.x86_64.rpm
# 安装最新版本 docker
sudo dnf install -y docker-ce docker-ce-cli containerd.io
# 启动 DOCKER
sudo systemctl start docker
# 将 docker 加入系统启动服务，使其开机自动运行
sudo systemctl enable docker
```
:::

## 镜像加速

#### Linux
1. 修改配置文件
```bash
sudo vim /etc/docker/daemon.json
```
2. 添加国内镜像
```json
{
  "registry-mirrors": [
    "https://hub-mirror.c.163.com",
    "https://mirror.ccs.tencentyun.com",
    "https://docker.mirrors.ustc.edu.cn"
  ]
}
```
3. 更新镜像缓存
```bash
sudo systemctl daemon-reload
sudo systemctl restart docker
```

#### MAC & Windows
右键点击桌面顶栏的 docker 图标，选择 Preferences ，在 Daemon 标签（Docker 17.03 之前版本为 Advanced 标签）下的 Registry mirrors 列表中加入下面的镜像地址:
```text
http://f1361db2.m.daocloud.io
或
http://hub-mirror.c.163.com
```
点击 Apply & Restart 按钮使设置生效。


## 镜像管理

#### 搜索镜像
```bash
docker search [镜像名称]
```
#### 安装镜像
使用 pull 可以从 [仓库](https://hub.docker.com/search?q=&type=image)下载镜像
```bash
docker pull lorisleiva/laravel-docker
```
但官方组织中的镜像可以省略组织名，如 hello-world 是官方镜像可以简写
```bash
docker pull hello-world
```
使用 run 命令用来通过镜像生成容器，如果镜像不存在会从仓库下载，也就是具有 pull 功能
```bash
docker run hello-world
```

#### 查看镜像
```bash
docker images
```
