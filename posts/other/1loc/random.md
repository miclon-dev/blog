---
title: 随机Random
icon: javascript
order: 9
date: 2022-08-10
category:
- 1loc
tag:
- javascript
---


## Generate a random boolean


**JavaScript version**

```js
const randomBoolean = () => Math.random() >= 0.5;
```

**TypeScript version**

```js
const randomBoolean = (): boolean => Math.random() >= 0.5;
```
---

## Generate a random floating point number in given range


**JavaScript version**

```js
const randomFloat = (min, max) => Math.random() * (max - min) + min;
```

**TypeScript version**

```js
const randomFloat = (min: number, max: number): number => Math.random() * (max - min) + min;
```
---

## Generate a random hex color


**JavaScript version**

```js
const randomColor = () => `#${Math.random().toString(16).slice(2, 8).padEnd(6, '0')}`;

// Or
const randomColor = () => `#${(~~(Math.random() * (1 << 24))).toString(16)}`;
```

**TypeScript version**

```js
const randomColor = (): string => `#${Math.random().toString(16).slice(2, 8).padEnd(6, '0')}`;

// Or
const randomColor = (): string => `#${(~~(Math.random() * (1 << 24))).toString(16)}`;
```
---

## Generate a random integer in given range


**JavaScript version**

```js
const randomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
```

**TypeScript version**

```js
const randomInteger = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;
```
---

## Generate a random IP address


**JavaScript version**

```js
const randomIp = () =>
    Array(4)
        .fill(0)
        .map((_, i) => Math.floor(Math.random() * 255) + (i === 0 ? 1 : 0))
        .join('.');
```

**TypeScript version**

```js
const randomIp = (): number =>
    Array(4)
        .fill(0)
        .map((_, i) => Math.floor(Math.random() * 255) + (i === 0 ? 1 : 0))
        .join('.');
```

**Examples**

```js
randomIp(); // 175.89.174.131
```
---

## Generate a random sign


**JavaScript version**

```js
const randomSign = () => (Math.random() >= 0.5 ? 1 : -1);
```

**TypeScript version**

```js
const randomSign = (): number => (Math.random() >= 0.5 ? 1 : -1);
```
---

## Generate a random string from given characters


**JavaScript version**

```js
const generateString = (length, chars) =>
    Array(length)
        .fill('')
        .map((v) => chars[Math.floor(Math.random() * chars.length)])
        .join('');
```

**TypeScript version**

```js
const generateString = (length: number, chars: string) =>
    Array(length)
        .fill('')
        .map((v) => chars[Math.floor(Math.random() * chars.length)])
        .join('');
```

**Examples**

```js
generateString(10, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
```
---

## Generate a random string using Node crypto module


**JavaScript version**

```js
const randomStr = () => require('crypto').randomBytes(32).toString('hex');
```

**TypeScript version**

```js
const randomStr = (): string => require('crypto').randomBytes(32).toString('hex');
```
---

## Generate a random string with given length


**JavaScript version**

```js
const generateString = (length) =>
    Array(length)
        .fill('')
        .map((v) => Math.random().toString(36).charAt(2))
        .join('');
```

**TypeScript version**

```js
const generateString = (length: number): string =>
    Array(length)
        .fill('')
        .map((v) => Math.random().toString(36).charAt(2))
        .join('');
```
---

## Generate a random UUID


**JavaScript version**

```js
const uuid = (a) => (a ? (a ^ ((Math.random() * 16) >> (a / 4))).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, uuid));
```
---

## Generate an array of random integers in a given range


**JavaScript version**

```js
const randomArrayInRange = (min, max, n) => Array.from({ length: n }, () => Math.floor(Math.random() * (max - min + 1)) + min);
```

**TypeScript version**

```js
const randomArrayInRange = (min: number, max: number, n: number): number[] => Array.from({ length: n }, () => Math.floor(Math.random() * (max - min + 1)) + min);
```

**Examples**

```js
randomArrayInRange(1, 100, 10); // [11, 82, 41, 35, 76, 83, 43, 15, 60, 54]
```
---

## Get a random item and remove it from an array


**JavaScript version**

```js
const randomItem = (arr) => arr.splice((Math.random() * arr.length) | 0, 1);
```

**TypeScript version**

```js
const randomItem = <T,>(arr: T[]): T => arr.splice((Math.random() * arr.length) | 0, 1) as unknown as T;
```

**Examples**

```js
const arr = [1, 3, 5, 7, 9];
randomItem(arr); // 7
// arr = [1, 3, 5, 9]
```
---

## Get a random item from an array


**JavaScript version**

```js
const randomItem = (arr) => arr[(Math.random() * arr.length) | 0];
```

**TypeScript version**

```js
const randomItem = <T,_>(arr: T[]): T => arr[(Math.random() * arr.length) | 0];
```
---

## Get random items of an array


**JavaScript version**

```js
const randomItems = (arr, count) => arr.concat().reduce((p, _, __, arr) => (p[0] < count ? [p[0] + 1, p[1].concat(arr.splice((Math.random() * arr.length) | 0, 1))] : p), [0, []])[1];
```

**Examples**

```js
randomItems([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3); // [4, 8, 5]
randomItems(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'], 4); // ['e', 'c', 'h', 'j']
```
---

## Pick a random property of an object


**JavaScript version**

```js
const randomProp = (obj) => Object.keys(obj)[(Math.random() * Object.keys(obj).length) | 0];
```

**TypeScript version**

```js
const randomProp = (obj: object): any => Object.keys(obj)[(Math.random() * Object.keys(obj).length) | 0];
```

**Examples**

```js
const colors = {
    aqua: '#00ffff',
    azure: '#f0ffff',
    beige: '#f5f5dc',
    black: '#000000',
    blue: '#0000ff',
    brown: '#a52a2a',
    cyan: '#00ffff',
    darkblue: '#00008b',
    darkcyan: '#008b8b',
    darkgrey: '#a9a9a9',
    darkgreen: '#006400',
    darkkhaki: '#bdb76b',
    darkmagenta: '#8b008b',
    darkolivegreen: '#556b2f',
    darkorange: '#ff8c00',
    darkorchid: '#9932cc',
    darkred: '#8b0000',
    darksalmon: '#e9967a',
    darkviolet: '#9400d3',
    fuchsia: '#ff00ff',
    gold: '#ffd700',
    green: '#008000',
    indigo: '#4b0082',
    khaki: '#f0e68c',
    lightblue: '#add8e6',
    lightcyan: '#e0ffff',
    lightgreen: '#90ee90',
    lightgrey: '#d3d3d3',
    lightpink: '#ffb6c1',
    lightyellow: '#ffffe0',
    lime: '#00ff00',
    magenta: '#ff00ff',
    maroon: '#800000',
    navy: '#000080',
    olive: '#808000',
    orange: '#ffa500',
    pink: '#ffc0cb',
    purple: '#800080',
    violet: '#800080',
    red: '#ff0000',
    silver: '#c0c0c0',
    white: '#ffffff',
    yellow: '#ffff00',
};
randomProp(colors); // 'red'
```
---

## Pick random lines from a text document


**JavaScript version**

```js
const randomLines = (str, count) => str.split(/\r?
/).reduce((p, _, __, arr) => (p[0] < count ? [p[0] + 1, p[1].concat(arr.splice((Math.random() * arr.length) | 0, 1))] : p), [0, []])[1];
```

**Examples**

```js
randomLines(
    `one
two
three
four
five`,
    2
);

// ['one', 'four']
```
---

