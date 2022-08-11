---
title: 验证器Validator
icon: javascript
order: 11
date: 2022-08-10
category:
- 1loc
tag:
- javascript
---


## Check if a character is a digit


**JavaScript version**

```js
const isDigit = (char) => char < 10;

// Or
const isDigit = (char) => char.length === 1 && c >= '0' && c <= '9';

// Or
const isDigit = (char) => Boolean([true, true, true, true, true, true, true, true, true, true][char]);
```

**TypeScript version**

```js
const isDigit = (char: string): boolean => char < 10;

// Or
const isDigit = (char: string): boolean => char.length === 1 && c >= '0' && c <= '9';

// Or
const isDigit = (char: string): boolean => Boolean([true, true, true, true, true, true, true, true, true, true][char]);
```

**Examples**

```js
isDigit('a'); // false
isDigit('abc'); // false
isDigit(10); // false
isDigit('10'); // false

isDigit('2'); // true
isDigit(2); // true
```
---

## Check if a date is a weekday


**JavaScript version**

```js
// `date` is a Date object
const isWeekday = (date = new Date()) => date.getDay() % 6 !== 0;
```

**TypeScript version**

```js
const isWeekday = (date = new Date()): boolean => date.getDay() % 6 !== 0;
```
---

## Check if a date is a weekend


**JavaScript version**

```js
// `date` is a Date object
const isWeekend = (date = new Date()) => date.getDay() % 6 === 0;
```

**TypeScript version**

```js
const isWeekend = (date = new Date()): boolean => date.getDay() % 6 === 0;
```
---

## Check if a date is between two dates


**JavaScript version**

```js
// `min`, `max` and `date` are `Date` instances
const isBetween = (date, min, max) => date.getTime() >= min.getTime() && date.getTime() <= max.getTime();
```

**TypeScript version**

```js
const isBetween = (date: Date, min: Date, max: Date): boolean => date.getTime() >= min.getTime() && date.getTime() <= max.getTime();
```
---

## Check if a date is today


**JavaScript version**

```js
// `date` is a Date object
const isToday = (date) => date.toISOString().slice(0, 10) === new Date().toISOString().slice(0, 10);
```

**TypeScript version**

```js
const isToday = (date: Date): boolean => date.toISOString().slice(0, 10) === new Date().toISOString().slice(0, 10);
```
---

## Check if a date occurs in the current year


**JavaScript version**

```js
// `date` is a Date object
const isCurrentYear = (date) => date.getUTCFullYear() === new Date().getUTCFullYear();
```

**TypeScript version**

```js
const isCurrentYear = (date: Date): boolean => date.getUTCFullYear() === new Date().getUTCFullYear();
```
---

## Check if a flat array has duplicate values


**JavaScript version**

```js
const hasDuplicateValues = (arr) => new Set(arr).size !== arr.length;

// Or
const hasDuplicateValues = (arr) => arr.some((item, index, arr) => arr.indexOf(item) !== index);
```

**TypeScript version**

```js
const hasDuplicateValues = <T,_>(arr: T[]): boolean => new Set(arr).size !== arr.length;

// Or
const hasDuplicateValues = <T,_>(arr: T[]): boolean => arr.some((item, index, arr) => arr.indexOf(item) !== index);
```

**Examples**

```js
hasDuplicateValues(['h', 'e', 'l', 'l', 'o']); // true
hasDuplicateValues(['w', 'o', 'r', 'd']); // false
```
---

## Check if a given integer is a prime number


**JavaScript version**

```js
const isPrime = (n) =>
    n > 1 &&
    Array(Math.floor(Math.sqrt(n)) - 1)
        .fill(0)
        .map((_, i) => i + 2)
        .every((i) => n % i !== 0);
```

**TypeScript version**

```js
const isPrime = (n: number): boolean =>
    n > 1 &&
    Array(Math.floor(Math.sqrt(n)) - 1)
        .fill(0)
        .map((_, i) => i + 2)
        .every((i) => n % i !== 0);
```
---

## Check if a number is a power of 2


**JavaScript version**

```js
const isPowerOfTwo = (n) => (n & (n - 1)) === 0;
```

**TypeScript version**

```js
const isPowerOfTwo = (n: number): boolean => (n & (n - 1)) === 0;
```

**Examples**

```js
isPowerOfTwo(256); // true
isPowerOfTwo(129); // false
```
---

