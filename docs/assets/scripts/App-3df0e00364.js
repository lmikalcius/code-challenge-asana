!function(n){var a={};function o(e){if(a[e])return a[e].exports;var t=a[e]={i:e,l:!1,exports:{}};return n[e].call(t.exports,t,t.exports,o),t.l=!0,t.exports}o.m=n,o.c=a,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:n})},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=0)}([function(e,t,n){"use strict";var a=i(n(1)),s=i(n(2)),o=i(n(3));function i(e){return e&&e.__esModule?e:{default:e}}window.onload=function(){var e,i;e=s.default,i=document.getElementById("tasks"),e.forEach(function(e){var t=document.createElement("div");t.className+="task";var n="window.open('https://app.asana.com/0/568228076648642/"+e.id.toString()+"', '_blank')";t.setAttribute("onclick",n);var a=document.createElement("p");a.className+="task__title",console.log(e),a.innerHTML=e.name.toString();var o=document.createElement("div");o.className+="task__hide",t.appendChild(a),t.appendChild(o),i.appendChild(t)});var o=document.getElementById("tasks");function t(){for(var e,t,n=document.querySelectorAll(".task"),a=0;a<n.length;++a)e=n[a],void 0,t=o.getBoundingClientRect(),e.getBoundingClientRect().top<t.height&&n[a].classList.add("task--inview")}(window.onscroll=t)();var n=document.getElementsByClassName("task__hide");console.log(n[0]);for(var a=0;a<n.length;++a)n[a].onclick=function(){return this.parentNode.parentNode.removeChild(this.parentNode),t(),event.stopPropagation(),!1}};var r=new a.default("Code a lot",234189);console.log(r.task,r.id),console.log((0,o.default)("project")),(0,o.default)("project")&&(window.location="https://app.asana.com/-/oauth_authorize?client_id=123&redirect_uri=https://myapp.com/oauth&response_type=token&state=projectNumber")},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.task=t,this.id=n}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=[{id:568228076648643,name:"[READ ME] Instructions on how to use this template"},{id:568228076648664,name:""},{id:568228076648665,name:""},{id:568228076648644,name:"The Basics:"},{id:568228076648645,name:"Learn how Asana is structured"},{id:568228076648646,name:"Create or join a project"},{id:568228076648647,name:"Create tasks"},{id:568228076648648,name:"Assign a task"},{id:568228076648649,name:"Add a follower to a task"},{id:568228076648650,name:"Comment on a task"},{id:568228076648651,name:"Review your My Tasks list"},{id:568228076648668,name:"stuff"},{id:568228076648652,name:"Check your Inbox"},{id:568228076648653,name:"Advanced Features (optional):"},{id:568228076648678,name:"this is how you add inside a section"},{id:568228076648654,name:"Type a colon at the end of this task to create a section:"},{id:568228076648680,name:"it's apparently in this section too"},{id:568228076648673,name:"To Be Done Now:"},{id:568228076648674,name:""},{id:568228076648672,name:""},{id:568228076648671,name:""},{id:568228076648655,name:"Create a subtask"},{id:568228076648658,name:"@mention tasks, projects, conversations, or teammates"},{id:568228076648659,name:"Attach files to tasks"},{id:568228076648660,name:"Likes"},{id:568228076648661,name:"Watch a 2-minute overview video"},{id:568228076648662,name:"Get more help on the Asana Guide"}]},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t=window.location.href.match("[?&]"+e+"=([^&]+)");return t?t[1]:null}}]);