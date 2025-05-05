import "./global-styles.css";

class Task {
  constructor({ title, description, dueDate, priority, isDone = false }) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.isDone = isDone;
  }

  toggleDone() {
    this.isDone = !this.isDone;
  }
}

const doThedishes = new Task({
  title: "Do dishes",
  description: "Wash all the plates and spoons",
  dueDate: new Date("2026-08-30"),
  priority: "high",
});

const study = new Task({
  title: "Do NOT do dishes",
  description: "WasReaddddd spoons",
  dueDate: new Date("2026-08-30"),
  priority: "high",
});

console.log(doThedishes);

class Project {
  constructor(title) {
    this.title = title;
  }
  #tasks = [];

  get allTasks() {
    return [...this.#tasks];
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
}

const homeProject = new Project("Home");
homeProject.addMultipleTasks([doThedishes, study]);

const doneProjects = homeProject.allTasks.filter((val, index) => {
  return val.isDone;
});
console.log(doneProjects);
