class Project {
  constructor(name) {
    this.name = name;
    this.tasks = [];
  }

  newTask(title, desc, dueDate, priority, complete) {
    this.tasks.push(new Task(title, desc, dueDate, priority, complete));
  }

  deleteTask(indexOfTask) {
    this.tasks.splice(indexOfTask, 1);
  }
}