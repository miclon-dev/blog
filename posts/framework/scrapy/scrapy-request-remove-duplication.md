---
# 这是文章的标题
title: Scrapy源码学习-请求去重(单机)
# 这是页面的图标
icon: spider
# 这是侧边栏的顺序
order: 1
# 设置写作时间
date: 2022-02-15
# 一个页面可以有多个分类
category:
- scrapy
- python
# 一个页面可以有多个标签
tag:
- scrapy
- spider
- 源码学习
# 此页面会在文章列表置顶
sticky: true
# 此页面会出现在文章收藏中
star: true
---

### 请求去重
这是爬虫岗一道高频出现的面试题：

Q：对于重复的请求，scrapy是如何去重的？去重原理是什么？请求是如何计算唯一性的？


带着这个问题，进入今天的主题。

### DUPEFILTER_CLASS
在scrapy项目配置中，`DUPEFILTER_CLASS`是框架对请求去重规则的设置项。默认的类路径：`scrapy.dupefilters.RFPDupeFilter`。

进入到文件中，观察到类*RFPDupeFilter*继承自*BaseDupeFilter*，而*BaseDupeFilter*似乎什么都没做，只是定义了一些方法。所以，真正的去重核心代码都在*RFPDupeFilter*类中。逐行分析下其原理。
<!--more-->
### RFPDupeFilter

```python
class RFPDupeFilter(BaseDupeFilter):
    """Request Fingerprint duplicates filter"""

    def __init__(self, path=None, debug=False):
        self.file = None
        # 用python内置set()作为请求的指纹
        # set的特性：无序不重复元素集
        self.fingerprints = set()
        self.logdupes = True
        self.debug = debug
        self.logger = logging.getLogger(__name__)
        # 本地持久化请求指纹
        if path:
            self.file = open(os.path.join(path, 'requests.seen'), 'a+')
            self.file.seek(0)
            self.fingerprints.update(x.rstrip() for x in self.file)

    @classmethod
    def from_settings(cls, settings):
        # 配置中开启DEBUG，就会持久化文件
        debug = settings.getbool('DUPEFILTER_DEBUG')
        return cls(job_dir(settings), debug)

    def request_seen(self, request):
        # ！！！核心，用于检测指纹是否存在。
        # 使用request_fingerprint来获取请求的指纹
        fp = self.request_fingerprint(request)
        # 指纹在集合中，返回True
        if fp in self.fingerprints:
            return True
        # 不在集合中，追加到集合里
        self.fingerprints.add(fp)
        if self.file:
            self.file.write(fp + '\n')

    def request_fingerprint(self, request):
        # 调用scrapy的request_fingerprint来进行指纹计算
        return request_fingerprint(request)

    def close(self, reason):
        # 资源销毁
        if self.file:
            self.file.close()

    def log(self, request, spider):
        # 日志的输出和记录
        if self.debug:
            msg = "Filtered duplicate request: %(request)s (referer: %(referer)s)"
            args = {'request': request, 'referer': referer_str(request)}
            self.logger.debug(msg, args, extra={'spider': spider})
        elif self.logdupes:
            msg = ("Filtered duplicate request: %(request)s"
                   " - no more duplicates will be shown"
                   " (see DUPEFILTER_DEBUG to show all duplicates)")
            self.logger.debug(msg, {'request': request}, extra={'spider': spider})
            self.logdupes = False

        spider.crawler.stats.inc_value('dupefilter/filtered', spider=spider)
```
上述代码非常简单，简单到任何人都可以自己轻松写一个。其中`request_seen`方法用于检测请求是否重复，返回True则重复，否则通过。其中核心的是调用了`request_fingerprint`来计算指纹。进去看看。

### request_fingerprint

> The request fingerprint is a hash that uniquely identifies the resource the request points to
请求指纹是唯一标识请求指向的资源的哈希值

```python
def request_fingerprint(request, include_headers=None, keep_fragments=False):
    # 是否计算headers
    if include_headers:
        include_headers = tuple(to_bytes(h.lower()) for h in sorted(include_headers))
    cache = _fingerprint_cache.setdefault(request, {})
    cache_key = (include_headers, keep_fragments)
    if cache_key not in cache:
        # 开始计算，加密算法sha1
        fp = hashlib.sha1()
        # 将请求方式和请求url，请求的body加入计算，
        # 此处的url如果指向同一个资源，同样认为一样，比如：
             # http://www.example.com/query?id=111&cat=222
            # http://www.example.com/query?cat=222&id=111
        # 这两个url指向同一目标，我们也认为是重复的request.url
        fp.update(to_bytes(request.method))
        fp.update(to_bytes(canonicalize_url(request.url, keep_fragments=keep_fragments)))
        fp.update(request.body or b'')
        # headers加入计算
        if include_headers:
            for hdr in include_headers:
                if hdr in request.headers:
                    fp.update(hdr)
                    for v in request.headers.getlist(hdr):
                        fp.update(v)
        cache[cache_key] = fp.hexdigest()
    return cache[cache_key]
```

### 调度器的执行流程

在scrapy的调度器代码中*Scheduler*，通过类方法`from_crawler`读取配置项中`DUPEFILTER_CLASS`的类路径，使用`load_object`加载并通过`create_instance`实例化对象。赋给属性`self.df`

```python
class Scheduler:
    
    def __init__(self, dupefilter, jobdir=None, dqclass=None, mqclass=None,
                 logunser=False, stats=None, pqclass=None, crawler=None):
        self.df = dupefilter
        ……

    @classmethod
    def from_crawler(cls, crawler):
        settings = crawler.settings
        dupefilter_cls = load_object(settings['DUPEFILTER_CLASS'])
        dupefilter = create_instance(dupefilter_cls, settings, crawler)
        ……
        return cls(dupefilter, jobdir=job_dir(settings), logunser=logunser,
                   stats=crawler.stats, pqclass=pqclass, dqclass=dqclass,
                   mqclass=mqclass, crawler=crawler)

    def open(self, spider):
        ……
        return self.df.open()

    def close(self, reason):
        ……
        return self.df.close(reason)

    def enqueue_request(self, request):
        if not request.dont_filter and self.df.request_seen(request):
            self.df.log(request, self.spider)
            return False
        ……
        return True
```
调度器被打开open、关闭close、请求入列enqueue_request的时候
分别触发过滤器的打开open、关闭close、计算指纹request_seen。

当构造请求时，参数`dont_filter`为False的时候，才会进入去重计算。

新手经常犯的错。`dont_filter`=True认为是去重。实际上国外人思维和我们直接表达不同。可能我们做参数就`filter`=True是过滤，`filter`=False就不过滤。加了dont，dont_filter=True 翻译过来就是：不过滤？是的。

### 总结

现在再来回答面试官的问题：

Q：对于重复的请求，scrapy是如何去重的？去重原理是什么？请求是如何计算唯一性的？

A：scrapy是通过配置文件中DUPEFILTER_CLASS属性来选择去重的方法。默认情况下，是调用scrapy.dupefilters.RFPDupeFilter。
scrapy请求是通过Python内置set不重复集合的特性来做本地去重的。
其加密算法是sha1。默认情况针对请求的方式、url、body来做唯一性计算。

核心两点：set 指纹去重，sha1加密计算指纹。
