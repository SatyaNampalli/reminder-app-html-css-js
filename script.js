let taskList = [];
let pendingList = [];
var title = "";
var date;
var time;

// Variables
var board = document.getElementById("board-123");
var icon = document.getElementById("sidebar-123");
var taskAdd = document.getElementById("task-123");
var overlay = document.getElementById("over-123");
var timeInput = document.querySelector('input[type="time"]');
var dateInput = document.querySelector('input[type="date"]');
var nameHolder = document.querySelector(".task-names");
var Today = document.getElementById("board-date");
var pending = document.getElementById("board-pending");

//General Code for Date
dateNew = new Date();
dateUtcF = dateNew.toLocaleDateString("en-US", {
  weekday: "long",
  year: "numeric",
  month: "short",
  day: "numeric",
});
Today.innerHTML = "<div class='board-one-date'>" + dateUtcF + "</div>";

// Event listener
icon.addEventListener("click", () => {
  if (board.className == "board-container") {
    board.className = "board-container1";
    icon.className = "sidebar-icon1";
    document.querySelector(".navbar-h-one").textContent = "";
  } else {
    board.className = "board-container";
    icon.className = "sidebar-icon";
    document.querySelector(".navbar-h-one").innerHTML = "<h1>Reminder</h1>";
  }
});

overlay.addEventListener("click", () => {
  taskAdd.style.display = "none";
  overlay.style.display = "none";
});

// Functions

const CheckedBox = () => {
  if (document.querySelector(".task-checkbox") != null) {
    if (document.querySelector(".task-checkbox").checked) {
      taskList.splice(document.querySelector(".task-checkbox").id, 1);
      console.log(taskList);
    }
  }
};

setInterval(() => {
  ManageTasks();
  showPendingTasks();
}, 400);

const checkDuplicate = (detail, list) => {
  for (var u = 0; u < list.length; ++u) {
    if (detail.title == list[u].title) {
      return false;
    }
  }
  return true;
};

const showPendingTasks = () => {
  if (taskList != null) {
    pendingList = [];
    for (let k = 0; k < taskList.length; ++k) {
      if (taskList[k].dueDate == dateUtcF) {
        if (document.getElementById("no-pending-123") != null) {
          document.getElementById("no-pending-123").remove();
        }
        let t = {
          title: taskList[k].title,
          time: taskList[k].time,
        };
        if (checkDuplicate(t, pendingList)) {
          pendingList.push(t);
        }
      }
    }
    pending.innerHTML = "";
    for (var u = 0; u < pendingList.length; ++u) {
      pending.innerHTML +=
        "<div class='pending-tasks'>" +
        pendingList[u].title +
        " is due by " +
        pendingList[u].time +
        " today" +
        "</div";
    }
  }
};

const openTask = () => {
  if (board.className != "board-container1") {
    taskAdd.style.display = "block";
    overlay.style.display = "block";
  } else {
    icon.click();
    taskAdd.style.display = "block";
    overlay.style.display = "block";
  }
};

const FormatDate = () => {
  dateFormatter = new Date(dateInput.value);
  dateFormatUtc = new Date(
    dateFormatter.getUTCFullYear(),
    dateFormatter.getUTCMonth(),
    dateFormatter.getUTCDate()
  );
  date = dateFormatUtc.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const FormatTime = () => {
  var [hr, min] = timeInput.value.split(":");
  var am = "AM";
  if (hr == 0) {
    hr = 12;
  }
  if (hr > 12) {
    am = "PM";
    hr -= 12;
  }
  time = hr + ":" + min + " " + am;
};

const setTask = () => {
  title = document.querySelector(".input-task").value;
};

const addTask = () => {
  taskAdd.style.display = "none";
  overlay.style.display = "none";
  FormatDate();
  FormatTime();
  let task = {
    title: title,
    id: 0,
    dueDate: date,
    time: time,
  };
  if (checkDuplicate(task, taskList)) {
    taskList.push(task);

    document.querySelector(".input-task").value = null;
    dateInput.value = null;
    timeInput.value = null;
    if (taskList.length != 0) {
      if (document.getElementById("no-task-123") != null)
        document.getElementById("no-task-123").remove();
    }
    console.log(taskList);
  } else {
    alert(
      "You already the task with the same name. Add a task with a new name!"
    );
  }
};

const ManageTasks = () => {
  nameHolder.innerHTML = "";
  for (var l = 0; l < taskList.length; ++l) {
    taskList[l].id = l;
    var divTask = document.createElement("div");
    divTask.className = "tasks";
    nameHolder.appendChild(divTask);
    var div1 = document.createElement("div");
    div1.className = "tasks-title";
    var checkboxInput = document.createElement("input");
    checkboxInput.setAttribute("type", "checkbox");
    checkboxInput.className = "task-checkbox";
    checkboxInput.id = `${l}`;
    checkboxInput.onchange = CheckedBox;
    divTask.appendChild(div1);
    div1.appendChild(checkboxInput);
    var div2 = document.createElement("div");
    div2.className = "tasks-title";
    divTask.appendChild(div2);
    div2.textContent = `${taskList[l].title}`;
    var div3 = document.createElement("div");
    div3.className = "tasks-title";
    divTask.appendChild(div3);
    div3.textContent = `${taskList[l].dueDate}`;
    var div4 = document.createElement("div");
    div4.className = "tasks-title";
    divTask.appendChild(div4);
    div4.textContent = `${taskList[l].time}`;
    var div5 = document.createElement("div");
    div5.className = "tasks-title";
    divTask.appendChild(div5);
    var edit = document.createElement("button");
    edit.className = "edit-button";
    edit.textContent = "Edit";
    edit.id = `${l}`;
    edit.onclick = () => {
      taskList.splice(edit.id, 1);
      openTask();
    };
    div5.appendChild(edit);
  }
};
