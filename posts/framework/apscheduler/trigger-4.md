---
title: Apscheduler扩展之Crontab触发器
shortTitle: Apscheduler触发器-番外篇1
icon: python
order: 1
date: 2022-08-07
category:
- apscheduler
tag:
- trigger
- crontab
- cron
sticky: true
star: true
isOriginal: true
---

上文总结中提到『如果我来实现cron触发器』我会怎么做。笔者没有巨人的能力去开发一个更完美的cron解析，所以选择站在巨人肩膀，从github中找到一个不错的crontab解析库，故笔者使用该库来实现crontab触发器。

```python
# -*- coding: utf-8 -*-
from datetime import timedelta, datetime
from tzlocal import get_localzone

from apscheduler.triggers.base import BaseTrigger
from apscheduler.util import convert_to_datetime, astimezone, datetime_ceil
from croniter import croniter


class CrontabTrigger(BaseTrigger):

    def __init__(self, cron_expr, start_date=None, end_date=None, timezone=None, jitter=None):
        """
        :param str cron_expr: cron表达式
        :param datetime|str start_date: 最早触发时间
        :param datetime|str end_date: 最晚触发时间
        :param datetime.tzinfo|str timezone: 时区
        :param int|None jitter: 任务执行延迟时间不超过jitter秒
        """
        if timezone:
            self.timezone = astimezone(timezone)
        elif isinstance(start_date, datetime) and start_date.tzinfo:
            self.timezone = start_date.tzinfo
        elif isinstance(end_date, datetime) and end_date.tzinfo:
            self.timezone = end_date.tzinfo
        else:
            self.timezone = get_localzone()
        self.start_date = convert_to_datetime(start_date, self.timezone, 'start_date')
        self.end_date = convert_to_datetime(end_date, self.timezone, 'end_date')

        self.jitter = jitter
        self.cron_expr = cron_expr

    def _calc_next_time(self, start_date):
        iter = croniter(self.cron_expr, start_date)  # noqa
        return iter.get_next(datetime)

    def get_next_fire_time(self, previous_fire_time, now):
        if previous_fire_time:
            start_date = min(now, previous_fire_time + timedelta(microseconds=1))
            if start_date == previous_fire_time:
                start_date += timedelta(microseconds=1)
        else:
            # 当前时间和用户预设的起始时间，你说应该听谁的？当然是谁大听谁的啊！
            start_date = max(now, self.start_date) if self.start_date else now

        next_date = datetime_ceil(start_date).astimezone(self.timezone)
        # 使用当前时间计算下次运行时间
        next_date = self._calc_next_time(next_date)

        next_date = self._apply_jitter(next_date, self.jitter, now)
        return min(next_date, self.end_date) if self.end_date else next_date
```

![](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20220807232933.png)


以上，算是对触发器源码解读的一个交代。。。

但是，如果你注意下标题，我想我还有番外篇[2]。。
