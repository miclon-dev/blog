---
title: 字符串String
icon: javascript
order: 4
date: 2022-08-10
category:
- 1loc
tag:
- javascript
---


## Capitalize a string


**JavaScript version**

```js
const capitalize = (str) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`;

// Or
const capitalize = ([first, ...rest]) => `${first.toUpperCase()}${rest.join('')}`;

// Or
const capitalize = (str) => str.replace(/^([a-z])/, (first) => first.toUpperCase());
```

**TypeScript version**

```js
const capitalize = (str: string): string => `${str.charAt(0).toUpperCase()}${str.slice(1)}`;

// Or
const capitalize = ([first, ...rest]: string): string => `${first.toUpperCase()}${rest.join('')}`;

// Or
const capitalize = (str: string): string => str.replace(/^([a-z])/, (first) => first.toUpperCase());
```

**Examples**

```js
capitalize('hello world'); // 'Hello world'
```
---

## Check if a path is relative


**JavaScript version**

```js
const isRelative = (path) => !/^([a-z]+:)?[\\/]/i.test(path);
```

**TypeScript version**

```js
const isRelative = (path: string): boolean => !/^([a-z]+:)?[\\/]/i.test(path);
```

**Examples**

```js
isRelative('/foo/bar/baz'); // false
isRelative('C:\\foo\\bar\\baz'); // false
isRelative('foo/bar/baz.txt'); // true
isRelative('foo.md'); // true
```
---

## Check if a string consists of a repeated character sequence


**JavaScript version**

```js
const consistsRepeatedSubstring = (str) => `${str}${str}`.indexOf(str, 1) !== str.length;
```

**TypeScript version**

```js
const consistsRepeatedSubstring = (str: string): boolean => `${str}${str}`.indexOf(str, 1) !== str.length;
```

**Examples**

```js
consistsRepeatedSubstring('aa'); // true
consistsRepeatedSubstring('aaa'); // true
consistsRepeatedSubstring('ababab'); // true
consistsRepeatedSubstring('abc'); // false
```
---

## Check if a string is a palindrome


**JavaScript version**

```js
const isPalindrome = (str) => str === str.split('').reverse().join('');
```

**TypeScript version**

```js
const isPalindrome = (str: string): boolean => str === str.split('').reverse().join('');
```

**Examples**

```js
isPalindrome('abc'); // false
isPalindrom('abcba'); // true
```
---

## Check if a URL is absolute


**JavaScript version**

```js
const isAbsoluteUrl = (url) => /^[a-z][a-z0-9+.-]*:/.test(url);
```

**TypeScript version**

```js
const isAbsoluteUrl = (url: string): boolean => /^[a-z][a-z0-9+.-]*:/.test(url);
```

**Examples**

```js
isAbsoluteUrl('https://1loc.dev'); // true
isAbsoluteUrl('https://1loc.dev/foo/bar'); // true
isAbsoluteUrl('1loc.dev'); // false
isAbsoluteUrl('//1loc.dev'); // false
```
---

## Check if two strings are anagram


**JavaScript version**

```js
const areAnagram = (str1, str2) => str1.toLowerCase().split('').sort().join('') === str2.toLowerCase().split('').sort().join('');
```

**TypeScript version**

```js
const areAnagram = (str1: string, str2: string): boolean => str1.toLowerCase().split('').sort().join('') === str2.toLowerCase().split('').sort().join('');
```

**Examples**

```js
areAnagram('listen', 'silent'); // true
areAnagram('they see', 'the eyes'); // true
areAnagram('node', 'deno'); // true
```
---

## Convert a base64 encoded string to an uint8 array


**JavaScript version**

```js
const base64ToUint8 = (str) => Uint8Array.from(atob(str), (c) => c.charCodeAt(0));
```

**TypeScript version**

```js
const base64ToUint8 = (str: string): Uint8Array => Uint8Array.from(atob(str), (c) => c.charCodeAt(0));
```

**See also**

-   [Convert an uint8 array to a base64 encoded string](/string/convert-an-uint8-array-to-a-base64-encoded-string)
---

## Convert a letter to associate emoji


**JavaScript version**

```js
const letterToEmoji = (c) => String.fromCodePoint(c.toLowerCase().charCodeAt(0) + 127365);
```

**TypeScript version**

```js
const letterToEmoji = (c: string): string => String.fromCodePoint(c.toLowerCase().charCodeAt(0) + 127365);
```

**Examples**

```js
letterToEmoji('a'); // 🇦
letterToEmoji('b'); // 🇧
```
---

## Convert a string to camelCase


**JavaScript version**

```js
const toCamelCase = (str) => str.trim().replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''));
```

**TypeScript version**

```js
const toCamelCase = (str: string): string => str.trim().replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''));
```

**Examples**

```js
toCamelCase('background-color'); // backgroundColor
toCamelCase('-webkit-scrollbar-thumb'); // WebkitScrollbarThumb
toCamelCase('_hello_world'); // HelloWorld
toCamelCase('hello_world'); // helloWorld
```
---

## Convert a string to PascalCase


**JavaScript version**

```js
const toPascalCase = (str) => (str.match(/[a-zA-Z0-9]+/g) || []).map((w) => `${w.charAt(0).toUpperCase()}${w.slice(1)}`).join('');
```

**TypeScript version**

```js
const toPascalCase = (str: string): string => (str.match(/[a-zA-Z0-9]+/g) || []).map((w) => `${w.charAt(0).toUpperCase()}${w.slice(1)}`).join('');
```

**Examples**

```js
toPascalCase('hello world'); // 'HelloWorld'
toPascalCase('hello.world'); // 'HelloWorld'
toPascalCase('foo_bar-baz'); // FooBarBaz
```
---

## Convert a string to URL slug


**JavaScript version**

```js
const slugify = (str) =>
    str
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '');
```

**TypeScript version**

```js
const slugify = (str: string): string =>
    str
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '');
```

**Examples**

```js
slugify('Chapter One: Once upon a time...'); // 'chapter-one-once-upon-a-time'
```
---

## Convert a Windows file path to Unix path


**JavaScript version**

```js
const toUnixPath = (path) => path.replace(/[\\/]+/g, '/').replace(/^([a-zA-Z]+:|\.\/)/, '');
```

**TypeScript version**

```js
const toUnixPath = (path: string): string => path.replace(/[\\/]+/g, '/').replace(/^([a-zA-Z]+:|\.\/)/, '');
```

**Examples**

```js
toUnixPath('./foo/bar/baz'); // foo/bar/baz
toUnixPath('C:\\foo\\bar\\baz'); // /foo/bar/baz
```
---

## Convert an uint8 array to a base64 encoded string


**JavaScript version**

```js
const uint8ToBase64 = (arr) =>
    btoa(
        Array(arr.length)
            .fill('')
            .map((_, i) => String.fromCharCode(arr[i]))
            .join('')
    );

