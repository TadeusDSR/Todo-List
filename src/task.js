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