## Check if a number is even


**JavaScript version**

```js
const isEven = (n) => n % 2 === 0;

// Or
const isEven = (n) => (n & 1) === 0;

// Or
const isEven = (n) => !(n & 1);

// Or
const isEven = (n) => Number.isInteger(n / 2);
```

**TypeScript version**

```js
const isEven = (n: number): boolean => n % 2 === 0;

// Or
const isEven = (n: number): boolean => (n & 1) === 0;

// Or
const isEven = (n: number): boolean => !(n & 1);

// Or
const isEven = (n: number): boolean => Number.isInteger(n / 2);
```

**Examples**

```js
isEven(1); // false
isEven(2); // true
```
---

## Check if a number is in a given range


**JavaScript version**

```js
const inRange = (num, a, b, threshold = 0) => Math.min(a, b) - threshold <= num && num <= Math.max(a, b) + threshold;
```

**TypeScript version**

```js
const inRange = (num: number, a: number, b: number, threshold: number = 0): boolean => Math.min(a, b) - threshold <= num && num <= Math.max(a, b) + threshold;
```

**Examples**

```js
inRange(10, 5, 15); // true
inRange(10, 5, 6); // false
inRange(10, 15, 5); // true
inRange(-10, -5, -15); // true
```
---

## Check if a number is negative


**JavaScript version**

```js
const isNegative = (n) => Math.sign(n) === -1;

// Or
const isNegative = (n) => n < 0;
```

**TypeScript version**

```js
const isNegative = (n: number): boolean => Math.sign(n) === -1;

// Or
const isNegative = (n: number): boolean => n < 0;
```

**Examples**

```js
isNegative(-3); // true
isNegative(8); // false
```
---

## Check if a number is odd


**JavaScript version**

```js
const isOdd = (n) => n % 2 !== 0;

// Or
const isOdd = (n) => !!(n & 1);

// Or
const isOdd = (n) => !Number.isInteger(n / 2);
```

**TypeScript version**

```js
const isOdd = (n: number): boolean => n % 2 !== 0;

// Or
const isOdd = (n: number): boolean => !!(n & 1);

// Or
const isOdd = (n: number): boolean => !Number.isInteger(n / 2);
```

**Examples**

```js
isOdd(1); // true
isOdd(2); // false
```
---

## Check if a number is positive


**JavaScript version**

```js
const isPositive = (n) => Math.sign(n) === 1;
```

**TypeScript version**

```js
const isPositive = (n: number): boolean => Math.sign(n) === 1;
```

**Examples**

```js
isPositive(3); // true
isPositive(-8); // false
```
---

## Check if a string contains lower case characters


**JavaScript version**

```js
const containsLowerCase = (str) => str !== str.toUpperCase();
```

**TypeScript version**

```js
const containsLowerCase = (str: string): boolean => str !== str.toUpperCase();
```

**Examples**

```js
containsLowerCase('Hello World'); // true
containsLowerCase('HELLO WORLD'); // false
```
---

## Check if a string contains only ASCII characters


**JavaScript version**

```js
const isAscii = (str) => /^[\x00-\x7F]+$/.test(str);
```

**TypeScript version**

```js
const isAscii = (str: string): boolean => /^[\x00-\x7F]+$/.test(str);
```
---

## Check if a string contains only digits


**JavaScript version**

```js
const isNumeric = (str) => !/[^0-9]/.test(str);
```

**TypeScript version**

```js
const isNumeric = (str: string): boolean => !/[^0-9]/.test(str);
```

**Examples**

```js
isNumeric(2); // true
isNumeric('23'); // true
isNumeric('00123'); // true

isNumeric('1.23'); // false
isNumeric('-Infinity'); // false
isNumeric('Infinity'); // false
isNumeric('NaN'); // false
```
---

## Check if a string contains only letters and numbers


**JavaScript version**

```js
const isAlphanumeric = (str) => /^[0-9A-Z]+$/i.test(str);
```

**TypeScript version**

```js
const isAlphanumeric = (str: string): boolean => /^[0-9A-Z]+$/i.test(str);
```

**Examples**

```js
isAlphanumeric('helloworld'); // true
isAlphanumeric('HelloWorld'); // true
isAlphanumeric('hello world'); // false
isAlphanumeric('hello123'); // true
isAlphanumeric('hello 123'); // false
```
---

