import { createElement, createProjectCard,standoutColors } from "./utilities.js";
import { projects } from "./storage.js";
import "../styles/projects-page.css";
import { domStuff } from "./dom-controls.js";
import { viewProject } from "./project-view.js";

export const projectsPage = () => {
  const container = createElement({ tagName: "div", className: "project-div" });
  const heading = createElement({ tagName: "h1",className:"head" });
  const subheading = createElement({ tagName: "p",className:"sub" });
  const underLine = createElement({tagName:"hr"});
  heading.textContent = "My Projects";
  subheading.textContent = `${projects().length} projects`;
  container.append(heading,subheading,underLine);
  projects().forEach((project, index) => {
      const renderedProject = createProjectCard({titleText: project.title,color: index == 0 ? "black" : standoutColors[index],index: index,withDeleteButton: index == 0 ? false : true});
      renderedProject.classList.add("project-tile");
      container.append(renderedProject);
    });


  container.addEventListener("click",(e)=>{
    if (e.target.classList.contains("project-tile")){
      domStuff.changeMainPageContent(viewProject(projects()[e.target.dataset.index]));
      
    }
  })  
  return container;
};
