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
let currentProject = 0;

if (JSON.parse(localStorage.getItem("projects"))) {
  JSON.parse(localStorage.getItem("projects")).forEach(pElement => {
    let project = new Project(pElement.name);
    pElement.tasks.forEach(tElement => {
      project.createTask(tElement.title, tElement.desc, tElement.dueDate, tElement.priority, tElement.complete);
    });
    projects.push(project);
  });

  updateProjectsList(projects);
}

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
  currentProject = projectIndex;
  tasksList.innerHTML = ``;
  let i = 0
  for (let task of array[projectIndex].tasks) {
    const taskContainer = document.createElement("div");
    const div = document.createElement("div");
    const completeCheck = document.createElement("input");
    const titlePara = document.createElement("p");
    const editTask = document.createElement("div");

    completeCheck.setAttribute("type", "checkbox");

    titlePara.textContent = `${task.title}`;
    titlePara.setAttribute("class", `desc-visible-0 task-priority-${task.priority}`);

    editTask.innerHTML = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:20px"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M21.1213 2.70705C19.9497 1.53548 18.0503 1.53547 16.8787 2.70705L15.1989 4.38685L7.29289 12.2928C7.16473 12.421 7.07382 12.5816 7.02986 12.7574L6.02986 16.7574C5.94466 17.0982 6.04451 17.4587 6.29289 17.707C6.54127 17.9554 6.90176 18.0553 7.24254 17.9701L11.2425 16.9701C11.4184 16.9261 11.5789 16.8352 11.7071 16.707L19.5556 8.85857L21.2929 7.12126C22.4645 5.94969 22.4645 4.05019 21.2929 2.87862L21.1213 2.70705ZM18.2929 4.12126C18.6834 3.73074 19.3166 3.73074 19.7071 4.12126L19.8787 4.29283C20.2692 4.68336 20.2692 5.31653 19.8787 5.70705L18.8622 6.72357L17.3068 5.10738L18.2929 4.12126ZM15.8923 6.52185L17.4477 8.13804L10.4888 15.097L8.37437 15.6256L8.90296 13.5112L15.8923 6.52185ZM4 7.99994C4 7.44766 4.44772 6.99994 5 6.99994H10C10.5523 6.99994 11 6.55223 11 5.99994C11 5.44766 10.5523 4.99994 10 4.99994H5C3.34315 4.99994 2 6.34309 2 7.99994V18.9999C2 20.6568 3.34315 21.9999 5 21.9999H16C17.6569 21.9999 19 20.6568 19 18.9999V13.9999C19 13.4477 18.5523 12.9999 18 12.9999C17.4477 12.9999 17 13.4477 17 13.9999V18.9999C17 19.5522 16.5523 19.9999 16 19.9999H5C4.44772 19.9999 4 19.5522 4 18.9999V7.99994Z" fill="#000000"></path> </g></svg>`;

    div.appendChild(completeCheck);
    div.appendChild(titlePara);
    div.appendChild(editTask);

    taskContainer.innerHTML = `<p class="task-date"> due ${task.dueDate} </p>`;
    taskContainer.appendChild(div);
    taskContainer.setAttribute("id", `task-id-${i}`);
    
    taskContainer.addEventListener("click", () => {
      if (titlePara.getAttribute("class") === "desc-visible-0") {
        titlePara.setAttribute("class", "desc-visible-1");

        taskContainer.innerHTML = `<p class="task-date"> due ${task.dueDate} </p>`;
        div.innerHTML = ``;
        div.append(completeCheck);
        div.appendChild(titlePara);
        div.appendChild(editTask);
        taskContainer.append(div);
        taskContainer.innerHTML += `<p class="task-date"> ${task.desc} </p>`;
      } else {
        titlePara.setAttribute("class", "desc-visible-0");

        taskContainer.innerHTML = `<p class="task-date"> due ${task.dueDate} </p>`;
        div.innerHTML = ``;
        div.append(completeCheck);
        div.appendChild(titlePara);
        div.appendChild(editTask);
        taskContainer.append(div);
      }
    });

    editTask.addEventListener("click", () => {
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
          <button id="edit-btn" type="button">
            Edit Task
          </button>
          <button id="remove-btn" type="button">
            Remove Task
          </button>
        </div>

      </form>`;

      const editBtn = document.getElementById("edit-btn");
      const removeBtn = document.getElementById("remove-btn");
      const title = document.getElementById("title");
      const desc = document.getElementById("desc");
      const dueDate = document.getElementById("due-date");
      const priority = document.getElementById("priority");
      const projectName = document.getElementById("project-name");

      for (let project of projects) {
        projectName.innerHTML += `<option value="${project}">${project.name}</option>`;
      }

      editBtn.addEventListener("click", () => {
        if (title.value && desc.value && dueDate.value && priority.value) {
          projects[projectName.options.selectedIndex].removeTask(taskContainer.getAttribute("id").split("-")[2]);
          projects[projectName.options.selectedIndex].createTask(title.value, desc.value, dueDate.value, priority.value);
          updateTaskList(projects, projectName.options.selectedIndex);
          formContainer.style.display = "none";
          formContainer.innerHTML = ``;

          localStorage.setItem("projects", JSON.stringify(projects));
        }
      });

      removeBtn.addEventListener("click", () => {
        projects[currentProject].removeTask(taskContainer.getAttribute("id").split("-")[2]);
        updateTaskList(projects, projectName.options.selectedIndex);
        formContainer.style.display = "none";
        formContainer.innerHTML = ``;

        localStorage.setItem("projects", JSON.stringify(projects));
      });
    });

    completeCheck.addEventListener("click", () => {
      task.setComplete(completeCheck.checked);

      localStorage.setItem("projects", JSON.stringify(projects));
    });

    tasksList.appendChild(taskContainer);
    i++;
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

      localStorage.setItem("projects", JSON.stringify(projects));
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
      projects[projectName.options.selectedIndex].createTask(title.value, desc.value, dueDate.value, priority.value);
      updateTaskList(projects, projectName.options.selectedIndex);
      formContainer.style.display = "none";
      formContainer.innerHTML = ``;

      localStorage.setItem("projects", JSON.stringify(projects));
    }
  });
});