## Check if a string contains only letters


**JavaScript version**

```js
const isAlpha = (str) => /^[A-Z]+$/i.test(str);
```

**TypeScript version**

```js
const isAlpha = (str: string): boolean => /^[A-Z]+$/i.test(str);
```

**Examples**

```js
isAlpha('helloworld'); // true
isAlpha('HelloWorld'); // true
isAlpha('hello world'); // false
isAlpha('0123456789'); // false
```
---

## Check if a string contains upper case characters


**JavaScript version**

```js
const containsUpperCase = (str) => str !== str.toLowerCase();
```

**TypeScript version**

```js
const containsUpperCase = (str: string): boolean => str !== str.toLowerCase();
```

**Examples**

```js
containsUpperCase('Hello World'); // true
containsUpperCase('hello world'); // false
```
---

## Check if a string contains whitespace


**JavaScript version**

```js
const containsWhitespace = (str) => (str) => /\s/.test(str);
```

**TypeScript version**

```js
const containsWhitespace =
    (str: string): boolean =>
    (str) =>
        /\s/.test(str);
```

**Examples**

```js
containsWhitespace('hello world'); // true
```
---

## Check if a string is a hexadecimal color


**JavaScript version**

```js
const isHexColor = (color) => /^#([0-9A-F]{3}|[0-9A-F]{4}|[0-9A-F]{6}|[0-9A-F]{8})$/i.test(color);
```

**TypeScript version**

```js
const isHexColor = (color: string): boolean => /^#([0-9A-F]{3}|[0-9A-F]{4}|[0-9A-F]{6}|[0-9A-F]{8})$/i.test(color);
```

**Examples**

```js
isHexColor('#012'); // true
isHexColor('#A1B2C3'); // true
isHexColor('012'); // false
isHexColor('#GHIJKL'); // false
```
---

## Check if a string is a hexadecimal number


**JavaScript version**

```js
const isHexadecimal = (str) => /^[A-F0-9]+$/i.test(str);

// Or
const isHexadecimal = (str) => str.split('').every((c) => '0123456789ABCDEFabcdef'.indexOf(c) !== -1);
```

**TypeScript version**

```js
const isHexadecimal = (str: string): boolean => /^[A-F0-9]+$/i.test(str);

// Or
const isHexadecimal = (str: string): boolean => str.split('').every((c) => '0123456789ABCDEFabcdef'.indexOf(c) !== -1);
```

**Examples**

```js
isHexadecimal('123'); // true
isHexadecimal('A1B2C3'); // true
isHexadecimal('#123'); // false
```
---

## Check if a string is a MongoDB ObjectId


**JavaScript version**

```js
const isMongoId = (str) => str.length === 24 && /^[A-F0-9]+$/i.test(str);

// Or
const isMongoId = (str) => str.length === 24 && str.split('').every((c) => '0123456789ABCDEFabcdef'.indexOf(c) !== -1);
```

**TypeScript version**

```js
const isMongoId = (str: string): boolean => str.length === 24 && /^[A-F0-9]+$/i.test(str);

// Or
const isMongoId = (str: string): boolean => str.length === 24 && str.split('').every((c) => '0123456789ABCDEFabcdef'.indexOf(c) !== -1);
```
---

## Check if a string is an octal number


**JavaScript version**

```js
const isOctal = (str) => /^(0o)?[0-7]+$/i.test(str);
```

**TypeScript version**

```js
const isOctal = (str: string): boolean => /^(0o)?[0-7]+$/i.test(str);
```
---

## Check if a string is lower case


**JavaScript version**

```js
const isLowerCase = (str) => str === str.toLowerCase();
```

**TypeScript version**

```js
const isLowerCase = (str: string): boolean => str === str.toLowerCase();
```
---

## Check if a string is upper case


**JavaScript version**

```js
const isUpperCase = (str) => str === str.toUpperCase();
```

**TypeScript version**

```js
const isUpperCase = (str: string): boolean => str === str.toUpperCase();
```
---

## Check if a value is a business identifier code


**JavaScript version**

```js
const isBIC = (value) => /^[a-zA-Z]{6}[a-zA-Z0-9]{2}([a-zA-Z0-9]{3})?$/.test(value);
```

**TypeScript version**

