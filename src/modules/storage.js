import { Project } from "../models/project.js";
import { Task } from "../models/task.js";

export const projects = [new Project("Personal")];
//Giving the project an index property
projects.at(-1).index = projects.length - 1;
let task = new Task({
  title: "Stuff",
  description: "Do a bunch of stuff",
  priority: "medium",
  dueDate: new Date("2025-07-10"),
});
task.dateAdded = new Date("2025-06-22");
let task2 = new Task({
  title: "Stuff",
  description: "Do a bunch of stuff",
  priority: "low",
  dueDate: new Date("2025-07-10"),
});
task2.dateAdded = new Date("2025-04-22");

let task3 = new Task({
  title: "Stuff",
  description: "Do a bunch of stuff",
  priority: "urgent",
  dueDate: new Date("2025-07-10"),
});
task3.dateAdded = new Date("2025-02-02");

let task4 = new Task({
  title: "Stuff",
  isDone: false,
  description: "Do a bunch of stuff",
  priority: "high",
  dueDate: new Date("2025-07-10"),
});
task4.dateAdded = new Date();
projects[0].addTask(task);
projects[0].addTask(task2);

projects[0].addTask(task3);

projects[0].addTask(task4);