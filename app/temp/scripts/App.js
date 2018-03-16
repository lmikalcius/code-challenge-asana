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


var _Model = __webpack_require__(1);

var _Model2 = _interopRequireDefault(_Model);

var _queryParam = __webpack_require__(2);

var _queryParam2 = _interopRequireDefault(_queryParam);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// If this is an initial entry (user enters URL with query param for the project ID) redirect to begin oauth implicit grant process
if ((0, _queryParam2.default)("project")) {
  window.location = "https://app.asana.com/-/oauth_authorize?" + "client_id=579903436341269&" + "redirect_uri=http://localhost:3000/" + "&response_type=token&" + "state=568228076648642";
}

// If this is after an oauth redirect, create variables for access_token and project id (stored in state query param from oauth redirect) to pass to the model
var projectId = (0, _queryParam2.default)("state");
var accessToken = (0, _queryParam2.default)("access_token");

// Instantiate model and view
var model = new _Model2.default(projectId, accessToken);

model.fetchTitle().then(function (projectName) {
  document.getElementsByClassName("header__project-name")[0].innerHTML = projectName;
  console.log(projectName + " BOOOOM");
});

model.fetchTasks().then(function (tasks) {
  insert_divs(tasks);
  doStuff();
  console.log(tasks.toString() + " BOOOOM");
});

function doStuff() {

  var taskContainer = document.getElementById('tasks');

  function inView(el) {
    var sb = taskContainer.getBoundingClientRect();
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

  for (var i = 0; i < hide_icons.length; ++i) {
    hide_icons[i].onclick = function () {
      this.parentNode.parentNode.removeChild(this.parentNode);
      updateInView();
      event.stopPropagation();
      return false;
    };
  }
}

// console.log(getParameterByName("project"));
// http://localhost:3000/?project=568228076648642


function insert_divs(data) {
  var parent = document.getElementById("tasks");
  data.forEach(function (asanaTask) {

    var task = document.createElement('div');
    task.className += "task";
    var url = "window.open('https://app.asana.com/0/568228076648642/" + asanaTask.id.toString() + "', '_blank')";
    task.setAttribute('onclick', url);

    var taskTitle = document.createElement('p');
    taskTitle.className += "task__title";
    taskTitle.innerHTML = asanaTask.name.toString();

    var closeIcon = document.createElement('div');
    closeIcon.className += "task__hide";

    task.appendChild(taskTitle);
    task.appendChild(closeIcon);

    parent.appendChild(task);
  });
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Model = function () {
  function Model(projectId, accessToken) {
    _classCallCheck(this, Model);

    this.apiRootUrl = 'https://app.asana.com/api/1.0/projects/' + projectId;
    this.createAuthHeader(accessToken);
  }

  // pass access_token from oauth as a header to the API


  _createClass(Model, [{
    key: 'createAuthHeader',
    value: function createAuthHeader(accessToken) {
      this.header = new Headers();
      this.header.append('Authorization', 'Bearer ' + accessToken);
      return false;
    }

    // fetch the project's name

  }, {
    key: 'fetchTitle',
    value: function fetchTitle() {
      return fetch(this.apiRootUrl, {
        method: 'GET',
        headers: this.header
      })
      // standard protocol of es6 fetch to convert response object
      .then(function (response) {
        return response.json();
      }).then(function (json) {
        var projectName = json.data.name;
        return projectName;
      });
    }

    // fetch the project's list of tasks that contain id's and titles for each task

  }, {
    key: 'fetchTasks',
    value: function fetchTasks() {
      return fetch(this.apiRootUrl + '/tasks?limit=100', {
        method: 'GET',
        headers: this.header
      }).then(function (response) {
        return response.json();
      }).then(function (json) {
        var tasks = json.data;
        return tasks;
      });
    }
  }]);

  return Model;
}();

exports.default = Model;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
function getParameterByName(key) {
    var url = window.location.href;
    // added '#' character for redirect url
    var match = url.match('[&#?]' + key + '=([^&]+)');
    return match ? match[1] : null;
}

exports.default = getParameterByName;

// query string: ?foo=lorem&bar=&baz
// var foo = getParameterByName('foo');
// returns "lorem"

/***/ })
/******/ ]);