```js
const isBIC = (value: string): boolean => /^[a-zA-Z]{6}[a-zA-Z0-9]{2}([a-zA-Z0-9]{3})?$/.test(value);
```
---

## Check if a value is a number


**JavaScript version**

```js
const isNumber = (value) => !isNaN(parseFloat(value)) && isFinite(value);
```

**TypeScript version**

```js
const isNumber = (value: any): number => !isNaN(parseFloat(value)) && isFinite(value);
```
---

## Check if a value is a plain object


**JavaScript version**

```js
const isPlainObject = (v) => !!v && typeof v === 'object' && (v.__proto__ === null || v.__proto__ === Object.prototype);
```

**TypeScript version**

```js
const isPlainObject = (v: any): boolean => !!v && typeof v === 'object' && (v.__proto__ === null || v.__proto__ === Object.prototype);
```

**Examples**

```js
isPlainObject(null); // false
isPlainObject('hello world'); // false
isPlainObject([]); // false
isPlainObject(Object.create(null)); // false
isPlainObject(function () {}); // false

isPlainObject({}); // true
isPlainObject({ a: '1', b: '2' }); // true
```
---

## Check if a value is a regular expression


**JavaScript version**

```js
const isRegExp = (value) => Object.prototype.toString.call(value) === '[object RegExp]';
```

**TypeScript version**

```js
const isRegExp = (value: any): boolean => Object.prototype.toString.call(value) === '[object RegExp]';
```
---

## Check if a value is a string


**JavaScript version**

```js
const isString = (value) => Object.prototype.toString.call(value) === '[object String]';
```

**TypeScript version**

```js
const isString = (value: any): boolean => Object.prototype.toString.call(value) === '[object String]';
```

**Examples**

```js
isString('hello world'); // true
isString(new String('hello world')); // true
isString(10); // false
```
---

## Check if a value is an object


**JavaScript version**

```js
const isObject = (v) => v !== null && typeof v === 'object';
```

**TypeScript version**

```js
const isObject = (v: any): boolean => v !== null && typeof v === 'object';
```

**Examples**

```js
isObject(null); // false
isObject('hello world'); // false

isObject({}); // true
isObject([]); // true
```
---

## Check if a value is base32 encoded


**JavaScript version**

```js
const isBase32 = (value) => value.length % 8 === 0 && /^[A-Z2-7]+=*$/.test(value);
```

**TypeScript version**

```js
const isBase32 = (value: string): boolean => value.length % 8 === 0 && /^[A-Z2-7]+=*$/.test(value);
```
---

## Check if a value is base58 encoded


**JavaScript version**

```js
// It doesn't accept the I, O, l characters
const isBase58 = (value) => /^[A-HJ-NP-Za-km-z1-9]*$/.test(value);
```

**TypeScript version**

```js
const isBase58 = (value: string): boolean => /^[A-HJ-NP-Za-km-z1-9]*$/.test(value);
```
---

## Check if a value is base64 encoded


**JavaScript version**

```js
const isBase64 = (value) => /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})$/.test(value);
```

**TypeScript version**

```js
const isBase64 = (value: string): boolean => /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})$/.test(value);
```
---

## Check if a value is nil


**JavaScript version**

```js
const isNil = (value) => value == null;
```

**TypeScript version**

```js
const isNil = (value: any): boolean => value == null;
```
---

## Check if a year is leap year


**JavaScript version**

```js
const isLeapYear = (year) => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

// Or
// Get the number of days in February
const isLeapYear = (year) => new Date(year, 1, 29).getDate() === 29;
```

**TypeScript version**

```js
const isLeapYear = (year: number): boolean => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

// Or
const isLeapYear = (year: number): boolean => new Date(year, 1, 29).getDate() === 29;
```
---

## Check if all array elements are equal to a given value


**JavaScript version**

```js
const isEqual = (arr, value) => arr.every((item) => item === value);

// Or
// Ends earlier for false arrays
const isEqual = (arr, value) => !arr.some((item) => item !== value);
```

**TypeScript version**

```js
const isEqual = <T,_>(arr: T[], value: T): boolean => arr.every((item) => item === value);

// Or
const isEqual = <T,_>(arr: T[], value: T): boolean => !arr.some((item) => item !== value);
```

**Examples**

```js
isEqual(['foo', 'foo'], 'foo'); // true
isEqual(['foo', 'bar'], 'foo'); // false
isEqual(['bar', 'bar'], 'foo'); // false
```
---

