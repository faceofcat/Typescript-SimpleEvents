# Typescript-SimpleEvents

[![Build Status](https://travis-ci.org/faceofcat/Typescript-SimpleEvents.svg?branch=master)](https://travis-ci.org/faceofcat/Typescript-SimpleEvents)

Very very simple events system for type/java script.

Installation
------------

In order to install it you can run:

```sh
$ npm install -g typescript-simpleevents
```

or, to install it locally:
```sh
$ npm install -D typescript-simpleevents
```

Usage
------------

In javascript (node.js, not browser) you can:
```javascript
var ev = require("typescript-simpleevents");
var x = new ev.SimpleEvent();
x.on(function () { console.log('costel was here.'); });
x.trigger();
```

In typescript you can do either:
```typescript
import ev = require("typescript-simpleevents");

const x = new ev.SimpleEvent();
x.on(() => { console.log('costel was here.')});
x.trigger();
```
or
```typescript
import { SimpleEvent } from "typescript-simpleevents";

const x = new SimpleEvent();
x.on(() => { console.log('costel was here.')});
x.trigger();
```