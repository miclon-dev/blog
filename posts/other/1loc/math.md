---
title: 数学Math
icon: javascript
order: 7
date: 2022-08-10
category:
- 1loc
tag:
- javascript
---


## Calculate the angle of a line defined by two points


**JavaScript version**

```js
// In radians
const radiansAngle = (p1, p2) => Math.atan2(p2.y - p1.y, p2.x - p1.x);

// In degrees
const degreesAngle = (p1, p2) => (Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180) / Math.PI;
```

**TypeScript version**

```js
interface Point {
    x: number;
    y: number;
}

const radiansAngle = (p1: Point, p2: Point): number => Math.atan2(p2.y - p1.y, p2.x - p1.x);

const degreesAngle = (p1: Point, p2: Point): number => (Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180) / Math.PI;
```
---

## Calculate the distance between two points


**JavaScript version**

```js
const distance = (p1, p2) => Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
```

**TypeScript version**

```js
interface Point {
    x: number;
    y: number;
}

const distance = (p1: Point, p2: Point): number => Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
```
---

## Calculate the linear interpolation between two numbers


**JavaScript version**

```js
const lerp = (a, b, amount) => (1 - amount) * a + amount * b;
```

**TypeScript version**

```js
const lerp = (a: number, b: number, amount: number): number => (1 - amount) * a + amount * b;
```
---

## Calculate the midpoint between two points


**JavaScript version**

```js
const midpoint = (p1, p2) => [(p1.x + p2.x) / 2, (p1.y + p2.y) / 2];
```

**TypeScript version**

```js
interface Point {
    x: number;
    y: number;
}

const midpoint = (p1: Point, p2: Point): number[] => [(p1.x + p2.x) / 2, (p1.y + p2.y) / 2];
```
---

## Check if a point is inside a rectangle


**JavaScript version**

```js
const isInside = (point, rect) => point.x > rect.left && point.x < rect.right && point.y > rect.top && point.y < rect.bottom;
```

**TypeScript version**

```js
interface Point {
    x: number;
    y: number;
}

interface Rect {
    bottom: number;
    left: number;
    top: number;
    right: number;
}

const isInside = (point: Point, rect: Rect): boolean => point.x > rect.left && point.x < rect.right && point.y > rect.top && point.y < rect.bottom;
```
---

## Check if a rectangle contains other one


**JavaScript version**

```js
// Returns true if `a` contains `b`
// (x1, y1) and (x2, y2) are top-left and bottom-right corners
const contains = (a, b) => a.x1 <= b.x1 && a.y1 <= b.y1 && a.x2 >= b.x2 && a.y2 >= b.y2;
```

**TypeScript version**

```js
interface Rect {
    x1: number;
    x2: number;
    y1: number;
    y2: number;
}

const contains = (a: Rect, b: Rect): boolean => a.x1 <= b.x1 && a.y1 <= b.y1 && a.x2 >= b.x2 && a.y2 >= b.y2;
```
---

## Check if a rectangle overlaps other one


**JavaScript version**

```js
// Returns true if `a` overlaps `b`
// (x1, y1) and (x2, y2) are top-left and bottom-right corners
const overlaps = (a, b) => (a.x1 < b.x2 && b.x1 < a.x2) || (a.y1 < b.y2 && b.y1 < a.y2);
```

**TypeScript version**

```js
interface Rect {
    x1: number;
    x2: number;
    y1: number;
    y2: number;
}

const contains = (a: Rect, b: Rect): boolean => (a.x1 < b.x2 && b.x1 < a.x2) || (a.y1 < b.y2 && b.y1 < a.y2);
```
---

## Convert degrees to radians


**JavaScript version**

```js
const degsToRads = (deg) => (deg * Math.PI) / 180.0;
```

**TypeScript version**

```js
const degsToRads = (deg: number): number => (deg * Math.PI) / 180.0;
```
---

## Convert radians to degrees


**JavaScript version**

```js
const radsToDegs = (rad) => (rad * 180) / Math.PI;
```

**TypeScript version**

```js
const radsToDegs = (rad: number): number => (rad * 180) / Math.PI;
```
---

## Normalize the ratio of a number in a range


**JavaScript version**

```js
const normalizeRatio = (value, min, max) => (value - min) / (max - min);
```

**TypeScript version**

```js
const normalizeRatio = (value: number, min: number, max: number): number => (value - min) / (max - min);
```
---

## Round a number to the nearest multiple of a given value


**JavaScript version**

```js
const roundNearest = (value, nearest) => Math.round(value / nearest) * nearest;
```

**TypeScript version**

```js
const roundNearest = (value: number, nearest: number): number => Math.round(value / nearest) * nearest;
```

**Examples**

```js
roundNearest(100, 30); // 90
roundNearest(200, 30); // 210
roundNearest(200, 40); // 200
```
---

