import "./global-styles.css";
import "./styles/dialogs.css";
import "./styles/side-bar.css";
import "./styles/main-content.css";
import { Project } from "./models/project";
import { Task } from "./models/task.js";
import { renderProjects } from "./modules/utilities";
import { taskTile } from "./modules/utilities.js";
import { domStuff } from "./modules/dom-controls.js";

export const projects = [new Project("Personal")];

let task = new Task({
  title: "Test task",
  description: "This is a test to see if this stuff works",
  dueDate: new Date("2025-06-12"),
  isDone: true,
});

let tile = taskTile(task);

document.querySelector("#content").append(tile);


renderProjects();
