export class Project {
  constructor(title) {
    this.title = title;
  }
  #tasks = [];
  #index;

  set index(value) {
    this.#index = value;
  }
  get index() {
    return this.#index;
  }

  get allTasks() {
    return this.#tasks;
  }

  get numberOfTasks() {
    return this.#tasks.filter((task) => !task.isDone).length;

  }
  get lowPriorityTasks() {
    return this.#tasks.filter((task,index) => task.priority == "low" && !task.isDone);
  }
  get mediumPriorityTasks() {
    return this.#tasks.filter((task,index) => task.priority == "medium" && !task.isDone);
  }
  get highPriorityTasks() {
    return this.#tasks.filter((task,index) => task.priority == "high" && !task.isDone);
  }
  get urgentPriorityTasks() {
    return this.#tasks.filter((task,index) => task.priority == "urgent" && !task.isDone);
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

  get completedTasks() {
    return this.#tasks.filter((task) => task.isDone);
  }

  get numberOfCompletedTasks() {
    return this.#tasks.filter((task) => task.isDone).length;
  }

  toString() {
    return `Project name:${this.title}, Tasks:[${this.#tasks}]`;
  }
}
