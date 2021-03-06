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


var _queryParam = __webpack_require__(1);

var _queryParam2 = _interopRequireDefault(_queryParam);

var _Model = __webpack_require__(2);

var _Model2 = _interopRequireDefault(_Model);

var _View = __webpack_require__(3);

var _View2 = _interopRequireDefault(_View);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// If this is an initial entry (user enters URL with query param for the project ID) redirect to begin oauth implicit grant process
// This is the project ID number entered into the URL by the user
var projectParam = (0, _queryParam2.default)("project");
if (projectParam) {
  window.location = "https://app.asana.com/-/oauth_authorize?" + "client_id=579903436341269&" + "redirect_uri=https://lmikalcius.github.io/code-challenge-asana/" + "&response_type=token&" + "state=" + projectParam;
}

// If this is after an oauth redirect, create variables for access_token and project id (stored in state query param from oauth redirect) to pass to the model
var projectId = (0, _queryParam2.default)("state");
var accessToken = (0, _queryParam2.default)("access_token");

// Instantiate model and view
var model = new _Model2.default(projectId, accessToken);
var view = new _View2.default();

// Perform get requests for project name and paint it
model.fetchProjectName().then(function (projectName) {
  view.populateHeaderTitle(projectName);
});

// Perform get requests for tasks data and paint those along with adding event listeners
model.fetchTasks().then(function (tasks) {
  view.renderTasks(tasks, projectId);
  view.bindTaskVisibility();
  view.bindCloseIcons();
});

/***/ }),
/* 1 */
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

// USAGE: query string on URL: ?foo=lorem&bar=&baz
// var foo = getParameterByName('foo');
// foo holds the value "lorem"

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function Model(projectId, accessToken) {
  // common root URL for getting project info from the API
  this.apiRootUrl = 'https://app.asana.com/api/1.0/projects/' + projectId;

  // create standard authorization header for requests to API
  // pass access_token from successful oauth redirect param into header
  function createAuthHeader(accessToken) {
    var header = new Headers();
    header.append('Authorization', 'Bearer ' + accessToken);
    return header;
  }
  this.header = createAuthHeader(accessToken);

  // fetch the project's name from API
  this.fetchProjectName = function () {
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
  };

  // fetch the project's list of tasks from API
  this.fetchTasks = function () {
    return fetch(this.apiRootUrl + '/tasks?limit=100', {
      method: 'GET',
      headers: this.header
    }).then(function (response) {
      return response.json();
    }).then(function (json) {
      var tasks = json.data;
      return tasks;
    });
  };
}

exports.default = Model;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function View() {
  // populate the project name
  this.populateHeaderTitle = function (text) {
    var headerTitle = document.getElementsByClassName("header__project-name")[0];
    headerTitle.innerHTML = text;
  };

  // build tasks individually and append them to tasks container
  this.renderTasks = function (data, projectId) {
    var taskContainer = document.getElementById("tasks");

    // loop over task array
    data.forEach(function (asanaTask) {
      // building individual task container
      var task = document.createElement("div");
      task.className += "task";
      // set behavior for clicking on individual task, _blank indicates new window
      var url = "window.open('https://app.asana.com/0/" + projectId + "/" + asanaTask.id + "', '_blank')";
      task.setAttribute('onclick', url);

      var taskTitle = document.createElement("p");
      taskTitle.className += "task__title";
      taskTitle.innerHTML = asanaTask.name;

      var closeIcon = document.createElement("div");
      closeIcon.className += "task__hide";

      task.appendChild(taskTitle);
      task.appendChild(closeIcon);
      taskContainer.appendChild(task);
    });
  };

  // Check to see if individual element is in view
  function inView(el) {
    var containerPosition = document.getElementById("tasks").getBoundingClientRect();
    var getTaskPosition = el.getBoundingClientRect();
    return containerPosition.height > getTaskPosition.top;
  }

  // Add task--inview to tasks to make visible if in view (don't remove class to indicate it was previously viewed)
  function updateInView() {
    var tasks = document.querySelectorAll(".task");
    for (var i = 0; i < tasks.length; ++i) {
      if (inView(tasks[i])) {
        tasks[i].classList.add("task--inview");
      }
    }
  }

  this.bindTaskVisibility = function () {
    // fire initially to show tasks already in view
    updateInView();
    // create event listener for scrolling
    window.onscroll = updateInView;
  };

  this.bindCloseIcons = function () {
    var hide_icons = document.getElementsByClassName("task__hide");

    for (var i = 0; i < hide_icons.length; ++i) {
      hide_icons[i].onclick = function () {
        this.parentNode.parentNode.removeChild(this.parentNode);
        // fire to repaint since elements have changed position
        updateInView();
        // prevent other click events (like opening a new window)
        event.stopPropagation();
        return false;
      };
    }
  };
}

exports.default = View;

/***/ })
/******/ ]);