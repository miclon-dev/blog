---
title: 杂项Misc
icon: javascript
order: 12
date: 2022-08-10
category:
- 1loc
tag:
- javascript
---


## Check if the code is running in Jest


**JavaScript version**

```js
const isRunningInJest = typeof process !== 'undefined' && process.env.JEST_WORKER_ID !== undefined;
```

**TypeScript version**

```js
const isRunningInJest: boolean = typeof process !== 'undefined' && process.env.JEST_WORKER_ID !== undefined;
```
---

## Check if the code is running in NodeJS


**JavaScript version**

```js
const isNode = typeof process !== 'undefined' && process.versions != null && process.versions.node != null;
```

**TypeScript version**

```js
const isNode: boolean = typeof process !== 'undefined' && process.versions != null && process.versions.node != null;
```
---

## Check if the code is running in the browser


**JavaScript version**

```js
const isBrowser = typeof window === 'object' && typeof document === 'object';
```

**TypeScript version**

```js
const isBrowser: boolean = typeof window === 'object' && typeof document === 'object';
```
---

## Clear all cookies


**JavaScript version**

```js
const clearCookies = () => document.cookie.split(';').forEach((c) => (document.cookie = c.replace(/^ +/, '').replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`)));
```

**TypeScript version**

```js
const clearCookies = (): void => document.cookie.split(';').forEach((c) => (document.cookie = c.replace(/^ +/, '').replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`)));
```

**Examples**

```js
clearCookies();
```
---

## Convert 3 digits color to 6 digits color


**JavaScript version**

```js
const toFullHexColor = (color) =>
    `#${(color.startsWith('#') ? color.slice(1) : color)
        .split('')
        .map((c) => `${c}${c}`)
        .join('')}`;
```

**TypeScript version**

```js
const toFullHexColor = (color: string): string =>
    `#${(color.startsWith('#') ? color.slice(1) : color)
        .split('')
        .map((c) => `${c}${c}`)
        .join('')}`;
```

**Examples**

```js
toFullHexColor('123'); // '#112233'
toFullHexColor('#123'); // '#112233'
toFullHexColor('#abc'); // '#aabbcc'
```
---

## Convert Celsius to Fahrenheit


**JavaScript version**

```js
const celsiusToFahrenheit = (celsius) => (celsius * 9) / 5 + 32;
```

**TypeScript version**

```js
const celsiusToFahrenheit = (celsius: number): number => (celsius * 9) / 5 + 32;
```

**Examples**

```js
celsiusToFahrenheit(15); // 59
celsiusToFahrenheit(0); // 32
celsiusToFahrenheit(-20); // -4
```
---

## Convert cookie to object


**JavaScript version**

```js
const cookies = document.cookie
    .split(';')
    .map((item) => item.split('='))
    .reduce((acc, [k, v]) => (acc[k.trim().replace('"', '')] = v) && acc, {});
```
---

## Convert Fahrenheit to Celsius


**JavaScript version**

```js
const fahrenheitToCelsius = (fahrenheit) => ((fahrenheit - 32) * 5) / 9;
```

**TypeScript version**

```js
const fahrenheitToCelsius = (fahrenheit: number): number => ((fahrenheit - 32) * 5) / 9;
```

**Examples**

```js
fahrenheitToCelsius(59); // 15
fahrenheitToCelsius(32); // 0
```
---

## Convert hex to rgb


**JavaScript version**

```js
const hexToRgb = (hex) =>
    hex
        .replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (_, r, g, b) => `#${r}${r}${g}${g}${b}${b}`)
        .substring(1)
        .match(/.{2}/g)
        .map((x) => parseInt(x, 16));
```

**TypeScript version**

```js
const hexToRgb = (hex: string): string =>
    hex
        .replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (_, r, g, b) => `#${r}${r}${g}${g}${b}${b}`)
        .substring(1)
        .match(/.{2}/g)
        .map((x) => parseInt(x, 16));
```

**Examples**

```js
hexToRgb('#00ffff'); // [0, 255, 255]
hexToRgb('#0ff'); // [0, 255, 255]
```
---

## Convert rgb color to hex


**JavaScript version**

```js
const rgbToHex = (red, green, blue) => `#${((1 << 24) + (red << 16) + (green << 8) + blue).toString(16).slice(1)}`;

// Or
const rgbToHex = (red, green, blue) => `#${[red, green, blue].map((v) => v.toString(16).padStart(2, '0')).join('')}`;
```

**TypeScript version**

```js
const rgbToHex = (red: number, green: number, blue: number): string => `#${((1 << 24) + (red << 16) + (green << 8) + blue).toString(16).slice(1)}`;

