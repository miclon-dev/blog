---
title: 数Number
icon: javascript
order: 3
date: 2022-08-10
category:
- 1loc
tag:
- javascript
---


## Add an ordinal suffix to a number


**JavaScript version**

```js
// `n` is a position number
const addOrdinal = (n) => `${n}${['st', 'nd', 'rd'][((((n + 90) % 100) - 10) % 10) - 1] || 'th'}`;

// Or
const addOrdinal = (n) => `${n}${[, 'st', 'nd', 'rd'][/1?.$/.exec(n)] || 'th'}`;

// Or
const addOrdinal = (n) => `${n}${[, 'st', 'nd', 'rd'][(n % 100 >> 3) ^ 1 && n % 10] || 'th'}`;

// Or
const addOrdinal = (n) => `${n}${{ one: 'st', two: 'nd', few: 'rd', other: 'th' }[new Intl.PluralRules('en', { type: 'ordinal' }).select(n)]}`;
```

**TypeScript version**

```js
const addOrdinal = (n: number): string => `${n}${['st', 'nd', 'rd'][((((n + 90) % 100) - 10) % 10) - 1] || 'th'}`;

// Or
const addOrdinal = (n: number): string => `${n}${[, 'st', 'nd', 'rd'][/1?.$/.exec(n)] || 'th'}`;

// Or
const addOrdinal = (n: number): string => `${n}${[, 'st', 'nd', 'rd'][(n % 100 >> 3) ^ 1 && n % 10] || 'th'}`;

// Or
const addOrdinal = (n: number): string => `${n}${{ one: 'st', two: 'nd', few: 'rd', other: 'th' }[new Intl.PluralRules('en', { type: 'ordinal' }).select(n)]}`;
```

**Examples**

```js
addOrdinal(1); // '1st'
addOrdinal(2); // '2nd'
addOrdinal(3); // '3rd'
addOrdinal(11); // '11th'
addOrdinal(12); // '13th'
addOrdinal(13); // '13th'
```
---

## Calculate Fibonacci numbers


**JavaScript version**

```js
const fibo = (n, memo = {}) => memo[n] || (n <= 2 ? 1 : (memo[n] = fibo(n - 1, memo) + fibo(n - 2, memo)));
```

**TypeScript version**

```js
const fibo = (n: number, memo: Record<string, number> = {}): number => memo[n] || (n <= 2 ? 1 : (memo[n] = fibo(n - 1, memo) + fibo(n - 2, memo)));
```

**Examples**

```js
fibo(1); // 1
fibo(2); // 1
fibo(3); // 2
fibo(4); // 3
fibo(5); // 5
fibo(6); // 8
```
---

## Calculate the average of arguments


**JavaScript version**

```js
const average = (...args) => args.reduce((a, b) => a + b) / args.length;
```

**TypeScript version**

```js
const average = (...args: number[]): number => args.reduce((a, b) => a + b) / args.length;
```

**Examples**

```js
average(1, 2, 3, 4); // 2.5
```
---

## Calculate the division of arguments


**JavaScript version**

```js
const division = (...args) => args.reduce((a, b) => a / b);
```

**TypeScript version**

```js
const division = (...args: number): number => args.reduce((a, b) => a / b);
```

**Examples**

```js
division(1, 2, 3, 4); // 0.04166666666666666
```
---

## Calculate the factorial of a number


**JavaScript version**

```js
const factorial = (n) => (n <= 1 ? 1 : n * factorial(n - 1));
```

**TypeScript version**

```js
const factorial = (n: number): number => (n <= 1 ? 1 : n * factorial(n - 1));
```

**Examples**

```js
factorial(2); // 2
factorial(3); // 6
factorial(4); // 24
factorial(5); // 120
factorial(6); // 720
```
---

## Calculate the mod of collection index


**JavaScript version**

```js
const mod = (a, b) => ((a % b) + b) % b;
```

**TypeScript version**

```js
const mod = (a: number, b: number): number => ((a % b) + b) % b;
```

**Examples**

```js
mod(-1, 5); // 4
mod(3, 5); // 3
mod(6, 5); // 1
```
---

## Calculate the remainder of division of arguments


**JavaScript version**

```js
const remainder = (...args) => args.reduce((a, b) => a % b);
```

**TypeScript version**

```js
const remainder = (...args: number[]): number => args.reduce((a, b) => a % b);
```

**Examples**

```js
remainder(1, 2, 3, 4); // 1
```
---

## Calculate the sum of arguments


**JavaScript version**

```js
const sum = (...args) => args.reduce((a, b) => a + b);
```

**TypeScript version**

```js
const sum = (...args: number[]): number => args.reduce((a, b) => a + b);
```

**Examples**

```js
sum(1, 2, 3, 4); // 10
```
---

## Clamp a number between two values


**JavaScript version**

```js
const clamp = (val, min = 0, max = 1) => Math.max(min, Math.min(max, val));
```

**TypeScript version**

```js
const clamp = (val: number, min: number = 0, max: number = 1): number => Math.max(min, Math.min(max, val));
```

**Examples**

```js
clamp(199, 10, 25); // 25
```

**See also**

-   [Wrap a number between two values](/number/wrap-a-number-between-two-values)
---

## Compute the greatest common divisor between two numbers


**JavaScript version**

```js
const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
```

**TypeScript version**

```js
const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
```

**Examples**

```js
gcd(10, 15); // 5
```
---

## Convert a number to equivalent characters


**JavaScript version**

