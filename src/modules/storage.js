import { Project } from "../models/project.js";
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
    projects[projectIndex].tasks.push(task);
    localStorage.setItem("projects",JSON.stringify(projects));
  }
  static toggleDone(projectIndex,taskIndex){
    const projects = JSON.parse(localStorage.getItem("projects"));
    projects[projectIndex].tasks[taskIndex].isDone = !projects[projectIndex].tasks[taskIndex].isDone;
    projects[projectIndex].tasks[taskIndex].dateCompleted = new Date();
    localStorage.setItem("projects",JSON.stringify(projects));
  }
  static editTask({projectIndex,taskIndex,newTitle,newDueDate,newDescription,newPriority}){
    const projects = JSON.parse(localStorage.getItem("projects"));
    projects[projectIndex].tasks[taskIndex].title = newTitle.trim();
    projects[projectIndex].tasks[taskIndex].dueDate = new Date(newDueDate);
    projects[projectIndex].tasks[taskIndex].description = newDescription;
    projects[projectIndex].tasks[taskIndex].priority = newPriority;
    localStorage.setItem("projects",JSON.stringify(projects));
  }
  static deleteTask(projectIndex,taskIndex){
    const projects = JSON.parse(localStorage.getItem("projects"));
    projects[projectIndex].tasks.splice(taskIndex,1);
    localStorage.setItem("projects",JSON.stringify(projects));
  }
}
export const projects =()=> Storage.getSavedProjects();