// Or
const rgbToHex = (red: number, green: number, blue: number): string => `#${[red, green, blue].map((v) => v.toString(16).padStart(2, '0')).join('')}`;
```

**Examples**

```js
rgbToHex(0, 255, 255); // '#00ffff'
```
---

## Convert URL parameters to object


**JavaScript version**

```js
const getUrlParams = (query) => Array.from(new URLSearchParams(query)).reduce((p, [k, v]) => Object.assign({}, p, { [k]: p[k] ? (Array.isArray(p[k]) ? p[k] : [p[k]]).concat(v) : v }), {});
```

**TypeScript version**

```js
const getUrlParams = (query: string): Record<string, string> => (
    Array.from(new URLSearchParams(query)).reduce((p, [k, v]) => Object.assign({}, p, { [k]: p[k] ? (Array.isArray(p[k]) ? p[k] : [p[k]]).concat(v) : v }), {} as Record<string, string>)
);
```

**Examples**

```js
getUrlParams(location.search); // Get the parameters of the current URL

getUrlParams('foo=Foo&bar=Bar'); // { foo: "Foo", bar: "Bar" }

// Duplicate key
getUrlParams('foo=Foo&foo=Fuzz&bar=Bar'); // { foo: ["Foo", "Fuzz"], bar: "Bar" }
```
---

## Decode a JWT token


**JavaScript version**

```js
const decode = (token) =>
    decodeURIComponent(
        atob(token.split('.')[1].replace('-', '+').replace('_', '/'))
            .split('')
            .map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
            .join('')
    );
```

**TypeScript version**

```js
const decode = (token: string): string =>
    decodeURIComponent(
        atob(token.split('.')[1].replace('-', '+').replace('_', '/'))
            .split('')
            .map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
            .join('')
    );
```

**Examples**

```js
decode(`
    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
    eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0I
    joxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
`);

// { "sub": "1234567890", "name": "John Doe", "iat": 1516239022 }
```
---

## Detect dark mode


**JavaScript version**

```js
const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
```

**TypeScript version**

```js
const isDarkMode: boolean = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
```
---

## Easing functions


**JavaScript version**

```js
// Some easing functions
// See https://gist.github.com/gre/1650294 and https://easings.net

const linear = (t) => t;

const easeInQuad = (t) => t * t;
const easeOutQuad = (t) => t * (2 - t);
const easeInOutQuad = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

const easeInCubic = (t) => t * t * t;
const easeOutCubic = (t) => --t * t * t + 1;
const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1);

const easeInQuart = (t) => t * t * t * t;
const easeOutQuart = (t) => 1 - --t * t * t * t;
const easeInOutQuart = (t) => (t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t);

const easeInQuint = (t) => t * t * t * t * t;
const easeOutQuint = (t) => 1 + --t * t * t * t * t;
const easeInOutQuint = (t) => (t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t);

const easeInSine = (t) => 1 + Math.sin((Math.PI / 2) * t - Math.PI / 2);
const easeOutSine = (t) => Math.sin((Math.PI / 2) * t);
const easeInOutSine = (t) => (1 + Math.sin(Math.PI * t - Math.PI / 2)) / 2;

const easeInElastic = (t) => (0.04 - 0.04 / t) * Math.sin(25 * t) + 1;
const easeOutElastic = (t) => ((0.04 * t) / --t) * Math.sin(25 * t);
const easeInOutElastic = (t) => ((t -= 0.5) < 0 ? (0.02 + 0.01 / t) * Math.sin(50 * t) : (0.02 - 0.01 / t) * Math.sin(50 * t) + 1);
```

**TypeScript version**

```js
const linear = (t: number): number => t;

const easeInQuad = (t: number): number => t * t;
const easeOutQuad = (t: number): number => t * (2 - t);
const easeInOutQuad = (t: number): number => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

const easeInCubic = (t: number): number => t * t * t;
const easeOutCubic = (t: number): number => --t * t * t + 1;
const easeInOutCubic = (t: number): number => (t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1);

const easeInQuart = (t: number): number => t * t * t * t;
const easeOutQuart = (t: number): number => 1 - --t * t * t * t;
const easeInOutQuart = (t: number): number => (t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t);

const easeInQuint = (t: number): number => t * t * t * t * t;
const easeOutQuint = (t: number): number => 1 + --t * t * t * t * t;
const easeInOutQuint = (t: number): number => (t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t);

const easeInSine = (t: number): number => 1 + Math.sin((Math.PI / 2) * t - Math.PI / 2);
const easeOutSine = (t: number): number => Math.sin((Math.PI / 2) * t);
const easeInOutSine = (t: number): number => (1 + Math.sin(Math.PI * t - Math.PI / 2)) / 2;

