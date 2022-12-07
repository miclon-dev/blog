---
title: 我用AI帮我完成了单子
icon: tool
order: 1
date: 2022-12-07
category:
- ai
isOriginal: true
---

晚上朋友介绍一个十分简单的活，正好这两天碰上了[GPT](https://chat.openai.com/chat)大火，于是想着，要不让它来帮我完成这活？

具体做的内容我简单概述下就是：只需要原生html，使用Flask作为Web框架，提供登录，注册，发消息。发消息页面需要ajax请求和轮询消息。使用Sqlite作为本地数据库，分app.db和chat.db。没错，就是这么简单。

但是笔者几乎没怎么用过Flask，但大概知道和FastAPI很像，也很久没接触Ajax这类陈旧的技术，但是我依然有信心能一晚上做好。

## 对话AI


首先编写登录注册的HTML架子


Q：给我一个HTML写的登录注册页面，登录只需要账号密码，注册需要账号，邮箱，密码和二次密码

![](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20221207212327.png)


Q：我还需要一个聊天页面，顶部是个人信息，然后是发送消息的文本框，一个发送按钮，最下面是消息列表的文本框，不需要样式

![](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20221207212752.png)

架子有了，再从Flask的Model层开始写：

Q：我要使用sqlalchemy，新建两个库连接本地Sqlite文件，并且有一个库是用户表，一个库是聊天记录表

![](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20221207213049.png)

可见，它没有真正给我连接2个数据库，这个问题不大，我复制一个就行，用户表没有密码字段，我再加一个就行，问题不大。

它还贴心给出了使用案例：

![](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20221207213205.png)

模型好了，接下来写接口。

Q：使用Flask，建立一个登录和注册接口

![](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20221207213537.png)


这里它偷懒了，居然里面啥也不写！

在我的逼问下，它给出了一个案例：

![](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20221207213629.png)

![](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20221207213654.png)

好了，大概已经差不多了，我还有一处不太会，就是ajax请求。我再问问。

Q：用Flask写一个获取消息接口，需要返回json，里面还是需要提供实际代码，然后我需要你编写javascript，使用Jquery ajax请求访问获取数据。

![](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20221207214111.png)

![](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20221207214131.png)


以上，所有核心代码都已经完毕，我这位裁缝高手只需要修修改改，即可完成。

加上这篇文章的时间，我写完整个总共花了1小时40分钟。


## 总结

经过这两天的深度使用，发现Open AI的场景远不止开发界，这只是它的冰山一角。但是至少在我了解熟悉的开发领域，还是有一些问题，比如：它给出的代码不一定是对的，它也可能是个裁缝哈哈，很多模块的接口其实不存在的，但是那些万年不变的通用方法，问题不大。比如你问冒泡算法，那肯定不差～
