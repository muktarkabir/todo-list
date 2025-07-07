export class Task {
  constructor({ title, description, dueDate, priority, isDone = false,dateAdded }) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.isDone = isDone;
    if (dateAdded) this.dateAdded = dateAdded;
  }
  dateAdded;
  dateCompleted;

  toggleDone() {
    this.isDone = !this.isDone;
  }
  set dateAdded(date) {
    this.dateAdded = date;
  }
  set dateCompleted(date) {
    this.dateCompleted = date;
  }
}