// For Node.js
const uint8ToBase64 = (arr) => Buffer.from(arr).toString('base64');
```

**TypeScript version**

```js
const uint8ToBase64 = (arr: Uint8Array): string =>
    btoa(
        Array(arr.length)
            .fill('')
            .map((_, i) => String.fromCharCode(arr[i]))
            .join('')
    );

// For Node.js
const uint8ToBase64 = (arr: Uint8Array): string => Buffer.from(arr).toString('base64');
```

**See also**

-   [Convert a base64 encoded string to an uint8 array](/string/convert-a-base64-encoded-string-to-an-uint8-array)
---

## Convert camelCase to kebab-case and vice versa


**JavaScript version**

```js
const kebabToCamel = (str) => str.replace(/-./g, (m) => m.toUpperCase()[1]);

const camelToKebab = (str) => str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
```

**TypeScript version**

```js
const kebabToCamel = (str: string): string => str.replace(/-./g, (m) => m.toUpperCase()[1]);

const camelToKebab = (str: string): string => str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
```

**Examples**

```js
kebabToCamel('background-color'); // 'backgroundColor'
camelToKebab('backgroundColor'); // 'background-color'
```
---

## Convert snake_case to camelCase


**JavaScript version**

```js
const snakeToCamel = (str) => str.toLowerCase().replace(/(_\w)/g, (m) => m.toUpperCase().substr(1));
```

**TypeScript version**

```js
const snakeToCamel = (str: string): string => str.toLowerCase().replace(/(_\w)/g, (m) => m.toUpperCase().substr(1));
```

**Examples**

```js
snakeToCamel('HELLO_world'); // 'helloWorld'
```
---

## Convert the name of an Excel column to number


**JavaScript version**

```js
const getIndex = (col) => col.split('').reduce((prev, next) => prev * 26 + parseInt(next, 36) - 9, 0);
```

**TypeScript version**

```js
const getIndex = (col: string): number => col.split('').reduce((prev, next) => prev * 26 + parseInt(next, 36) - 9, 0);
```

**Examples**

```js
getIndex('A'); // 1
getIndex('B'); // 2
getIndex('C'); // 3
getIndex('Z'); // 26

