import Task from "./modules/Task";
import asanaData from "./modules/Model";
import getParameterByName from "./modules/query-param";

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


var projectNumber = getParameterByName("project");
if (projectNumber) {
  window.location = "https://app.asana.com/-/oauth_authorize?" +
                    "client_id=579903436341269&" +
                    "redirect_uri=http://localhost:3000/" +
                    "&response_type=token&" +
                    "state=568228076648642";
} else {
  const myHeaders = new Headers();
  myHeaders.append('Authorization', 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdXRob3JpemF0aW9uIjo1Nzk5MDM1NzUzOTIzMDksInNjb3BlIjoiZGVmYXVsdCBpZGVudGl0eSIsImlhdCI6MTUyMTE1OTczNCwiZXhwIjoxNTIxMTYzMzM0fQ.uj_jABUlGI1PxZPLC9GUwnbZHQ0hCSVSZts30-rsDxQ');

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
    console.log(myJson);
  });
}

window.onload = function() {


  insert_divs(asanaData);

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








var firstTask = new Task("Code a lot", 234189);
console.log(firstTask.task, firstTask.id);






console.log(getParameterByName("project"));
// http://localhost:3000/?project=568228076648642


