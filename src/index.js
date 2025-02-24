import "./styles.css";
import Project from "./project.js"

const addBtn = document.getElementById("add-btn");
const addMenu = document.getElementById("add-menu");
const addProjectBtn = document.getElementById("add-project-btn");
const addTaskBtn = document.getElementById("add-task-btn");
const formContainer = document.getElementById("form-container");
const projectsList = document.getElementById("projects");

function updateProjectsList(array) {
  for (let project of array) {
    const para = document.createElement("p");
    para.textContent = project.name;
    projectsList.appendChild(para);
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
        <button id="submit-btn" type="submit">
          Add Project
        </button>
      </div>

    </form>`;
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
        <button id="submit-btn" type="submit">
          Add Task
        </button>
      </div>

    </form>`;
});