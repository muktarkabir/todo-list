import { Task } from "./task.js";

export class Project {
  constructor(title) {
    this.title = title;
  }
  tasks = [];
  index;

  set index(value) {
    this.index = value;
  }
  get index() {
    return this.index;
  }

  get allTasks() {
    return this.tasks;
  }

  get numberOfTasks() {
    return this.tasks.filter((task) => !task.isDone).length;
  }
  get lowPriorityTasks() {
    return this.tasks.filter(
      (task, index) => task.priority == "low" && !task.isDone
    );
  }
  get mediumPriorityTasks() {
    return this.tasks.filter(
      (task, index) => task.priority == "medium" && !task.isDone
    );
  }
  get highPriorityTasks() {
    return this.tasks.filter(
      (task, index) => task.priority == "high" && !task.isDone
    );
  }
  get urgentPriorityTasks() {
    return this.tasks.filter(
      (task, index) => task.priority == "urgent" && !task.isDone
    );
  }

  addTask(task) {
    this.tasks.push(task);
  }

  addMultipleTasks([...tasks]) {
    tasks.forEach((task) => this.addTask(task));
  }

  deleteTask(taskIndex) {
    this.tasks.splice(taskIndex, 1);
  }

  editTask({ taskIndex, newTitle, newDescription, newDueDate, newPriority }) {
    if (newTitle) this.tasks[taskIndex].title = newTitle;
    if (newDescription) this.tasks[taskIndex].description = newDescription;
    if (newDueDate) this.tasks[taskIndex].dueDate = newDueDate;
    if (newPriority) this.tasks[taskIndex].priority = newPriority;
  }

  get completedTasks() {
    return this.tasks.filter((task) => task.isDone);
  }

  get numberOfCompletedTasks() {
    return this.tasks.filter((task) => task.isDone).length;
  }

  toString() {
    return `Project name:${this.title}, Tasks:[${this.tasks}]`;
  }

  static fromJson(projectFromJson) {
   const {title,index,tasks} = projectFromJson;
    const project = new Project(title);
    project.index = index;
    const convertedTasks = [];
    tasks.forEach((task) => {
      convertedTasks.push(
        new Task({
          title: task.title,
          description: task.description,
          dueDate: new Date(task.dueDate),
          priority: task.priority,
          isDone: task.isDone,
          dateAdded: new Date(task.dateAdded),
          dateCompleted: new Date(task.dateCompleted)
        })
      );
    });
    project.addMultipleTasks(convertedTasks);
    return project;
  }
}
