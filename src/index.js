import "./global-styles.css";
import { Project } from "./models/project";
import { Task } from "./models/task";

import { renderProjects } from "./modules/utilities";

export const projects = [new Project("Personal")];

console.log(projects[0].title);
projects[0].addMultipleTasks([
  new Task({
    title: "Do the dishes",
    description: "Thoroughly wash and dry the plates.",
    dueDate: new Date("06-06-2025"),
  }),
]);

renderProjects();
