export class Task {
  constructor({ title, description, dueDate, priority, isDone = false, dateAdded, dateCompleted }) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.isDone = isDone;
    this.dateAdded = dateAdded;
  }

  toggleDone() {
    this.isDone = !this.isDone;
  }
}
