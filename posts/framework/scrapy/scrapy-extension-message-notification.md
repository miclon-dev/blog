---
# 这是文章的标题
title: Scrapy扩展-消息通知
# 这是页面的图标
icon: spider
# 设置写作时间
date: 2021-09-17
# 一个页面可以有多个分类
category:
- scrapy
- python
# 一个页面可以有多个标签
tag:
- scrapy
- extension
# 此页面会在文章列表置顶
sticky: true
# 此页面会出现在文章收藏中
star: true
---

### 背景


使用过scrapy的开发者都知道，scrapy在爬取结束后是允许发送邮件通知的
它内部是通过外部扩展extension的方式集成于scrapy。

<!--more-->
想要一探究竟可以查看scrapy源码或翻阅官方文档
邮件实现功能类
[https://docs.scrapy.org/en/latest/topics/email.html](https://docs.scrapy.org/en/latest/topics/email.html)
邮件异步通知扩展类
[https://docs.scrapy.org/en/latest/topics/extensions.html#module-scrapy.extensions.statsmailer](https://docs.scrapy.org/en/latest/topics/extensions.html#module-scrapy.extensions.statsmailer)
在使用过程中需要配置邮箱的信息及收件人list，那有没有更简单明了的方案呢？
我想到的答案是：**钉钉通知**
### 钉钉自定义机器人介绍


> 钉钉机器人是钉钉群的一个高级扩展功能，但使用起来却非常简单，只需要注册一个钉钉账号，就可以将第三方服务信息聚合到钉钉群中，实现信息的自动同步。
> 常见的使用场景：
> 1、聚合Github、Gitlab等源码管理服务，实现源码更新同步；
> 2、聚合Trello、JIRA等项目协调服务，实现项目信息同步；
> 3、机器人支持Webhook自定义接入，就可以实现更多可能性，例如：将运维报警、自动化测试结果报告、工作&生活日程安排（上班打卡、下班吃饭、健身、读书、生日、纪念日...）的提醒；
> 目前自定义机器人支持文本（text）、链接（link）、markdown三种消息格式，五种消息类型，详细信息请参考[自定义机器人官方文档](https://developers.dingtalk.com/document/app/custom-robot-access?spm=ding_open_doc.document.0.0.6d9d28e1QcCPII#topic-2026027)



### 集成到Scrapy
通过阅读scrapy源码，可以很轻松的学习到其email扩展类的写法，模仿其写法，即可很简单快捷的(笔者仅用5分钟)将微信通知集成到项目中去。

邮件功能入口：scrapy/mail.py
扩展入口：scrapy/extensions/statsmailer.py

为了项目的整洁一致(洁癖)，在项目目录下新建extensions扩展包，然后编写statsding.py代码
​

```python
# -*- coding:utf-8 -*-
# @Time : 2021/4/1 9:57
# @Author : MicLon

import requests
import json
from scrapy import signals


class Ding:

    def __init__(self, key):
        self.key = key

    @classmethod
    def from_settings(cls, settings):
        return cls(
            key=settings['DD_KEY']
        )

    def send(self, title, text, at_all=False):
        """
        API 文档： https://developers.dingtalk.com/document/app/custom-robot-access?spm=ding_open_doc.document.0.0.6d9d28e1QcCPII#topic-2026027
        :param title: 首屏会话透出的展示内容。
        :param text: markdown格式的消息。
        :param at_all: 是否@所有人。
        :return:
        """
        api_url = f'https://oapi.dingtalk.com/robot/send?access_token={self.key}'
        api_body = {"msgtype": "markdown", "markdown": json.dumps({"title": title, "text": text, "isAtAll": at_all})}
        headers = {'Content-Type': 'application/json'}
        resp = requests.post(url=api_url, json=api_body, headers=headers)
        if resp.status_code == 200:
            return True
        return False


class StatsDing:

    def __init__(self, stats, dd):
        self.stats = stats
        self.dd = dd

    @classmethod
    def from_crawler(cls, crawler):
        dd = Ding.from_settings(crawler.settings)
        o = cls(crawler.stats, dd)
        crawler.signals.connect(o.spider_closed, signal=signals.spider_closed)
        return o

    def spider_closed(self, spider):
        spider_stats = self.stats.get_stats(spider)
        body = "Global stats\n\n"
        body += "\n".join("%-50s : %s" % i for i in self.stats.get_stats().items())
        body += "\n\n%s stats\n\n" % spider.name
        body += "\n".join("%-50s : %s" % i for i in spider_stats.items())
        return self.dd.send(spider.name, body)

```
别忘了需要在设置中配置钉钉机器人提供的**access_token**并且**开启扩展**
```python
DD_KEY = '6d37b5526f5**********************178cfba0'
EXTENSIONS = {
   '项目名.extensions.statsding.StatsDing': 500
}
```
### 测试


项目结束后，钉钉收到消息：


![](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20220608082659.png)
