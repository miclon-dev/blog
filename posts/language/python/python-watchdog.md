---
title: python中实现文件更新监控自重启
shortTitle: python文件变化自重启
icon: python
order: 1
date: 2022-09-06
category:
- python
tag:
- watchdog
- signal
# 此页面会在文章列表置顶
sticky: true
# 此页面会出现在文章收藏中
star: true
isOriginal: true
---

接触过很多框架都有一个这样的功能，就是当你修改了代码之后，框架会自动重启，这样就不用每次修改代码之后都手动重启了。比如：django、fastapi、flask等等一些web框架，都有这样的功能。我们可以尝试自己实现一个这样的功能。

## watchdog

> watchdog模块用于监控一个文件目录下的文件和文件夹的变动，包括文件和文件夹的增删改移。它是一个跨平台的模块，支持Linux、Windows、MacOS等操作系统。

这里不再赘述watchdog的安装及使用方法，可以参考官方文档。

我们的目的是监控一个文件夹下的所有文件，当文件发生变动时，我们需要通知处理方来做下一步处理，比如重启应用。

我们可以使用watchdog的`FileSystemEventHandler`类来实现这个功能。但是我们只想监控.py的文件变动，一种思路是监控到文件变化后，判断文件后缀名是否为\.py，如果是则通知处理方。

还有一种较优雅的方案是，我们可以继承`PatternMatchingEventHandler`类，在初始化时传入一个路径匹配模式，当文件变化时，会自动判断文件是否符合路径匹配模式，如果符合则通知处理方。

```python
class PatternMatchingEventHandler(FileSystemEventHandler):

    def __init__(self, patterns=None, ignore_patterns=None,
                 ignore_directories=False, case_sensitive=False):
        super().__init__()

        self._patterns = patterns # 路径匹配模式 ["*.py"]
        self._ignore_patterns = ignore_patterns # 忽略路径匹配模式
        self._ignore_directories = ignore_directories # 是否忽略目录
        self._case_sensitive = case_sensitive # 是否区分大小写
```

## 基本实现
```python
from watchdog.events import PatternMatchingEventHandler


class SourceChangesHandler(PatternMatchingEventHandler):

    def on_any_event(self, event):
        print(f"[{event.event_type}] caught change file {os.path.basename(event.src_path)}")
        # TODO: 后续处理
```

此时，我们只是定义了watchdog的事件处理类，还没有使用它。我们需要创建一个watchdog的`Observer`对象，然后将事件处理类添加到`Observer`对象中，最后启动`Observer`对象。

```python
def setup_file_watcher(path):
    file_event_handler = SourceChangesHandler(patterns=["*.py"])
    file_watcher = Observer()
    file_watcher.schedule(file_event_handler, path, recursive=True)
    file_watcher.start()
    return file_watcher
```

`setup_file_watcher`方法接受一个路径作为参数，传入指定路径表示监控指定路径下的文件变化，传入`"."`表示监控当前目录下的文件变化。

试试效果：

![](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/2022-09-06%2016-55-09.2022-09-06%2016_56_07.gif)


## signal

> signal模块用于设置和处理信号。信号是一种异步通知机制，用于通知进程有关事件的发生。信号是软件中断，与硬件中断不同，它是由程序发出的。

刚刚代码中有个待办事项，我们需要在文件发生变化时，通知处理方来做下一步处理，比如重启应用。我们可以使用signal模块来实现这个功能。

```python
import os
import signal

from watchdog.events import PatternMatchingEventHandler


class SourceChangesHandler(PatternMatchingEventHandler):

    def on_any_event(self, event):
        print(f"[{event.event_type}] caught change file {os.path.basename(event.src_path)}")
        # 对于当前进程发送SIGHUP信号
        os.kill(os.getpid(), signal.SIGHUP)
```

至此，我们的watchdog实现已经初步完成了。它将会在代码变更后发送SIGHUP信号给当前进程，我们可以在代码中捕获这个信号，然后做下一步处理。


### 信号接收

在另外的主程序中，可以接收到SIGHUP信号，并使它交给`signal_handler`函数处理。

```python
import os
import signal
import sys
import time


def main():

    reload_process = False

    def signal_handler(signum, frame):
        nonlocal reload_process
        reload_process = signum == getattr(signal, "SIGHUP", None)

    signal.signal(signal.SIGHUP, signal_handler)

    while True:
        time.sleep(1)
        if reload_process:
            os.execvp(sys.executable, ["python3", "main.py"])
```

首先，我们定义了一个`reload_process`变量，用于标记是否需要重启进程。然后，我们定义了一个`signal_handler`函数，用于接收信号。在`signal_handler`函数中，监控当前信号是否为`SIGHUP`信号，如果是就将`reload_process`变量设置为True，表示需要重启进程。在循环体中发现需要重启进程时，就使用`os.execvp`方法来重启进程。

## 总结

我们通过watchdog模块来监控文件变化，然后通过signal模块来发送信号给当前进程，最后在主程序中接收信号并重启进程。这样，我们就可以在代码发生变化时，自动重启进程。

watchdog设计模式是典型的观察者模式，它将观察者和被观察者分离开来，观察者通过事件来通知被观察者。这样，我们就可以在代码中定义事件处理函数，然后在被观察者中注册事件处理函数，从而实现代码的解耦。有机会将阅读一下watchdog模块的源码，看看它的具体实现。