## Check if all items in an array are equal


**JavaScript version**

```js
const areEqual = (arr) => arr.length > 0 && arr.every((item) => item === arr[0]);

// Or
const areEqual = (arr) => new Set(arr).size === 1;
```

**TypeScript version**

```js
const areEqual = <T,_>(arr: T[]): boolean => arr.length > 0 && arr.every((item) => item === arr[0]);

// Or
const areEqual = <T,_>(arr: T[]): boolean => new Set(arr).size === 1;
```

**Examples**

```js
areEqual([1, 2, 3, 4]); // false
areEqual(['hello', 'hello', 'hello']); // true
```
---

## Check if an array contains a value matching some criterias


**JavaScript version**

```js
const contains = (arr, criteria) => arr.some((v) => criteria(v));

// Or
const contains = (arr, criteria) => arr.some(criteria);

// Or
const contains = (arr, criteria) => arr.filter(criteria).length > 0;
```

**TypeScript version**

```js
const contains = <T,_>(arr: T[], criteria: (a: T) => boolean): boolean => arr.some((v) => criteria(v));

// Or
const contains = <T,_>(arr: T[], criteria: (a: T) => boolean): boolean => arr.some(criteria);

// Or
const contains = <T,_>(arr: T[], criteria: (a: T) => boolean): boolean => arr.filter(criteria).length > 0;
```

**Examples**

```js
contains([10, 20, 30], (v) => v > 25); // true
contains([10, 20, 30], (v) => v > 100 || v < 15); // true
contains([10, 20, 30], (v) => v > 100); // false
```
---

## Check if an array is not empty


**JavaScript version**

```js
const isNotEmpty = (arr) => Array.isArray(arr) && Object.keys(arr).length > 0;
```

**TypeScript version**

```js
const isNotEmpty = (arr: any): boolean => Array.isArray(arr) && Object.keys(arr).length > 0;
```

**Examples**

```js
isNotEmpty([]); // false
isNotEmpty([1, 2, 3]); // true
```
---

## Check if an array is subset of other array


**JavaScript version**

```js
// Check if `b` is subset of `a`
const isSubset = (a, b) => new Set(b).size === new Set(b.concat(a)).size;

// Or
const isSubset = (a, b) => b.join('|').includes(a.join('|'));
```

**TypeScript version**

```js
const isSubset = <T,_>(a: T[], b: T[]): boolean => new Set(b).size === new Set(b.concat(a)).size;

// Or
const isSubset = <T,_>(a: T[], b: T[]): boolean => b.join('|').includes(a.join('|'));
```

**Examples**

```js
isSubset([1, 2], [1, 2, 3, 4]); // true
isSubset([1, 2, 5], [1, 2, 3, 4]); // false
isSubset([6], [1, 2, 3, 4]); // false
```
---

## Check if an object is a Promise


**JavaScript version**

```js
const isPromise = (obj) => !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
```

**TypeScript version**

```js
const isPromise = (obj: any): boolean => !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
```
---

## Check if an object is an array


**JavaScript version**

```js
const isArray = (obj) => Array.isArray(obj);
```

**TypeScript version**

```js
const isArray = (obj: any): boolean => Array.isArray(obj);
```
---

## Check if an object is empty


**JavaScript version**

```js
const isEmpty = (obj) => Reflect.ownKeys(obj).length === 0 && obj.constructor === Object;

// Or for enumerable property names only
const isEmpty = (obj) => JSON.stringify(obj) === '{}';
```

**TypeScript version**

```js
const isEmpty = (obj: object): boolean => Reflect.ownKeys(obj).length === 0 && obj.constructor === Object;

const isEmpty = (obj: object): boolean => JSON.stringify(obj) === '{}';
```
---

## Validate a Gregorian date


**JavaScript version**

```js
// `m`: the month (zero-based index)
// `d`: the day
// `y`: the year
const isValidDate = (m, d, y) => 0 <= m && m <= 11 && 0 < y && y < 32768 && 0 < d && d <= new Date(y, m, 0).getDate();
```

**TypeScript version**

```js
const isValidDate = (m: number, d: number, y: number): boolean => 0 <= m && m <= 11 && 0 < y && y < 32768 && 0 < d && d <= new Date(y, m, 0).getDate();
```
---

