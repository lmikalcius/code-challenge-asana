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

// Begin oauth implicit grant process if this is initial entry (initial entry will use project as a query param)
var projectId = (0, _queryParam2.default)("project");
if (projectId) {
  window.location = "https://app.asana.com/-/oauth_authorize?" + "client_id=579903436341269&" + "redirect_uri=http://localhost:3000/" + "&response_type=token&" + "state=568228076648642";
}

// Create var for access_token and grab project id again (stored in state query param from oauth) to pass to model
projectId = (0, _queryParam2.default)("state");
console.log(projectId);
var accessToken = (0, _queryParam2.default)("access_token");
console.log(accessToken);

// Begin process of creating model to retrieve project data if authorized
var myHeaders = new Headers();
myHeaders.append('Authorization', 'Bearer ' + accessToken);

function firstFetch() {
  return fetch('https://app.asana.com/api/1.0/projects/568228076648642', {
    method: 'GET',
    headers: myHeaders
  }).then(function (response) {
    return response.json();
  }).catch(function (error) {
    console.log(error);
  }).then(function (myJson) {
    var projectName = myJson.data.name;
    console.log(projectName);
    document.getElementsByClassName("header__project-name")[0].innerHTML = projectName.toString();
    return projectName;
  });
}

console.log(firstFetch().then(function (name) {
  console.log(name + " BOOOOM");
}));

fetch('https://app.asana.com/api/1.0/projects/568228076648642/tasks?limit=100', {
  method: 'GET',
  headers: myHeaders
}).then(function (response) {
  return response.json();
}).catch(function (error) {
  console.log(error);
}).then(function (myJson) {
  var aData = myJson.data;
  insert_divs(aData);
  doStuff();
  console.log(myJson);
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
var asanaData = {
  "data": [{
    "id": 568228076648643,
    "name": "[READ ME] Instructions on how to use this template"
  }, {
    "id": 568228076648664,
    "name": ""
  }, {
    "id": 568228076648665,
    "name": ""
  }, {
    "id": 568228076648644,
    "name": "The Basics:"
  }, {
    "id": 568228076648645,
    "name": "Learn how Asana is structured"
  }, {
    "id": 568228076648646,
    "name": "Create or join a project"
  }, {
    "id": 568228076648647,
    "name": "Create tasks"
  }, {
    "id": 568228076648648,
    "name": "Assign a task"
  }, {
    "id": 568228076648649,
    "name": "Add a follower to a task"
  }, {
    "id": 568228076648650,
    "name": "Comment on a task"
  }, {
    "id": 568228076648651,
    "name": "Review your My Tasks list"
  }, {
    "id": 568228076648668,
    "name": "stuff"
  }, {
    "id": 568228076648652,
    "name": "Check your Inbox"
  }, {
    "id": 568228076648653,
    "name": "Advanced Features (optional):"
  }, {
    "id": 568228076648678,
    "name": "this is how you add inside a section"
  }, {
    "id": 568228076648654,
    "name": "Type a colon at the end of this task to create a section:"
  }, {
    "id": 568228076648680,
    "name": "it's apparently in this section too"
  }, {
    "id": 568228076648673,
    "name": "To Be Done Now:"
  }, {
    "id": 568228076648674,
    "name": ""
  }, {
    "id": 568228076648672,
    "name": ""
  }, {
    "id": 568228076648671,
    "name": ""
  }, {
    "id": 568228076648655,
    "name": "Create a subtask"
  }, {
    "id": 568228076648658,
    "name": "@mention tasks, projects, conversations, or teammates"
  }, {
    "id": 568228076648659,
    "name": "Attach files to tasks"
  }, {
    "id": 568228076648660,
    "name": "Likes"
  }, {
    "id": 568228076648661,
    "name": "Watch a 2-minute overview video"
  }, {
    "id": 568228076648662,
    "name": "Get more help on the Asana Guide"
  }],
  "next_page": null
};

exports.default = asanaData.data;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
function getParameterByName(key) {
    var url = window.location.href;
    var match = url.match('[&#?]' + key + '=([^&]+)');
    return match ? match[1] : null;
}

exports.default = getParameterByName;

// query string: ?foo=lorem&bar=&baz
// var foo = getParameterByName('foo');
// returns "lorem"

/***/ })
/******/ ]);