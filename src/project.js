export default class Project {
  constructor(name) {
    this.name = name;
    this.tasks = [];
  }

  newTask(title, desc, dueDate, priority, complete) {
    this.tasks.push(new Task(title, desc, dueDate, priority, complete));
  }

  removeTask(indexOfTask) {
    this.tasks.splice(indexOfTask, 1);
  }
}

class Task {
  constructor(title, desc, dueDate, priority, complete) {
    this.title = title;
    this.desc = desc;
    this.dueDate = dueDate;
    this.priority = priority;
    this.complete = complete;
  }

  setTitle(value) {
    this.title = value;
  }

  setDesc(value) {
    this.desc = value;
  }

  setDueDate(value) {
    this.dueDate = value;
  }

  setPriority(value) {
    this.priority = value;
  }

  setComplete(value) {
    this.complete = value;
  }
}