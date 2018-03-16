import Model from "./modules/Model";
import getParameterByName from "./modules/query-param";

// If this is an initial entry (user enters URL with query param for the project ID) redirect to begin oauth implicit grant process
if (getParameterByName("project")) {
  window.location = "https://app.asana.com/-/oauth_authorize?" +
                    "client_id=579903436341269&" +
                    "redirect_uri=http://localhost:3000/" +
                    "&response_type=token&" +
                    "state=568228076648642";
}

// If this is after an oauth redirect, create variables for access_token and project id (stored in state query param from oauth redirect) to pass to the model
var projectId = getParameterByName("state");
var accessToken = getParameterByName("access_token");

// Instantiate model and view
var model = new Model(projectId, accessToken);

model.fetchTitle().then(function(projectName) {
  document.getElementsByClassName("header__project-name")[0].innerHTML = projectName;
  console.log(projectName + " BOOOOM");
});

model.fetchTasks().then(function(tasks) {
  insert_divs(tasks);
  doStuff();
  console.log(tasks.toString() + " BOOOOM");
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