getIndex('AA'); // 27
getIndex('AB'); // 28
getIndex('AC'); // 29
getIndex('AZ'); // 52

getIndex('AAA'); // 703
getIndex('AAB'); // 704
```
---

## Count the number of words in a string


**JavaScript version**

```js
const countWords = (str) => str.trim().split(/\s+/).length;
```

**TypeScript version**

```js
const countWords = (str: string): number => str.trim().split(/\s+/).length;
```

**Examples**

```js
countWords('Hello World'); // 2
countWords('Hello    World'); // 2
countWords('  Hello  World  '); // 2
```
---

## Count the occurrences of a character in a string


**JavaScript version**

```js
const countOccurrences = (str, char) => [...str].reduce((a, v) => (v === char ? a + 1 : a), 0);

// Or
const countOccurrences = (str, char) => str.split('').reduce((a, v) => (v === char ? a + 1 : a), 0);

// Or
const countOccurrences = (str, char) => [...str].filter((item) => item === char).length;

// Or
const countOccurrences = (str, char) => str.split('').filter((item) => item === char).length;
```

**TypeScript version**

```js
const countOccurrences = (str: string, char: string): number => [...str].reduce((a, v) => (v === char ? a + 1 : a), 0);

// Or
const countOccurrences = (str: string, char: string): number => str.split('').reduce((a, v) => (v === char ? a + 1 : a), 0);

// Or
const countOccurrences = (str: string, char: string): number => [...str].filter((item) => item === char).length;

// Or
const countOccurrences = (str: string, char: string): number => str.split('').filter((item) => item === char).length;
```

**Examples**

```js
countOccurrences('a.b.c.d.e', '.'); // 4
```
---

## Decapitalize a string


**JavaScript version**

```js
const decapitalize = (str) => `${str.charAt(0).toLowerCase()}${str.slice(1)}`;

// Or
const decapitalize = ([first, ...rest]) => `${first.toLowerCase()}${rest.join('')}`;
```

**TypeScript version**

```js
const decapitalize = (str: string): string => `${str.charAt(0).toLowerCase()}${str.slice(1)}`;

// Or
const decapitalize = ([first, ...rest]: string): string => `${first.toLowerCase()}${rest.join('')}`;
```

**Examples**

```js
decapitalize('Hello world'); // 'hello world'
```
---

## Escape HTML special characters


**JavaScript version**

```js
const escape = (str) => str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/'/g, '&#39;').replace(/"/g, '&quot;');

// Or
const escape = (str) => str.replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
```

**TypeScript version**

```js
const escape = (str: string): string => str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/'/g, '&#39;').replace(/"/g, '&quot;');

// Or
const escape = (str: string): string => str.replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
```
---

## Format a string


**JavaScript version**

```js
const format = (str, ...vals) => vals.reduce((s, v, i) => s.replace(new RegExp('\\{' + i + '\\}', 'g'), v), str);
```

**TypeScript version**

```ts
const format = (str: string, ...vals: unknown[]): string => vals.reduce((s, v, i) => s.replace(new RegExp('\\{' + i + '\\}', 'g'), v), str);
```

**Examples**

```js
const template = 'My name is {0} and I am {1} years old';

