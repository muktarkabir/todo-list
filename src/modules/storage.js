import { Project } from "../models/project.js";
import { Task } from "../models/task.js";
import { domStuff } from "./dom-controls.js";

export const noUserName = () => !localStorage.getItem("userName");
domStuff.setUserName(localStorage.getItem("userName"));

if (!localStorage.getItem("projects")) localStorage.setItem("projects", JSON.stringify([]));



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
  static toggleDone(projectIndex,taskIndex){
    const projects = JSON.parse(localStorage.getItem("projects"));
    projects[projectIndex].tasks[taskIndex].isDone = !projects[projectIndex].tasks[taskIndex].isDone;
    projects[projectIndex].tasks[taskIndex].dateCompleted = new Date();
    localStorage.setItem("projects",JSON.stringify(projects));
  }
}
export const projects =()=> Storage.getSavedProjects();