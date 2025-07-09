import { createElement, createProjectCard,standoutColors } from "./utilities.js";
import { projects } from "./storage.js";
import "../styles/projects-page.css";

export const projectsPage = () => {
  const container = createElement({ tagName: "div", className: "project-div" });
  const heading = createElement({ tagName: "h1",className:"head" });
  const subheading = createElement({ tagName: "p",className:"sub" });
  const underLine = createElement({tagName:"hr"});
  heading.textContent = "My Projects";
  subheading.textContent = `${projects().length} projects`;
  container.append(heading,subheading,underLine);
  projects().forEach((project, index) => {
      const renderedProject = createProjectCard({titleText: project.title,color: index == 0 ? "black" : standoutColors[index],index: index});
      renderedProject.classList.add("project-tile");
      container.append(renderedProject);
    });
  return container;
};