format(template, 'John', 30));
// My name is John and I am 30 years old

format(template, 'Jane', 20);
// My name is Jane and I am 20 years old
```
---

## Generate a hash of a string


**JavaScript version**

```js
const hash = (str) => str.split('').reduce((prev, curr) => (Math.imul(31, prev) + curr.charCodeAt(0)) | 0, 0);

// Or
const hash = (str) => str.split('').reduce((prev, curr) => ((prev << 5) - prev + curr.charCodeAt(0)) | 0, 0);
```

**TypeScript version**

```js
const hash = (str: string): number => str.split('').reduce((prev, curr) => (Math.imul(31, prev) + curr.charCodeAt(0)) | 0, 0);

// Or
const hash = (str: string): number => str.split('').reduce((prev, curr) => ((prev << 5) - prev + curr.charCodeAt(0)) | 0, 0);
```

**Examples**

```js
hash('hello'); // 99162322
```
---

## Get the base URL without any parameters


**JavaScript version**

```js
const baseUrl = (url) => (url.indexOf('?') === -1 ? url : url.slice(0, url.indexOf('?')));

// Or
// Note that `includes` isn't supported in IE 11
const baseUrl = (url) => (url.includes('?') ? url.slice(0, url.indexOf('?')) : url);

// Or
const baseUrl = (url) => url.split('?')[0];
```

**TypeScript version**

```js
const baseUrl = (url: string): string => (url.indexOf('?') === -1 ? url : url.slice(0, url.indexOf('?')));

// Or
// Note that `includes` isn't supported in IE 11
const baseUrl = (url: string): string => (url.includes('?') ? url.slice(0, url.indexOf('?')) : url);

// Or
const baseUrl = (url: string): string => url.split('?')[0];
```

**Examples**

```js
baseUrl('https://domain.com/path/sub/path?foo=bar&hello=world'); // 'https://domain.com/path/sub/path'
```
---

## Get the file extension from a file name


**JavaScript version**

```js
const ext = (fileName) => fileName.split('.').pop();
```

**TypeScript version**

```js
const ext = (fileName: string): string => fileName.split('.').pop();
```
---

## Get the file name from a URL


**JavaScript version**

```js
const fileName = (url: string): string => url.substring(url.lastIndexOf('/') + 1);
```

**TypeScript version**

```js
const fileName = (url: string): string => url.substring(url.lastIndexOf('/') + 1);
```

**Examples**

```js
fileName('http://domain.com/path/to/document.pdf'); // 'document.pdf'
```
---

## Get the length of a string in bytes


**JavaScript version**

```js
const bytes = (str) => new Blob([str]).size;
```

**TypeScript version**

```js
const bytes = (str: string): number => new Blob([str]).size;
```

**Examples**

```js
bytes('hello world'); // 11
bytes('🎉'); // 4
```
---

## Get the number of a character in a string


**JavaScript version**

```js
const characterCount = (str, char) => str.split(char).length - 1;

// Or
const characterCount = (str, char) => str.replace(new RegExp(String.raw`[^${char}]`, 'g'), '').length;
```

**TypeScript version**

```js
const characterCount = (str: string, char: string): number => str.split(char).length - 1;

