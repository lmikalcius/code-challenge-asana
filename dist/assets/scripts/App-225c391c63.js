!function(n){var o={};function r(t){if(o[t])return o[t].exports;var e=o[t]={i:t,l:!1,exports:{}};return n[t].call(e.exports,e,e.exports,r),e.l=!0,e.exports}r.m=n,r.c=o,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:n})},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=0)}([function(t,e,n){"use strict";var o,r=n(1);var u=new((o=r)&&o.__esModule?o:{default:o}).default("Code a lot",234189);console.log(u.task,u.id),fetch("http://echo.jsontest.com/title/ipsum/content/blah").then(function(t){return t.json()}).then(function(t){console.log(t)})},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.default=function t(e,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.task=e,this.id=n}}]);