```js
const toChars = (n) => `${n >= 26 ? toChars(Math.floor(n / 26) - 1) : ''}${'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[n % 26]}`;
```

**TypeScript version**

```js
const toChars = (n: number): string => `${n >= 26 ? toChars(Math.floor(n / 26) - 1) : ''}${'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[n % 26]}`;
```

**Examples**

```js
toChars(0); // A
toChars(1); // B
toChars(25); // Z

toChars(26); // AA
toChars(27); // AB
toChars(51); // AZ

toChars(701); // ZZ
toChars(702); // AAA
toChars(703); // AAB
```
---

## Convert a string to number


**JavaScript version**

```js
const toNumber = (str) => +str;
```

**TypeScript version**

```js
const toNumber = (str: string): number => +str;
```

**Examples**

```js
toNumber('42'); // 42
```
---

## Convert decimal to binary recursively


**JavaScript version**

```js
const decToBi = (num) => (num === 0 ? 0 : (num % 2) + 10 * decToBi(~~(num / 2)));
```

**TypeScript version**

```js
const decToBi = (num: number): number => (num === 0 ? 0 : (num % 2) + 10 * decToBi(~~(num / 2)));
```

**Examples**

```js
decToBi(10); //1010
```
---

## Get the arrays of digits from a number


**JavaScript version**

```js
const digitize = (n) => `${n}`.split('').map((v) => parseInt(v, 10));

// Or
const digitize = (n) => [...`${n}`].map((v) => parseInt(v, 10));
```

**TypeScript version**

```js
const digitize = (n: number): number[] => `${n}`.split('').map((v) => parseInt(v, 10));

// Or
const digitize = (n: number): number[] => [...`${n}`].map((v) => parseInt(v, 10));
```

**Examples**

```js
digitize(123); // [1, 2, 3]
```
---

## Multiply arguments


**JavaScript version**

```js
const mul = (...args) => args.reduce((a, b) => a * b);
```

**TypeScript version**

```js
const mul = (...args: number[]): number => args.reduce((a, b) => a * b);
```

**Examples**

```js
mul(1, 2, 3, 4); // 24
```
---

## Prefix an integer with zeros


**JavaScript version**

```js
const prefixWithZeros = (n, length) => (n / Math.pow(10, length)).toFixed(length).substr(2);

// Or
const prefixWithZeros = (n, length) => `${Array(length).join('0')}${n}`.slice(-length);

// Or
const prefixWithZeros = (n, length) => String(n).padStart(length, '0');
```

**TypeScript version**

```js
const prefixWithZeros = (n: number, length: number): string => (n / Math.pow(10, length)).toFixed(length).substr(2);

// Or
const prefixWithZeros = (n: number, length: number): string => `${Array(length).join('0')}${n}`.slice(-length);

// Or
const prefixWithZeros = (n: number, length: number): string => String(n).padStart(length, '0');
```

**Examples**

```js
prefixWithZeros(42, 5); // '00042'
```
---

## Round a number to a given number of digits


**JavaScript version**

```js
const round = (n, decimals = 0) => Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`);
```

**TypeScript version**

```js
const round = (n: number, decimals: number = 0): number => Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`);
```

**Examples**

```js
round(1.234567, 3); // 1.235
round(1.234567, 4); // 1.2346
```
---

## Subtract arguments


**JavaScript version**

```js
const subtract = (...args) => args.reduce((a, b) => a - b);
```

**TypeScript version**

```js
const subtract = (...args: number[]): number => args.reduce((a, b) => a - b);
```

**Examples**

```js
subtract(1, 2, 3, 4); // -8
```
---

## Truncate a number at decimal


**JavaScript version**

```js
const truncate = (n) => ~~n;
```

**TypeScript version**

```js
const truncate = (n: number): number => ~~n;
```

**Examples**

```js
truncate(25.198726354); // 25
truncate(-25.198726354); // -25
```
---

## Truncate a number to a given number of decimal places without rounding


**JavaScript version**

```js
const toFixed = (n, fixed) => `${n}`.match(new RegExp(`^-?\\d+(?:\.\\d{0,${fixed}})?`))[0];

// Or
const toFixed = (n, fixed) => ~~(Math.pow(10, fixed) * n) / Math.pow(10, fixed);
```

**TypeScript version**

```js
const toFixed = (n: number, fixed: number): number => +(`${n}`.match(new RegExp(`^-?\\d+(?:\.\\d{0,${fixed}})?`)) as string[])[0];

// Or
const toFixed = (n: number, fixed: number): number => ~~(Math.pow(10, fixed) * n) / Math.pow(10, fixed);
```

**Examples**

```js
toFixed(25.198726354, 1); // 25.1
toFixed(25.198726354, 2); // 25.19
toFixed(25.198726354, 3); // 25.198
toFixed(25.198726354, 4); // 25.1987
toFixed(25.198726354, 5); // 25.19872
toFixed(25.198726354, 6); // 25.198726
```
---

## Wrap a number between two values


**JavaScript version**

```js
const wrap = (num, min, max) => ((((num - min) % (max - min)) + (max - min)) % (max - min)) + min;
```

**TypeScript version**

```ts
const wrap = (num: number, min: number, max: number): number => ((((num - min) % (max - min)) + (max - min)) % (max - min)) + min;
```

**Examples**

```js
wrap(11, 10, 25); // 11
wrap(10, 10, 25); // 10
wrap(9, 10, 25); // 25
wrap(24, 10, 25); // 24
wrap(25, 10, 25); // 25
wrap(26, 10, 25); // 10
```

**See also**

-   [Clamp a number between two values](/number/clamp-a-number-between-two-values)
---

