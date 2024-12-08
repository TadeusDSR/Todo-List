import "./styles.css";

const addBtn = document.getElementById("add-btn");
const addMenu = document.getElementById("add-menu");
const addProjectBtn = document.getElementById("add-project-btn");
const addTaskBtn = document.getElementById("add-task-btn");

let isActive = 0;
addBtn.addEventListener("click", () => {
    if (isActive === 0) {
        addMenu.style.display = "flex";
        isActive = 1;
    } else {
        addMenu.style.display = "none";
        isActive = 0;
    }
});