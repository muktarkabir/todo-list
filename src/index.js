import "./global-styles.css";
import { Project } from "./models/project";
import { Task } from "./models/task";
// import { DomManipulations } from "./modules/dom-controls";
import { domStuff } from "./modules/dom-controls";
import { updateDom, updateProjectsSection } from "./modules/utilities";

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

const homeProject = new Project("Home");
homeProject.addMultipleTasks([doThedishes, study]);

homeProject.allTasks[0].toggleDone();
const doneProjects = homeProject.completedTasks;
console.log(doneProjects);
console.log(homeProject.numberOfCompletedTasks);

// const domMagic = new DomManipulations();

export const projects = [new Project("Personal")];
console.log(projects[0]);

updateProjectsSection();

