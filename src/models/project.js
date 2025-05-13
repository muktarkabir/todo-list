export class Project {
  constructor(title) {
    this.title = title;
  }
  #tasks = [];

  get allTasks() {
    return this.#tasks;
  }

  get numberOfTasks() {
    return this.#tasks.length;
  }

  addTask(task) {
    this.#tasks.push(task);
  }

  addMultipleTasks(tasks) {
    tasks.forEach((task) => {
      this.#tasks.push(task);
    });
  }

  deleteTask(taskIndex) {
    this.#tasks.splice(taskIndex, 1);
  }

  get completedTasks(){
    return this.#tasks.filter((task)=> task.isDone);
  }

  get numberOfCompletedTasks(){
    return this.#tasks.filter((task)=> task.isDone).length;
  }

  toString(){
    return `Project name:${this.title}, Tasks:[${this.#tasks}]`
  }
}
