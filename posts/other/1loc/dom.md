---
title: Dom
icon: javascript
order: 10
date: 2022-08-10
category:
- 1loc
tag:
- javascript
---


## Check if an element is a descendant of another


**JavaScript version**

```js
const isDescendant = (child, parent) => parent.contains(child);
```

**TypeScript version**

```js
const isDescendant = (child: Node, parent: Node): boolean => parent.contains(child);
```
---

## Check if an element is focused


**JavaScript version**

```js
const hasFocus = (ele) => ele === document.activeElement;
```

**TypeScript version**

```js
const hasFocus = (ele: Node): boolean => ele === document.activeElement;
```
---

## Check if the touch events are supported


**JavaScript version**

```js
const touchSupported = () => 'ontouchstart' in window || (window.DocumentTouch && document instanceof window.DocumentTouch);
```

**TypeScript version**

```js
const touchSupported = (): boolean => (
    'ontouchstart' in window || (window as any)['DocumentTouch'] && document instanceof (window as any)['DocumentTouch']
);
```
---

## Check if user scrolls to the bottom of the page


**JavaScript version**

```js
const isAtBottom = () => document.documentElement.clientHeight + window.scrollY >= document.documentElement.scrollHeight;
```

**TypeScript version**

```js
const isAtBottom = (): boolean => document.documentElement.clientHeight + window.scrollY >= document.documentElement.scrollHeight;
```
---

## Detect Internet Explorer browser


**JavaScript version**

```js
const isIE = !!document.documentMode;
```

**TypeScript version**

```js
const isIE = !!(document as any).documentMode;
```
---

## Detect macOS browser


**JavaScript version**

```js
const isMacBrowser = /Mac|iPod|iPhone|iPad/.test(navigator.platform);
```

**TypeScript version**

```js
const isMacBrowser: boolean = /Mac|iPod|iPhone|iPad/.test(navigator.platform);
```
---

## Get all siblings of an element


**JavaScript version**

```js
const siblings = (ele) => [].slice.call(ele.parentNode.children).filter((child) => child !== ele);
```

**TypeScript version**

```js
const siblings = (ele: Node): Node[] => (ele.parentNode ? [].slice.call(ele.parentNode.children).filter((child) => child !== ele) : []);
```
---

## Get the position of an element relative to the document


**JavaScript version**

```js
const getPosition = (ele) => ((r = ele.getBoundingClientRect()), { left: r.left + window.scrollX, top: r.top + window.scrollY });
```

**Example**

```js
getPosition(document.body); // { left: 0, top: 0 }
```
---

## Get the selected text


**JavaScript version**

```js
const getSelectedText = () => window.getSelection().toString();
```
---

## Go back to the previous page


**JavaScript version**

```js
history.back();

// Or
history.go(-1);
```
---

## Hide an element


**JavaScript version**

```js
// Pick the method that is suitable for your use case
const hide = (ele) => (ele.style.display = 'none');

// Or
const hide = (ele) => (ele.style.visibility = 'hidden');

// Or
const hide = (ele) => (ele.hidden = true);
```

**TypeScript version**

```js
const hide = (ele: HTMLElement): string => (ele.style.display = 'none');

// Or
const hide = (ele: HTMLElement): string => (ele.style.visibility = 'hidden');

// Or
const hide = (ele: HTMLElement): boolean => (ele.hidden = true);
```
---

## Insert an element after other one


**JavaScript version**

```js
const insertAfter = (ele, anotherEle) => anotherEle.parentNode.insertBefore(ele, anotherEle.nextSibling);

// Or
const insertAfter = (ele, anotherEle) => anotherEle.insertAdjacentElement('afterend', ele);
```

**TypeScript version**

```js
const insertAfter = (ele: Element, anotherEle: Element): Element | null => (anotherEle.parentNode ? anotherEle.parentNode.insertBefore(ele, anotherEle.nextSibling) : null);

// Or
const insertAfter = (ele: Element, anotherEle: Element): Element | null => anotherEle.insertAdjacentElement('afterend', ele);
```
---

## Insert an element before other one


**JavaScript version**

```js
const insertBefore = (ele, anotherEle) => anotherEle.parentNode.insertBefore(ele, anotherEle);

// Or
const insertBefore = (ele, anotherEle) => anotherEle.insertAdjacentElement('beforebegin', ele);
```

**TypeScript version**

```js
const insertBefore = (ele: Element, anotherEle: Element): Element | null => (anotherEle.parentNode ? anotherEle.parentNode.insertBefore(ele, anotherEle) : null);

// Or
const insertBefore = (ele: Element, anotherEle: Element) => anotherEle.insertAdjacentElement('beforebegin', ele);
```
---

## Insert given HTML after an element


**JavaScript version**

```js
const insertHtmlAfter = (html, ele) => ele.insertAdjacentHTML('afterend', html);
```

**TypeScript version**

```js
const insertHtmlAfter = (html: string, ele: Element): void => ele.insertAdjacentHTML('afterend', html);
```
---

## Insert given HTML before an element


**JavaScript version**

```js
const insertHtmlBefore = (html, ele) => ele.insertAdjacentHTML('beforebegin', html);
```

**TypeScript version**

```js
const insertHtmlBefore = (html: string, ele: Element): void => ele.insertAdjacentHTML('beforebegin', html);
```
---

## Redirect to another page


**JavaScript version**

```js
const goTo = (url) => (location.href = url);
```

**TypeScript version**

```js
const goTo = (url: string): string => (location.href = url);
```
---

## Reload the current page


**JavaScript version**

```js
const reload = () => location.reload();

// Or
const reload = () => (location.href = location.href);
```

**TypeScript version**

```js
const reload = (): void => location.reload();

// Or
const reload = (): string => (location.href = location.href);
```
---

## Replace an element


**JavaScript version**

```js
const replace = (ele, newEle) => ele.parentNode.replaceChild(newEle, ele);
```

**TypeScript version**

```js
const replace = (ele: Element, newEle: Element): Element | null => (ele.parentNode ? ele.parentNode.replaceChild(newEle, ele) : null);
```
---

## Scroll to top of the page


**JavaScript version**

```js
const goToTop = () => window.scrollTo(0, 0);
```

**TypeScript version**

```js
const goToTop = (): void => window.scrollTo(0, 0);
```
---

## Serialize form data


**JavaScript version**

```js
const serialize = (formEle) => Array.from(new FormData(formEle)).reduce((p, [k, v]) => Object.assign({}, p, { [k]: p[k] ? (Array.isArray(p[k]) ? p[k] : [p[k]]).concat(v) : v }), {});
```
---

## Show an element


**JavaScript version**

```js
const show = (ele) => (ele.style.display = '');
```

**TypeScript version**

```js
const show = (ele: HTMLElement): string => (ele.style.display = '');
```
---

## Strip HTML from a given text


**JavaScript version**

```js
const stripHtml = (html) => new DOMParser().parseFromString(html, 'text/html').body.textContent || '';
```

**TypeScript version**

```js
const stripHtml = (html: string): string => new DOMParser().parseFromString(html, 'text/html').body.textContent || '';
```
---

## Toggle an element


**JavaScript version**

```js
const toggle = (ele) => (ele.style.display = ele.style.display === 'none' ? 'block' : 'none');

// Or
const toggle = (ele) => (ele.hidden = !ele.hidden);
```

**TypeScript version**

```js
const toggle = (ele: HTMLElement): string => (ele.style.display = ele.style.display === 'none' ? 'block' : 'none');

// Or
const toggle = (ele: HTMLElement): boolean => (ele.hidden = !ele.hidden);
```
---

