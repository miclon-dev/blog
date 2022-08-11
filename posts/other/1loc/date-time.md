---
title: 日期DateTime
icon: javascript
order: 6
date: 2022-08-10
category:
- 1loc
tag:
- javascript
---


## Add AM PM suffix to an hour


**JavaScript version**

```js
// `h` is an hour number between 0 and 23
const suffixAmPm = (h) => `${h % 12 === 0 ? 12 : h % 12}${h < 12 ? 'am' : 'pm'}`;
```

**TypeScript version**

```js
const suffixAmPm = (h: number): string => `${h % 12 === 0 ? 12 : h % 12}${h < 12 ? 'am' : 'pm'}`;
```

**Examples**

```js
suffixAmPm(0); // '12am'
suffixAmPm(5); // '5am'
suffixAmPm(12); // '12pm'
suffixAmPm(15); // '3pm'
suffixAmPm(23); // '11pm'
```
---

## Calculate the number of difference days between two dates


**JavaScript version**

```js
const diffDays = (date, otherDate) => Math.ceil(Math.abs(date - otherDate) / (1000 * 60 * 60 * 24));
```

**TypeScript version**

```js
const diffDays = (date: Date, otherDate: Date): number => Math.ceil(Math.abs(date.valueOf() - otherDate.valueOf()) / (1000 * 60 * 60 * 24));
```

**Examples**

```js
diffDays(new Date('2014-12-19'), new Date('2020-01-01')); // 1839
```
---

## Calculate the number of months between two dates


**JavaScript version**

```js
const monthDiff = (startDate, endDate) => Math.max(0, (endDate.getFullYear() - startDate.getFullYear()) * 12 - startDate.getMonth() + endDate.getMonth());
```

**TypeScript version**

```js
const monthDiff = (startDate: Date, endDate: Date): number => Math.max(0, (endDate.getFullYear() - startDate.getFullYear()) * 12 - startDate.getMonth() + endDate.getMonth());
```

**Example**

```js
monthDiff(new Date('2020-01-01'), new Date('2021-01-01')); // 12
```
---

## Compare two dates


**JavaScript version**

```js
// `a` and `b` are `Date` instances
const compare = (a, b) => a.getTime() > b.getTime();
```

**TypeScript version**

```js
const compare = (a: Date, b: Date): boolean => a.getTime() > b.getTime();
```

**Example**

```js
compare(new Date('2020-03-30'), new Date('2020-01-01')); // true
```
---

## Convert a date to YYYY-MM-DD format


**JavaScript version**

```js
// `date` is a `Date` object
const formatYmd = (date) => date.toISOString().slice(0, 10);
```

**TypeScript version**

```js
const formatYmd = (date: Date): string => date.toISOString().slice(0, 10);
```

**Example**

```js
formatYmd(new Date()); // 2020-05-06
```
---

## Convert seconds to hh:mm:ss format


**JavaScript version**

```js
// `s` is number of seconds
const formatSeconds = (s) => new Date(s * 1000).toISOString().substr(11, 8);

// Or
const formatSeconds = (s) => new Date(s * 1000).toUTCString().match(/(\d\d:\d\d:\d\d)/)[0];

// Or
const formatSeconds = (s) => [parseInt(s / 60 / 60), parseInt((s / 60) % 60), parseInt(s % 60)].join(':').replace(/\b(\d)\b/g, '0$1');
```

**TypeScript version**

```js
const formatSeconds = (s: number): string => new Date(s * 1000).toISOString().substr(11, 8);

// Or
const formatSeconds = (s: number): string => (new Date(s * 1000).toUTCString().match(/(\d\d:\d\d:\d\d)/) as string[])[0];

// Or
const formatSeconds = (s: number): string => (
    [parseInt(`${s / 3600}`), parseInt(`${(s / 60) % 60}`), parseInt(`${s % 60}`)].join(':').replace(/\b(\d)\b/g, '0$1')
);
```

**Examples**

```js
formatSeconds(200); // 00:03:20
formatSeconds(500); // 00:08:20
```
---

## Extract year, month, day, hour, minute, second and millisecond from a date


**JavaScript version**

```js
// `date` is a `Date` object
const extract = (date) =>
    date
        .toISOString()
        .split(/[^0-9]/)
        .slice(0, -1);

// `extract` is an array of [year, month, day, hour, minute, second, millisecond]
```

**TypeScript version**

```js
const extract = (date: Date): string[] =>
    date
        .toISOString()
        .split(/[^0-9]/)
        .slice(0, -1);
```
---

## Format a date for the given locale


**JavaScript version**

```js
// `date` is a `Date` object
// `locale` is a locale (en-US, pt-BR, for example)
const format = (date, locale) => new Intl.DateTimeFormat(locale).format(date);
```

**TypeScript version**

```js
const format = (date: Date, locale: string): string => new Intl.DateTimeFormat(locale).format(date);
```

**Example**

```js
format(new Date(), 'pt-BR'); // 06/05/2020
```
---

## Get the current quarter of a date


**JavaScript version**

```js
const getQuarter = (d = new Date()) => Math.ceil((d.getMonth() + 1) / 3);
```

