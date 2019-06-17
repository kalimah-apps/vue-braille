# vue-braille

[![npm](https://img.shields.io/npm/v/vue-braille.svg)](https://www.npmjs.com/package/vue-braille)
[![npm](https://img.shields.io/npm/dt/vue-braille.svg)](https://www.npmjs.com/package/vue-braille)
[![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)

Convert text into Braille using Vue

#Demo

[https://codepen.io/khr2003/pen/QXNYeP](https://codepen.io/khr2003/pen/QXNYeP)


# Installation

### Direct Download / CDN

https://unpkg.com/vue-braille

[unpkg.com](https://unpkg.com) provides NPM-based CDN links. The above link will always point to the latest release on NPM. You can also use a specific version/tag via URLs like https://unpkg.com/vue-braille@0.0.0 (change 0.0.0 to version number)

Include vue-braille after Vue and it will install itself automatically:

```html
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue-braille"></script>
```

### NPM

To install through npm use this command

```
$ npm install vue-braille
```

When used with a module system, you must explicitly install the `vue-braille` via `Vue.use()`:

```javascript
import Vue from 'vue'
import VueBraille from 'vue-braille'


Vue.use(VueBraille)
```


# Usage

Just add the this code:
```
<vue-braille>TEXT HERE</vue-braille>
```

with props:
```
<vue-braille design='style2' size='20' show-tip='true'>TEXT HERE</vue-braille>
```


# Props
```
design: the style of the braille code (any of the values: style1, style2, style3, style4)
size: unitless number to detrimine size
show-tip: Boolean value to show or hide tooltip
```

## :copyright: License
[MIT](http://opensource.org/licenses/MIT)
