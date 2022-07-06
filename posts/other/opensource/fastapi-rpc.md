---
# 这是文章的标题
title: 基于FastAPI的浏览器RPC服务端
shortTitle: 逆向神器 - 浏览器RPC
# 这是页面的图标
icon: api
# 这是侧边栏的顺序
order: 1
# 设置写作时间
date: 2022-07-06
# 一个页面可以有多个分类
category:
- 开源
# 一个页面可以有多个标签
tag:
- fastapi
- rpc
- open-source
# 此页面会在文章列表置顶
sticky: true
# 此页面会出现在文章收藏中
star: true
isOriginal: true
---

# FastAPI RPC

开源地址: [Github](https://github.com/mic1on/fastapi_rpc)

这是一个基于 FastAPI 的 浏览器 RPC 服务端。
> 此浏览器可以是任何端(pc/手机/平板)的任意浏览器

它提供了一个WS服务和一个HTTP服务。WS服务负责浏览器群和服务端的通信；HTTP服务负责提供一个HTTP接口，用户通过调用接口实现调用远程浏览器群的方法。

此项目主要思路来自于 [sekiro](https://github.com/virjar/sekiro)。项目的初衷是学习并分享学习成果，请勿用于非法用途。

### 作用

当你苦于网站层层加密无法解密时，当你遇到诸如动态cookie加密时，你可以考虑使用此项目，这是解决方案之一。

### 使用

- 方式1：docker
> docker run --name rpc -p 8000:8000 -d miclon/fastapi_rpc

```text
支持环境变量：
WORKERS_PER_CORE: 每个CPU核工作线程数量，默认为1
MAX_WORKERS：工作进程，默认是按CPU核心数量*WORKERS_PER_CORE
```

- 方式2：clone本地运行

1. 首先你需要确保成功运行python主程序`main.py`
2. 将提供给你的`client.js`注入到浏览器中。注入方式作者用的是油猴。
3. 将浏览器打开任意网站，比如百度。（这时候油猴脚本是将client.js注入到页面里的）
4. 此时，你可以在电脑终端中执行：
> curl http://localhost:8000/do/cookies

你将在终端看到你访问百度留下的cookies

![](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20220705232431.png)

以上就是一次项目的初体验，如果以上步骤非常顺利，那么你可以继续向下看。

### 新增功能

刚刚看到了，我们在API接口调用了/do/cookies，那是因为我们在`client.js`中注册了此方法名称。
```javascript
client.registerAction("cookies",function(request, resolve,reject ){
        resolve(document.cookie);
})
```
所以，顺理成章地，我们可以自定义其他任意操作，比如：
```javascript
client.registerAction("html",function(request, resolve,reject ){
        resolve(document.documentElement.outerHTML);
})
```
随后，我们调用：
> curl http://localhost:8000/do/html -o baidu.txt

ps: -o 输出到文件baidu.txt

![](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20220705234115.png)

### 举例应用场景

##### 某网站登录

其网站登录的时候密码是加密的。

![](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20220705234828.png)

尝试找到调用处。

![](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20220705234952.png)

这里就是它的加密方法。
```javascript
encryptedString(key_to_encode, that.password.val())
```

以往的方式，我们需要进入这个方法，抠出它的实现过程。要么还原要么node调用执行。

现在，不需要这些，直接复制这个加密。

```javascript
client.registerAction("mm",function(request, resolve,reject ){
        resolve(encryptedString(key_to_encode, "qq1234"));
})
```
调用：

> curl http://localhost:8000/do/mm

得到加密结果：

![](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20220705235309.png)


### 更多场景
……
