import Task from "./modules/Task";
import getParameterByName from "./modules/query-param";

console.log(getParameterByName("project"));
// http://localhost:3000/?project=568228076648642

var projectNumber = getParameterByName("project");
if (projectNumber) {
  window.location = "https://app.asana.com/-/oauth_authorize?" +
                    "client_id=123&" +
                    "redirect_uri=https://myapp.com/oauth&" +
                    "response_type=token&" +
                    "state=projectNumber"
} else {
  // new model
  // new view
}






window.onload = function() {

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

  function inView (el) {
    var sb = section.getBoundingClientRect();
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

  document.onscroll = updateInView;

  updateInView();

}








var firstTask = new Task("Code a lot", 234189);
console.log(firstTask.task, firstTask.id);

// fetch('http://echo.jsontest.com/title/ipsum/content/blah')
//   .then(function(response) {
//     return response.json();
//   })
//   .then(function(myJson) {
//     console.log(myJson);
//   });
