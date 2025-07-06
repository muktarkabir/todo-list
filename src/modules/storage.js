import { Project } from "../models/project.js";
import { Task } from "../models/task.js";
import { domStuff } from "./dom-controls.js";

export const noUserName = () => !localStorage.getItem("userName");
domStuff.setUserName(localStorage.getItem("userName"));

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

if (!localStorage.getItem("projects"))
  localStorage.setItem("projects", JSON.stringify([]));



export class Storage {
  static saveNewProject(title){
    const projects = JSON.parse(localStorage.getItem("projects"));
    projects.push(new Project(title));
    projects.at(-1).index = projects.length - 1;
    localStorage.setItem("projects",JSON.stringify(projects));
  }
  static getSavedProjects(){
    return JSON.parse(localStorage.getItem("projects"));
  }

  static addNewTask(projectIndex,task){
    const projects = JSON.parse(localStorage.getItem("projects"));
    const project = new Project(projects[projectIndex].title);
    project.index = projectIndex;
    project.addTask(task);
    projects[projectIndex] = project;
    localStorage.setItem("projects",JSON.stringify(projects));

  }
}
export const projects =()=> Storage.getSavedProjects();