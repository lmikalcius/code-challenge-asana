!function(n){var a={};function r(e){if(a[e])return a[e].exports;var t=a[e]={i:e,l:!1,exports:{}};return n[e].call(t.exports,t,t.exports,r),t.l=!0,t.exports}r.m=n,r.c=a,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:n})},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t,n){"use strict";var a=i(n(1)),r=i(n(2)),o=i(n(3));function i(e){return e&&e.__esModule?e:{default:e}}var u=(0,a.default)("project");u&&(window.location="https://app.asana.com/-/oauth_authorize?client_id=579903436341269&redirect_uri=http://localhost:3000/&response_type=token&state="+u);var c=(0,a.default)("state"),s=(0,a.default)("access_token"),l=new r.default(c,s),d=new o.default;l.fetchProjectName().then(function(e){d.populateHeaderTitle(e)}),l.fetchTasks().then(function(e){d.renderTasks(e,c),d.bindTaskVisibility(),d.bindCloseIcons()})},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t=window.location.href.match("[&#?]"+e+"=([^&]+)");return t?t[1]:null}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function a(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(e,t,n){return t&&a(e.prototype,t),n&&a(e,n),e}}();var r=function(){function n(e,t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,n),this.apiRootUrl="https://app.asana.com/api/1.0/projects/"+e,this.createAuthHeader(t)}return a(n,[{key:"createAuthHeader",value:function(e){return this.header=new Headers,this.header.append("Authorization","Bearer "+e),!1}},{key:"fetchProjectName",value:function(){return fetch(this.apiRootUrl,{method:"GET",headers:this.header}).then(function(e){return e.json()}).then(function(e){return e.data.name})}},{key:"fetchTasks",value:function(){return fetch(this.apiRootUrl+"/tasks?limit=100",{method:"GET",headers:this.header}).then(function(e){return e.json()}).then(function(e){return e.data})}}]),n}();t.default=r},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){function n(){for(var e,t,n,a=document.querySelectorAll(".task"),r=0;r<a.length;++r)e=a[r],t=document.getElementById("tasks").getBoundingClientRect(),n=e.getBoundingClientRect(),console.log(n.top,t.height),t.height>n.top&&a[r].classList.add("task--inview")}this.populateHeaderTitle=function(e){document.getElementsByClassName("header__project-name")[0].innerHTML=e},this.renderTasks=function(e,o){var i=document.getElementById("tasks");e.forEach(function(e){var t=document.createElement("div");t.className+="task";var n="window.open('https://app.asana.com/0/"+o+"/"+e.id+"', '_blank')";t.setAttribute("onclick",n);var a=document.createElement("p");a.className+="task__title",a.innerHTML=e.name;var r=document.createElement("div");r.className+="task__hide",t.appendChild(a),t.appendChild(r),i.appendChild(t)})},this.bindTaskVisibility=function(){n(),window.onscroll=n},this.bindCloseIcons=function(){for(var e=document.getElementsByClassName("task__hide"),t=0;t<e.length;++t)console.log("STUFF"),e[t].onclick=function(){return this.parentNode.parentNode.removeChild(this.parentNode),n(),event.stopPropagation(),!1}}}}]);