// Or
const characterCount = (str: string, char: string): number => str.replace(new RegExp(String.raw`[^${char}]`, 'g'), '').length;
```

**Examples**

```js
characterCount('192.168.1.1', '.'); // 3
characterCount('star wars', 's'); // 2
```
---

## Make the first character of a string lowercase


**JavaScript version**

```js
const lowercaseFirst = (str) => `${str.charAt(0).toLowerCase()}${str.slice(1)}`;
```

**TypeScript version**

```js
const lowercaseFirst = (str: string): string => `${str.charAt(0).toLowerCase()}${str.slice(1)}`;
```

**Examples**

```js
lowercaseFirst('Hello World'); // 'hello World'
```
---

## Normalize file path slashes


**JavaScript version**

```js
const normalizePath = (path) => path.replace(/[\\/]+/g, '/');
```

**TypeScript version**

```js
const normalizePath = (path: string): string => path.replace(/[\\/]+/g, '/');
```

**Examples**

```js
normalizePath('\\foo\\bar\\baz\\'); // /foo/bar/baz/
normalizePath('.//foo//bar///////baz/'); // ./foo/bar/baz/
```
---

## Prepend a line number to each line of a text document


**JavaScript version**

```js
const prependNumbers = (str) =>
    str
        .split(/\r?
/)
        .map((line, i) => `${(i + 1).toString().padStart(2, ' ')} ${line}`)
        .join('
');
```

**TypeScript version**

```js
const prependNumbers = (str: string): string =>
    str
        .split(/\r?
/)
        .map((line, i) => `${(i + 1).toString().padStart(2, ' ')} ${line}`)
        .join('
');
```

**Examples**

```js
prependNumbers(`one
two
three
four`);

/* Output */
/*
1 one
2 two
3 three
4 four
*/
```
---

## Remove duplicate lines of a text document


**JavaScript version**

```js
const removeDuplicateLines = (str) => Array.from(new Set(str.split(/\r?
/))).join('
');
```

**TypeScript version**

```js
const removeDuplicateLines = (str: string): string => Array.from(new Set(str.split(/\r?
/))).join('
');
```

**Examples**

```js
removeDuplicateLines(`one
three
two
three
one
four`);

/* Output */
/*
one
three
two
four
*/
```
---

## Remove empty lines of a text document


**JavaScript version**

```js
const removeEmptyLines = (str) =>
    str
        .split(/\r?
/)
        .filter((line) => line.trim() !== '')
        .join('
');
```

**TypeScript version**

```js
const removeEmptyLines = (str: string): string =>
    str
        .split(/\r?
/)
        .filter((line) => line.trim() !== '')
        .join('
');
```

**Examples**

```js
removeEmptyLines(`red

green
blue

yellow`);

/* Output */
/*
red
green
blue
yellow
*/
```
---

## Remove spaces from a string


**JavaScript version**

```js
const removeSpaces = (str) => str.replace(/\s/g, '');
```

**TypeScript version**

```js
const removeSpaces = (str: string): string => str.replace(/\s/g, '');
```

**Examples**

```js
removeSpaces('hel lo wor ld'); // 'helloworld'
```
---

## Repeat a string


**JavaScript version**

```js
const repeat = (str, numberOfTimes) => str.repeat(numberOfTimes);

// Or
const repeat = (str, numberOfTimes) => Array(numberOfTimes + 1).join(str);
```

**TypeScript version**

```js
const repeat = (str: string, numberOfTimes: number): string => str.repeat(numberOfTimes);

// Or
const repeat = (str: string, numberOfTimes: number): string => Array(numberOfTimes + 1).join(str);
```
---

## Replace all line breaks with br elements


**JavaScript version**

```js
const nl2br = (str) => str.replace(new RegExp('\r?
', 'g'), '<br>');

// In React
str.split('
').map((item, index) => (
    <React.Fragment key={index}>
        {item}
        <br />
    </React.Fragment>
));
```

**TypeScript version**

```js
const nl2br = (str: string): string => str.replace(new RegExp('\r?
', 'g'), '<br>');
```
---

## Replace all tab characters with spaces


**JavaScript version**

```js
const replace = (str, numSpaces = 4) => str.replaceAll('\t', ' '.repeat(numSpaces));
```

**TypeScript version**

```js
const replace = (str: string, numSpaces = 4): string => str.replaceAll('\t', ' '.repeat(numSpaces));
```
---

## Replace multiple spaces with a single space


**JavaScript version**

```js
// Replace spaces, tabs and new line characters
const replaceSpaces = (str) => str.replace(/\s\s+/g, ' ');

// Only replace spaces
const replaceOnlySpaces = (str) => str.replace(/  +/g, ' ');
```

**TypeScript version**

```js
const replaceSpaces = (str: string): string => str.replace(/\s\s+/g, ' ');

const replaceOnlySpaces = (str: string): string => str.replace(/  +/g, ' ');
```

**Examples**

```js
replaceSpaces('this
   is     \ta    \rmessage'); // 'this is a message'
```
---

## Replace the first given number of characters of a string with another character


**JavaScript version**

```js
const mask = (str, num, mask) => `${str}`.slice(num).padStart(`${str}`.length, mask);
```

**TypeScript version**

```js
const mask = (str: string, num: number, mask: string): string => `${str}`.slice(num).padStart(`${str}`.length, mask);
```

**Examples**

```js
mask(1234567890, 3, '*'); // ***4567890
```
---

## Reverse a string


**JavaScript version**

```js
const reverse = (str) => str.split('').reverse().join('');

// Or
const reverse = (str) => [...str].reverse().join('');

// Or
const reverse = (str) => str.split('').reduce((rev, char) => `${char}${rev}`, '');

// Or
const reverse = (str) => (str === '' ? '' : `${reverse(str.substr(1))}${str.charAt(0)}`);
```

**TypeScript version**

```js
const reverse = (str: string): string => str.split('').reverse().join('');

// Or
const reverse = (str: string): string => [...str].reverse().join('');

// Or
const reverse = (str: string): string => str.split('').reduce((rev, char) => `${char}${rev}`, '');

// Or
const reverse = (str: string): string => (str === '' ? '' : `${reverse(str.substr(1))}${str.charAt(0)}`);
```

**Examples**

```js
reverse('hello world'); // 'dlrow olleh'
```
---

## Reverse the order of lines of a text


**JavaScript version**

```js
const reverseLines = (str) => str.split(/\r?
/).reverse().join('
');
```

**TypeScript version**

```js
const reverseLines = (str: string): string => str.split(/\r?
/).reverse().join('
');
```

**Examples**

```js
reverseLines(`one
two
three`);

/* Output */
/*
three
two
one
*/
```
---

## Sort lines of a text document in the alphabetical order


**JavaScript version**

```js
const sortLines = (str) => str.split(/\r?
/).sort().join('
');

// Reverse the order
const reverseSortedLines = (str) => str.split(/\r?
/).sort().reverse().join('
');
```

**TypeScript version**

```js
const sortLines = (str: string): string => str.split(/\r?
/).sort().join('
');

// Reverse the order
const reverseSortedLines = (str: string): string => str.split(/\r?
/).sort().reverse().join('
');
```

**Examples**

```js
sortLines(`Thaddeus Mullen
Kareem Marshall
Ferdinand Valentine
Hasad Lindsay
Mufutau Berg
Knox Tyson
Kasimir Fletcher
Colton Sharp
Adrian Rosales
Theodore Rogers`);

/* Output */
/*
Adrian Rosales
Colton Sharp
Ferdinand Valentine
Hasad Lindsay
Kareem Marshall
Kasimir Fletcher
Knox Tyson
Mufutau Berg
Thaddeus Mullen
Theodore Rogers
*/
```
---

## Sort the characters of a string in the alphabetical order


**JavaScript version**

```js
const sort = (str) =>
    str
        .split('')
        .sort((a, b) => a.localeCompare(b))
        .join('');
```

**TypeScript version**

```js
const sort = (str: string): string =>
    str
        .split('')
        .sort((a, b) => a.localeCompare(b))
        .join('');
```

**Examples**

```js
sort('hello world'); // dehllloorw
```
---

## Strip ANSI codes from a string


**JavaScript version**

```js
const stripAnsiCodes = (str) => str.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '');
```

**TypeScript version**

```js
const stripAnsiCodes = (str: string): string => str.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '');
```

**Examples**

```js
stripAnsiCodes('\u001B[4mcake\u001B[0m'); // 'cake'
stripAnsiCodes('\u001B[0m\u001B[4m\u001B[42m\u001B[31mfoo\u001B[39m\u001B[49m\u001B[24mfoo\u001B[0m'); // 'foofoo'
```
---

## Swap case of characters in a string


**JavaScript version**

```js
const swapCase = (str) =>
    str
        .split('')
        .map((c) => (c === c.toLowerCase() ? c.toUpperCase() : c.toLowerCase()))
        .join('');
```

**TypeScript version**

```js
const swapCase = (str: string): string =>
    str
        .split('')
        .map((c) => (c === c.toLowerCase() ? c.toUpperCase() : c.toLowerCase()))
        .join('');
```

**Examples**

```js
swapCase('Hello World'); // 'hELLO wORLD'
```
---

## Trim slashes at the beginning and the end of a string


**JavaScript version**

```js
const trimSlashes = (str) => str.replace(/^\/+|\/+$/g, '');

// Or
const trimSlashes = (str) => str.split('/').filter(Boolean).join('/');
```

**TypeScript version**

```js
const trimSlashes = (str: string): string => str.replace(/^\/+|\/+$/g, '');

// Or
const trimSlashes = (str: string): string => str.split('/').filter(Boolean).join('/');
```

**Examples**

```js
trimSlashes('//hello/world///'); // hello/world
```
---

## Trim some character


**JavaScript version**

```js
const trim = (str, char) => str.split(char).filter(Boolean).join();
```

**TypeScript version**

```js
const trim = (str: string, char: string): string => str.split(char).filter(Boolean).join();
```

**Examples**

```js
trim('/hello world//', '/'); // hello world
trim('"hello world"', '"'); // hello world
trim('   hello world ', ' '); // hello world
```
---

## Trim the file extension from a file name


**JavaScript version**

```js
const trimExt = (fileName) => (fileName.indexOf('.') === -1 ? fileName : fileName.split('.').slice(0, -1).join('.'));
```

**TypeScript version**

```js
const trimExt = (fileName: string): string => (fileName.indexOf('.') === -1 ? fileName : fileName.split('.').slice(0, -1).join('.'));
```

**Examples**

```js
trimExt('document'); // document
trimExt('document.pdf'); // document
trimExt('document.2020.pdf'); // document.2020
```
---

## Truncate a string at full words


**JavaScript version**

```js
const truncate = (str, max, suffix) => (str.length < max ? str : `${str.substr(0, str.substr(0, max - suffix.length).lastIndexOf(' '))}${suffix}`);
```

**TypeScript version**

```js
const truncate = (str: string, max: number, suffix: string = '...'): string => (str.length < max ? str : `${str.substr(0, str.substr(0, max - suffix.length).lastIndexOf(' '))}${suffix}`);
```

**Examples**

```js
truncate('This is a long message', 20, '...'); // 'This is a long...'
```
---

## Unescape HTML special characters


**JavaScript version**

```js
const unescape = (str) =>
    str
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&#0*39;/g, "'")
        .replace(/&quot;/g, '"');
```

**TypeScript version**

```js
const unescape = (str: string): string =>
    str
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&#0*39;/g, "'")
        .replace(/&quot;/g, '"');
```
---

## Uppercase the first character of each word in a string


**JavaScript version**

```js
const uppercaseWords = (str) =>
    str
        .split(' ')
        .map((w) => `${w.charAt(0).toUpperCase()}${w.slice(1)}`)
        .join(' ');

// Or
const uppercaseWords = (str) => str.replace(/^(.)|\s+(.)/g, (c) => c.toUpperCase());
```

**TypeScript version**

```js
const uppercaseWords = (str: string): string =>
    str
        .split(' ')
        .map((w) => `${w.charAt(0).toUpperCase()}${w.slice(1)}`)
        .join(' ');

// Or
const uppercaseWords = (str: string): string => str.replace(/^(.)|\s+(.)/g, (c) => c.toUpperCase());
```

**Examples**

```js
uppercaseWords('hello world'); // 'Hello World'
```
---

