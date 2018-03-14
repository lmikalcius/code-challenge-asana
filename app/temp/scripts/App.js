/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Task = __webpack_require__(1);

var _Task2 = _interopRequireDefault(_Task);

var _queryParam = __webpack_require__(2);

var _queryParam2 = _interopRequireDefault(_queryParam);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log((0, _queryParam2.default)("project"));
// http://localhost:3000/?project=568228076648642

var projectNumber = (0, _queryParam2.default)("project");
if (projectNumber) {
  window.location = "https://app.asana.com/-/oauth_authorize?" + "client_id=123&" + "redirect_uri=https://myapp.com/oauth&" + "response_type=token&" + "state=projectNumber";
} else {
  // new model
  // new view
}

window.onload = function () {

  var section = document.getElementsByClassName('tasks')[0];
  // console.log(section);
  // console.log(document.body);
  // document.body.appendChild(section);
  // for (let x = 1; x <= 55; x ++) {
  //   let d = document.createElement('div');
  //   d.innerText = `Hello there div line ${x} of 55`;
  //   if (x > 3 && x < 25) { d.className += " ptask"; }
  //   d.className += " task";
  //   section.appendChild(d);
  // }

  function inView(el) {
    var sb = section.getBoundingClientRect();
    var eb = el.getBoundingClientRect();
    return eb.top < sb.height;
  }

  function updateInView() {
    var tasks = document.querySelectorAll('.task');

    for (var i = 0; i < tasks.length; ++i) {
      if (inView(tasks[i])) {
        tasks[i].classList.add('task--inview');
      };
    }
  }

  window.onscroll = updateInView;

  updateInView();

  var hide_icons = document.getElementsByClassName("task__hide");
  console.log(hide_icons[0]);

  for (var i = 0; i < hide_icons.length; ++i) {
    hide_icons[i].onclick = function () {
      this.parentNode.parentNode.removeChild(this.parentNode);
      console.log(updateInView);
      updateInView();
      return false;
    };
  }

  // document.getElementsByClassName("task__hide")[0].onclick = function(){
  //   console.log("SUUUP");
  //   this.parentNode.parentNode.removeChild(this.parentNode);
  //   console.log(updateInView);
  //   updateInView();
  //   return false;
  // };

  // var classname = document.getElementsByClassName("classname");

  // var myFunction = function() {
  //     var attribute = this.getAttribute("data-myattribute");
  //     alert(attribute);
  // };

  // for (var i = 0; i < classname.length; i++) {
  //     classname[i].addEventListener('click', myFunction, false);
  // }
};

var firstTask = new _Task2.default("Code a lot", 234189);
console.log(firstTask.task, firstTask.id);

// fetch('http://echo.jsontest.com/title/ipsum/content/blah')
//   .then(function(response) {
//     return response.json();
//   })
//   .then(function(myJson) {
//     console.log(myJson);
//   });

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Task = function Task(task, id) {
  _classCallCheck(this, Task);

  this.task = task;
  this.id = id;
};

exports.default = Task;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
function getParameterByName(key) {
    var url = window.location.href;
    var match = url.match('[?&]' + key + '=([^&]+)');
    return match ? match[1] : null;
}

exports.default = getParameterByName;

// query string: ?foo=lorem&bar=&baz
// var foo = getParameterByName('foo');
// returns "lorem"

/***/ })
/******/ ]);