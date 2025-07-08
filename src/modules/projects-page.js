import { createElement } from "./utilities";

export const projectsPage = () => {
  const container = createElement({ tagName: "div", className: "project-div" });
  const heading = createElement({ tagName: "h1" });
  heading.textContent = "My Projects";
  container.append(heading);
  return container;
};
