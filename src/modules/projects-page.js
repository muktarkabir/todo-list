import {
  createElement,
  createProjectCard,
  renderProjectsInSideBar,
  standoutColors,
} from "./utilities.js";
import { projects, Storage } from "./storage.js";
import "../styles/projects-page.css";
import { domStuff } from "./dom-controls.js";
import { viewProject } from "./project-view.js";

export const projectsPage = () => {
  const container = createElement({ tagName: "div", className: "project-div" });
  const heading = createElement({ tagName: "h1", className: "head" });
  const subheading = createElement({ tagName: "p", className: "sub" });
  const underLine = createElement({ tagName: "hr" });
  const projectsContainer = createElement({ tagName: "div" });
  heading.textContent = "My Projects";
  container.append(heading, subheading, underLine, projectsContainer);

  container.addEventListener("click", (e) => {
    if (e.target.classList.contains("project-tile")) {
      domStuff.changeMainPageContent(
        viewProject(projects()[e.target.dataset.index])
      );
    }
    if (e.target instanceof SVGElement) {
      Storage.deleteProject(e.target.dataset.index);
      renderProjectList();
      renderProjectsInSideBar();
      setNumberOfProjects();
    }
  });

  const renderProjectList = () => {
    projectsContainer.innerHTML = "";
    projects().forEach((project, index) => {
      const renderedProject = createProjectCard({
        titleText: project.title,
        color: index == 0 ? "black" : standoutColors[index],
        index: index,
        withDeleteButton: index == 0 ? false : true,
      });
      renderedProject.classList.add("project-tile");
      projectsContainer.append(renderedProject);
    });
  };
  const setNumberOfProjects=() => {
    subheading.innerHTML = `${projects().length} project`;
  if (projects().length > 1) subheading.innerHTML += 's';
  } 
  setNumberOfProjects();
  renderProjectList();
  return container;
};
