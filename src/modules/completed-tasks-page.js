import { createElement } from "./utilities.js";

export const completedTasksPage = () => {
  const container = createElement({ tagName: "div", className: "project-div" });
  const heading = createElement({ tagName: "h1", className: "head" });
  heading.textContent = "Completed tasks"
  container.append(heading);
  return container;
};
