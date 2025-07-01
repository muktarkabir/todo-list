export class Task {
  constructor({ title, description, dueDate, priority, isDone = false }) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.isDone = isDone;
  }
  dateAdded;
  dateCompleted;

  toggleDone() {
    this.isDone = !this.isDone;
  }
  set dateAdded(date) {
    this.dateAdded = new Date(date);
  }
  set dateCompleted(date) {
    this.dateCompleted = new Date(date);
  }
}
