function View() {
  // populate the project name
  this.populateHeaderTitle = function(text) {
    var headerTitle = document.getElementsByClassName("header__project-name")[0];
    headerTitle.innerHTML = text;
  };

  // build tasks individually and append them to tasks container
  this.renderTasks = function (data, projectId) {
    var taskContainer =  document.getElementById("tasks");

    // loop over task array
    data.forEach(function(asanaTask){
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
  }

  // Check to see if individual element is in view
  function inView (el) {
    var containerPosition = document.getElementById("tasks").getBoundingClientRect();
    var getTaskPosition = el.getBoundingClientRect();
    return containerPosition.height > getTaskPosition.top;
  }

  // Add task--inview to tasks to make visible if in view (don't remove class to indicate it was previously viewed)
  function updateInView() {
    var tasks = document.querySelectorAll(".task")
    for (var i = 0; i < tasks.length; ++i) {
      if (inView(tasks[i])) {
        tasks[i].classList.add("task--inview");
      }
    }
  }

  this.bindTaskVisibility = function() {
    // fire initially to show tasks already in view
    updateInView();
    // create event listener for scrolling
    window.onscroll = updateInView;
  };

  this.bindCloseIcons = function () {
    var hide_icons = document.getElementsByClassName("task__hide");

    for (var i = 0; i < hide_icons.length; ++i) {
      hide_icons[i].onclick = function(){
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

export default View;