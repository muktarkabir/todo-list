import { projects, Storage } from "./storage.js";
import {
  createElement,
  createProjectCard,
  standoutColors,
} from "./utilities.js";
import { Project } from "../models/project.js";
import { taskTile } from "./task-tile.js";

export const completedTasksPage = () => {
  const container = createElement({ tagName: "div", className: "project-div" });
  const heading = createElement({ tagName: "h1", className: "head" });
  const projectsContainer = createElement({ tagName: "div" });
  heading.textContent = "Completed tasks";
  container.append(heading, projectsContainer);

  const renderCompletedTasks = () => {
    projectsContainer.innerHTML = "";
    projects().forEach((project, index) => {
      const projectFromJson = Project.fromJson(project);
      const title = createProjectCard({
        titleText: project.title,
        color: index == 0 ? "black" : standoutColors[index],
        index: index,
      });
      title.classList.add("completed-tile");
      projectsContainer.append(title);
      projectFromJson.tasks.forEach((task, index) => {
        if (task.isDone) {
          const renderedTask = taskTile(task, index);
          projectsContainer.append(renderedTask);
          renderedTask.addEventListener("click", (e) => {
            if (e.target instanceof SVGElement) {
              let taskIndex = e.target.parentElement.dataset.index;
              Storage.deleteTask(title.dataset.index, taskIndex);
              renderCompletedTasks();
            }
          });
        }
      });
    });
  };
  renderCompletedTasks();
  return container;
};
