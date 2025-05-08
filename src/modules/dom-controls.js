import { createProjectCard } from "./utilities";

export class DomManipulations {
  constructor() {
    this.document = document.body;
  }

  sidebar = document.querySelector("aside");
  featuresContainer = this.sidebar.querySelector("div.features");
  projectsContainer = this.sidebar.querySelector(".projects");
  mainContent = document.querySelector("main");
}

export const domStuff = (() => {
  const sidebar = document.querySelector("aside");
  const featuresContainer = sidebar.querySelector("div.features");
  const projectsContainer = sidebar.querySelector(".projects");
  const mainContent = document.querySelector("main");
  const addProjectButton = document.querySelector(".heading p");
  const addProjectDialog = document.querySelector("dialog.project");
  
projectsContainer.append(createProjectCard({titleText:"Personal",color:"pink"}));   


addProjectButton.addEventListener("click",()=>{
  addProjectDialog.showModal();
});
    
})();