**TypeScript version**

```js
const getQuarter = (d = new Date()): number => Math.ceil((d.getMonth() + 1) / 3);
```
---

## Get the current timestamp in seconds


**JavaScript version**

```js
const ts = () => Math.floor(new Date().getTime() / 1000);
```

**TypeScript version**

```js
const ts = (): number => Math.floor(new Date().getTime() / 1000);
```
---

## Get the day of the year from a date


**JavaScript version**

```js
// `date` is a Date object
const dayOfYear = (date) => Math.floor((date - new Date(date.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
```

**TypeScript version**

```js
const dayOfYear = (date: Date): number => Math.floor((date.valueOf() - new Date(date.getFullYear(), 0, 0).valueOf()) / (1000 * 60 * 60 * 24));
```

**Example**

```js
dayOfYear(new Date(2020, 04, 16)); // 137
```
---

## Get the first date in the month of a date


**JavaScript version**

```js
const getFirstDate = (d = new Date()) => new Date(d.getFullYear(), d.getMonth(), 1);
```

**TypeScript version**

```js
const getFirstDate = (d = new Date()): Date => new Date(d.getFullYear(), d.getMonth(), 1);
```
---

## Get the last date in the month of a date


**JavaScript version**

```js
const getLastDate = (d = new Date()) => new Date(d.getFullYear(), d.getMonth() + 1, 0);
```

**TypeScript version**

```js
const getLastDate = (d = new Date()): Date => new Date(d.getFullYear(), d.getMonth() + 1, 0);
```
---

## Get the month name of a date


**JavaScript version**

```js
// `date` is a Date object
const getMonthName = (date) => ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', ' November', 'December'][date.getMonth()];
```

**TypeScript version**

```js
const getMonthName = (date: Date): string => ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', ' November', 'December'][date.getMonth()];
```
---

## Get the number of days in given month


**JavaScript version**

```js
// `month` is zero-based index
const daysInMonth = (month, year) => new Date(year, month, 0).getDate();
```

**TypeScript version**

```js
const daysInMonth = (month: number, year: number): number => new Date(year, month, 0).getDate();
```
---

## Get the timezone string


**JavaScript version**

```js
const getTimezone = () => Intl.DateTimeFormat().resolvedOptions().timeZone;
```

**TypeScript version**

```js
const getTimezone = (): string => Intl.DateTimeFormat().resolvedOptions().timeZone;
```

**Example**

```js
getTimezone(); // 'Asia/Saigon'
```
---

## Get the tomorrow date


**JavaScript version**

```js
const tomorrow = ((d) => new Date(d.setDate(d.getDate() + 1)))(new Date());

// Or
const tomorrow = new Date(new Date().valueOf() + 1000 * 60 * 60 * 24);
```

**TypeScript version**

```js
const tomorrow: Date = ((d) => new Date(d.setDate(d.getDate() + 1)))(new Date());

// Or
const tomorrow: Date = new Date(new Date().valueOf() + 1000 * 60 * 60 * 24);
```
---

## Get the total number of days in a year


**JavaScript version**

```js
const numberOfDays = (year) => ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 366 : 365);

// Or
const numberOfDays = (year) => (new Date(year, 1, 29).getDate() === 29 ? 366 : 365);
```

**TypeScript version**

```js
const numberOfDays = (year: number): number => ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 366 : 365);

// Or
const numberOfDays = (year: number): number => (new Date(year, 1, 29).getDate() === 29 ? 366 : 365);
```
---

## Get the weekday of a date


**JavaScript version**

```js
// `date` is a Date object
const getWeekday = (date) => ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()];
```

**TypeScript version**

```js
const getWeekday = (date: Date): string => ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()];
```
---

## Get the yesterday date


**JavaScript version**

```js
const yesterday = ((d) => new Date(d.setDate(d.getDate() - 1)))(new Date());

// Or
const yesterday = new Date(new Date().valueOf() - 1000 * 60 * 60 * 24);
```

**TypeScript version**

```js
const yesterday: Date = ((d) => new Date(d.setDate(d.getDate() - 1)))(new Date());

// Or
const yesterday: Date = new Date(new Date().valueOf() - 1000 * 60 * 60 * 24);
```
---

## Initialize the current date but set time to midnight


**JavaScript version**

```js
const midnightOfToday = () => new Date(new Date().setHours(0, 0, 0, 0));
```

**TypeScript version**

```js
const midnightOfToday = (): Date => new Date(new Date().setHours(0, 0, 0, 0));
```
---

## Sort an array of dates


**JavaScript version**

```js
// `arr` is an array of `Date` items
const sortDescending = (arr) => arr.sort((a, b) => a.getTime() > b.getTime());

const sortAscending = (arr) => arr.sort((a, b) => a.getTime() < b.getTime());
```

**TypeScript version**

```js
const sortDescending = (arr: Date[]): Date[] => arr.sort((a, b) => a.getTime() - b.getTime());

const sortAscending = (arr: Date[]): Date[] => arr.sort((a, b) => b.getTime() - a.getTime());
```
---

