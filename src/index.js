import "./global-styles.css";
import "./styles/dialogs.css";
import "./styles/side-bar.css";
import "./styles/main-content.css";
import { Project } from "./models/project";
import { Task } from "./models/task.js";
import { createAndApppendProject, renderProjects } from "./modules/utilities";
import { taskTile } from "./modules/utilities.js";
import { domStuff } from "./modules/dom-controls.js";

export const projects = [new Project("Personal")];
//Giving the project an index property
projects.at(-1).index = projects.length - 1;


let task = new Task({title:"Stuff",description:"Do a bunch of stuff",priority:"medium",dueDate: new Date('2025-07-10')});
let task2 = new Task({title:"Stuff",description:"Do a bunch of stuff",priority:"low",dueDate: new Date('2025-07-10')});
let task3 = new Task({title:"Stuff",description:"Do a bunch of stuff",priority:"urgent",dueDate: new Date('2025-07-10')});
let task4 = new Task({title:"Stuff",description:"Do a bunch of stuff",priority:"high",dueDate: new Date('2025-07-10')});




renderProjects();
projects[0].addTask(task);
projects[0].addTask(task);
projects[0].addTask(task);
projects[0].addTask(task);
projects[0].addTask(task);
projects[0].addTask(task);
projects[0].addTask(task2);
projects[0].addTask(task2);
projects[0].addTask(task2);
projects[0].addTask(task3);
projects[0].addTask(task3);
projects[0].addTask(task3);
projects[0].addTask(task4);
projects[0].addTask(task4);
projects[0].addTask(task4);
projects[0].addTask(task4);