const easeInElastic = (t: number): number => (0.04 - 0.04 / t) * Math.sin(25 * t) + 1;
const easeOutElastic = (t: number): number => ((0.04 * t) / --t) * Math.sin(25 * t);
const easeInOutElastic = (t: number): number => ((t -= 0.5) < 0 ? (0.02 + 0.01 / t) * Math.sin(50 * t) : (0.02 - 0.01 / t) * Math.sin(50 * t) + 1);
```
---

## Emulate a dice throw


**JavaScript version**

```js
const throwdice = () => ~~(Math.random() * 6) + 1;
```

**TypeScript version**

```js
const throwdice = (): number => ~~(Math.random() * 6) + 1;
```

**Examples**

```js
throwdice(); // 4
throwdice(); // 1
throwdice(); // 6
```
---

## Encode a URL


**JavaScript version**

```js
// `encodeURIComponent` doesn't encode -_.!~*'()
const encode = (url) => encodeURIComponent(url).replace(/!/g, '%21').replace(/~/g, '%7E').replace(/\*/g, '%2A').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/%20/g, '+');
```

**TypeScript version**

```js
const encode = (url: string): string =>
    encodeURIComponent(url).replace(/!/g, '%21').replace(/~/g, '%7E').replace(/\*/g, '%2A').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/%20/g, '+');
```
---

## Generate an unique and increment id


**JavaScript version**

```js
const uid = (() => ((id = 0), () => id++))();
```

**Examples**

```js
uid(); // 0
uid(); // 1
uid(); // 2
uid(); // 3
```
---

## Get the first defined and non null argument


**JavaScript version**

```js
const coalesce = (...args) => args.find((item) => item !== undefined && item !== null);

// Or
const coalesce = (...args) => args.find((item) => ![undefined, null].includes(item));
```

**TypeScript version**

```js
const coalesce = (...args: any[]): any[] => args.find((item) => item !== undefined && item !== null);

// Or
const coalesce = (...args: any[]): any[] => args.find((item) => ![undefined, null].includes(item));
```

**Examples**

```js
coalesce(undefined, null, 'helloworld', NaN); // 'helloworld'
```
---

## Get the value of a cookie


**JavaScript version**

```js
const cookie = (name) => `; ${document.cookie}`.split(`; ${name}=`).pop().split(';').shift();
```

**Examples**

```js
cookie('_ga'); // GA1.2.825309271.1581874719
```
---

## Get the value of a param from a URL


**JavaScript version**

```js
const getParam = (url, param) => new URLSearchParams(new URL(url).search).get(param);
```

**TypeScript version**

```js
const getParam = (url: string, param: string): string | null => new URLSearchParams(new URL(url).search).get(param);
```

**Examples**

```js
getParam('http://domain.com?message=hello', 'message'); // 'hello'
```
---

## Get type of a variable in string


**JavaScript version**

```js
const getTypeOf = (obj) => Object.prototype.toString.call(obj).match(/\[object (.*)\]/)[1];
```

**TypeScript version**

```js
const getTypeOf = (obj: any): string => (Object.prototype.toString.call(obj).match(/\[object (.*)\]/) as string[])[1];
```

**Examples**

```js
getTypeOf('hello world'); // String
getTypeOf(1000); // Number
getTypeOf(Infinity); // Number
getTypeOf(true); // Boolean
getTypeOf(Symbol()); // Symbol
getTypeOf(null); // Null
getTypeOf(undefined); // Undefined
getTypeOf({}); // Object
getTypeOf([]); // Array
getTypeOf(/[a-z]/g); // RegExp
getTypeOf(new Date(2021)); // Date
getTypeOf(new Error()); // Error
getTypeOf(function () {}); // Function
getTypeOf((a, b) => a + b); // Function
getTypeOf(async () => {}); // AsyncFunction
getTypeOf(document); // HTMLDocument
```
---

## Redirect the page to HTTPS if it is in HTTP


**JavaScript version**

```js
const redirectHttps = () => (location.protocol === 'https:' ? {} : location.replace(`https://${location.href.split('//')[1]}`));

// Or
const redirectHttps = () => (location.protocol === 'https:' ? {} : (location.protocol = 'https:'));
```

**TypeScript version**

```js
const redirectHttps = (): void => (location.protocol === 'https:' ? void 0 : location.replace(`https://${location.href.split('//')[1]}`));

// Or
const redirectHttps = (): string => (location.protocol === 'https:' ? '' : (location.protocol = 'https:'));
```
---

## Run Promises in sequence


**JavaScript version**

```js
// `promises` is an array of `Promise`
const run = (promises) => promises.reduce((p, c) => p.then((rp) => c.then((rc) => [...rp, rc])), Promise.resolve([]));
```

**TypeScript version**

```js
const run = (promises: Promise<any>[]): Promise<any> => promises.reduce((p, c) => p.then((rp) => c.then((rc) => [...rp, rc])), Promise.resolve([]));
```

**Examples**

```js
run(promises).then((results) => {
    // `results` is an array of promise results in the same order
});
```
---

## Swap two variables


**JavaScript version**

```js
[a, b] = [b, a];

// Or
a = [b, (b = a)][0];

// Or
a = ((x) => x)(b, (b = a));

// Or
// (only works with numbers)
a = b + ((b = a), 0);

a = b * ((b = a), 1);
```
---

## Wait for an amount of time


**JavaScript version**

```js
const wait = async (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));
```

**TypeScript version**

```js
const wait = async (milliseconds: number) => new Promise((resolve) => setTimeout(resolve, milliseconds));
```
---

