import "./global-styles.css";
import { Project } from "./models/project";

import { renderProjects } from "./modules/utilities";

export const projects = [new Project("Personal")];

renderProjects();
