import { projects } from "./storage.js";
import { createElement } from "./utilities.js";
import { Project } from "../models/project.js";
import { taskTile } from "./task-tile.js";

export const completedTasksPage = () => {
  const container = createElement({ tagName: "div", className: "project-div" });
  const heading = createElement({ tagName: "h1", className: "head" });
  heading.textContent = "Completed tasks";
  container.append(heading);

  const renderCompletedTasks = () => {
    projects().forEach((project, index) => {
      const projectFromJson = Project.fromJson(project);
      const title = createElement({ tagName: "h2" });
      title.textContent = projectFromJson.title;
      container.append(title);
      projectFromJson.tasks.forEach((task) => {
        if (task.isDone) {
          const renderedTask = taskTile(task, index);
          container.append(renderedTask);
        }
      });
    });
  };
  renderCompletedTasks();
  return container;
};
