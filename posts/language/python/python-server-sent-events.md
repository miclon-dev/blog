---
title: python实现SSE服务器单向消息推送
shortTitle: python实现SSE消息推送
icon: python
order: 1
date: 2022-07-22
category:
- python
tag:
- sse
- websocket
# 此页面会在文章列表置顶
sticky: true
# 此页面会出现在文章收藏中
star: true
isOriginal: true
---

## 前言
最近公司的web项目中需要使用到消息实时推送，能够及时将重要线索推送给责任人，一开始想的是采用较为成熟的WS方案。但经过需求分析后我认为在这个场景下，使用SSE更合适。

## 技术栈选择
主要原因如下：
1. 消息业务是单向的，不需要双向的消息推送；相较于ws双工通道有更低的开销。
2. 需求实现相较于WS更为简单，只需很少量的代码集成即可实现。
3. 不限制开发语言，JAVA、Python等都可以实现。
4. 浏览器支持SSE，不需要额外的代码。
5. 相比于传统的http轮询，SSE更为减轻服务端压力和数据时效性。

其中，最核心的也就是：我们的需求是单向的消息推送。

目前业务代码是有JAVA同学来实现的，但是我不妨使用python也实现一下，万一以后需要呢？

## 基于FastAPI实现

- 安装依赖包

```bash
pip install "fastapi[all]"
pip install sse-starlette
```

完整代码实现：

```python
# -*- coding: utf-8 -*-
import random
import asyncio

import uvicorn
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from sse_starlette.sse import EventSourceResponse

app = FastAPI()
# 跨域设置，因为测试需要前端访问，所以允许所有域访问
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get('/stream')
async def stream(request: Request):
    def new_count():
        return random.randint(1, 100)

    async def event_generator():
        index = 0
        while True:
            index += 1
            if await request.is_disconnected():
                break
            # 测试取随机数据，每次取一个随机数
            if count := new_count():
                yield {'data': count}

            await asyncio.sleep(1)

    return EventSourceResponse(event_generator())


if __name__ == '__main__':
    uvicorn.run('main:app', reload=True)
```

接下来，开启服务，在浏览器访问：
> http://127.0.0.1:8000/stream

可以观察到，随机数字间隔一秒输出。

既然我们都开启了跨越了，那试着将这个接口接入到web前端服务中。

![](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/demo-2022-07-23.gif)


## 基于Flask实现

相较于fastapi，flask更为极简。
```bash
pip install flask
```

```python
# -*- coding: utf-8 -*-
import random
import time

from flask import Flask, Response

app = Flask(__name__)


@app.route('/stream')
def stream():
    def new_count():
        return random.randint(1, 100)

    def eventStream():
        while True:
            if count := new_count():
                yield 'id: %d\n' % id + 'data: %s\n\n' % count
            time.sleep(1)

    return Response(eventStream(), mimetype="text/event-stream")


if __name__ == '__main__':
    app.run(debug=True, port=8888)
```

## Javascript客户端

为了能够直接体验到SSE的魅力，在浏览器控制台键入以下代码即可链接服务端。

```javascript
const source = new EventSource("http://127.0.0.1:8000/stream")
source.addEventListener('message', function (event) {
    console.log(event.data)
}, false);
```

## 结语

以上是python实现sse的核心基础代码，而真正项目中则需要用到数据库等系列操作，包括消息分发给指定的接收人等等。本文主要是就业务场景而言，选择合适的技术来实现需求。


end.

参考：
[event-source-polyfill](https://www.npmjs.com/package/event-source-polyfill)
