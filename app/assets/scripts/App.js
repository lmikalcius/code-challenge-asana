import asanaData from "./modules/Model";
import getParameterByName from "./modules/query-param";

// Begin oauth implicit grant process if this is initial entry (initial entry will use project as a query param)
var projectId = getParameterByName("project");
if (projectId) {
  window.location = "https://app.asana.com/-/oauth_authorize?" +
                    "client_id=579903436341269&" +
                    "redirect_uri=http://localhost:3000/" +
                    "&response_type=token&" +
                    "state=568228076648642";
}

// Create var for access_token and grab project id again (stored in state query param from oauth) to pass to model
projectId = getParameterByName("state");
console.log(projectId);
var accessToken = getParameterByName("access_token");
console.log(accessToken);



// Begin process of creating model to retrieve project data if authorized
var myHeaders = new Headers();
myHeaders.append('Authorization', 'Bearer ' + accessToken);


function firstFetch() {
  return fetch('https://app.asana.com/api/1.0/projects/568228076648642', {
    method: 'GET',
    headers: myHeaders,
  })
  .then(function(response) {
    return response.json();
  })
  .catch(function (error) {
    console.log(error);
  })
  .then(function(myJson) {
    var projectName = myJson.data.name;
    console.log(projectName);
    document.getElementsByClassName("header__project-name")[0].innerHTML = projectName.toString();
    return projectName
  });
}

console.log(firstFetch().then(function(name) {
    console.log(name + " BOOOOM");
  }));

fetch('https://app.asana.com/api/1.0/projects/568228076648642/tasks?limit=100', {
  method: 'GET',
  headers: myHeaders,
})
.then(function(response) {
  return response.json();
})
.catch(function (error) {
  console.log(error);
})
.then(function(myJson) {
  var aData = myJson.data;
  insert_divs(aData);
  doStuff();
  console.log(myJson);
});





function doStuff () {



  var taskContainer = document.getElementById('tasks');

  function inView (el) {
    var sb = taskContainer.getBoundingClientRect();
    var eb = el.getBoundingClientRect();
    return eb.top < sb.height;
  }

  function updateInView() {
    var tasks = document.querySelectorAll('.task');

    for (var i = 0; i < tasks.length; ++i) {
      if (inView(tasks[i])) {
        tasks[i].classList.add('task--inview')
      };
    }
  }

  window.onscroll = updateInView;

  updateInView();



  var hide_icons = document.getElementsByClassName("task__hide");

  for (var i = 0; i < hide_icons.length; ++i) {
    hide_icons[i].onclick = function(){
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
  data.forEach(function(asanaTask){

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