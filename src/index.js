import "./styles.css";
import Project from "./project.js"

const addBtn = document.getElementById("add-btn");
const addMenu = document.getElementById("add-menu");
const addProjectBtn = document.getElementById("add-project-btn");
const addTaskBtn = document.getElementById("add-task-btn");
const formContainer = document.getElementById("form-container");
const projectsList = document.getElementById("projects");
const tasksList = document.getElementById("tasks");

let projects = [];

function updateProjectsList(array) {
  projectsList.innerHTML = ``;
  for (let i = 0; i < array.length; i++) {
    const h3 = document.createElement("h3");
    h3.textContent = array[i].name;
    projectsList.appendChild(h3);
    h3.addEventListener("click", () => {
      updateTaskList(projects, i);
    });
  }
}

function updateTaskList(array, projectIndex) {
  tasksList.innerHTML = ``;
  for (let task of array[projectIndex].tasks) {
    const taskContainer = document.createElement("div");
    const div = document.createElement("div");
    const completeCheck = document.createElement("input");
    const titlePara = document.createElement("p");

    completeCheck.setAttribute("type", "checkbox");

    titlePara.textContent = `${task.title}`;
    titlePara.setAttribute("class", "desc-visible-0");

    div.appendChild(completeCheck);
    div.appendChild(titlePara);

    taskContainer.innerHTML = `<p class="task-date"> due ${task.dueDate} </p>`;
    taskContainer.appendChild(div);
    
    taskContainer.addEventListener("click", () => {
      if (titlePara.getAttribute("class") === "desc-visible-0") {
        titlePara.setAttribute("class", "desc-visible-1");

        taskContainer.innerHTML = `<p class="task-date"> due ${task.dueDate} </p>`;
        div.innerHTML = ``;
        div.append(completeCheck);
        div.appendChild(titlePara);
        taskContainer.append(div);
        taskContainer.innerHTML += `<p class="task-date"> ${task.desc} </p>`;
      } else {
        titlePara.setAttribute("class", "desc-visible-0");

        taskContainer.innerHTML = `<p class="task-date"> due ${task.dueDate} </p>`;
        div.innerHTML = ``;
        div.append(completeCheck);
        div.appendChild(titlePara);
        taskContainer.append(div);
      }
    });

    completeCheck.addEventListener("click", () => {
      task.setComplete(completeCheck.checked);
    });

    tasksList.appendChild(taskContainer);
  }
}

let isActive = 0;

addBtn.addEventListener("click", () => {
  if (isActive == 0) {
    addMenu.style.display = "flex";
    isActive = 1;
  } else {
    addMenu.style.display = "none";
    isActive = 0;
  }
});

addProjectBtn.addEventListener("click", () => {
  formContainer.style.display = "flex";
  formContainer.innerHTML = 
  `<form>

    <div>
      <label for="title">Name of Project</label>
      <input type="text" name="title" id="title">
    </div>

    <div>
      <button id="submit-btn" type="button">
        Add Project
      </button>
    </div>

  </form>`;

  const submitBtn = document.getElementById("submit-btn");
  const title = document.getElementById("title");
  
  submitBtn.addEventListener("click", () => {
    if (title.value) {
      projects.push(new Project(title.value));
      updateProjectsList(projects);
      formContainer.style.display = "none";
      formContainer.innerHTML = ``;
    }
  });
});

addTaskBtn.addEventListener("click", () => {
  formContainer.style.display = "flex";
  formContainer.innerHTML = 
  `<form>

    <div>
      <label for="title">Name of Task</label>
      <input type="text" name="title" id="title">
    </div>
    <div>
      <label for="desc">Description</label>
      <input type="text" name="desc" id="desc">
    </div>
    <div>
      <div>
        <label for="due-date">Due Date</label>
        <input type="date" name="due-date" id="due-date">
      </div>
      <div>
        <label for="priority">Priority</label>
        <select name="priority" id="priority">
          <option value="high">high</option>
          <option value="normal">normal</option>
          <option value="low">low</option>
        </select>
      </div>
    </div>
    <div>
      <label for="project-name">Add to which project</label>
        <select name="project-name" id="project-name">
        </select>
    </div>

    <div>
      <button id="submit-btn" type="button">
        Add Task
      </button>
    </div>

  </form>`;

  const submitBtn = document.getElementById("submit-btn");
  const title = document.getElementById("title");
  const desc = document.getElementById("desc");
  const dueDate = document.getElementById("due-date");
  const priority = document.getElementById("priority");
  const projectName = document.getElementById("project-name");

  for (let project of projects) {
    projectName.innerHTML += `<option value="${project}">${project.name}</option>`;
  }

  submitBtn.addEventListener("click", () => {
    if (title.value && desc.value && dueDate.value && priority.value) {
      projects[projectName.options.selectedIndex].newTask(title.value, desc.value, dueDate.value, priority.value);
      updateTaskList(projects, projectName.options.selectedIndex);
      formContainer.style.display = "none";
      formContainer.innerHTML = ``;
    }
  });
});