import { projects } from "../index.js";
import { createAndApppendProject, viewProject } from "./utilities";

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
  const main = document.querySelector("main");
  const mainContent = main.querySelector("#content");
  const addProjectOpenButton = document.querySelector(".heading p");
  const addProjectDialog = document.querySelector("dialog.project");
  const addProjectForm = addProjectDialog.querySelector("form");
  const newProjectName = addProjectDialog.querySelector("input");
  const addProjectCancelButton = addProjectDialog.querySelector(".cancel");
  const addProjectConfirmButton =
    addProjectDialog.querySelector(".add-project");

  const addTaskDialog = document.querySelector("dialog.task");
  const newTaskTitle = addTaskDialog.querySelector("input#title");
  const newTaskDescription = addTaskDialog.querySelector("input#description");
  const addTaskCancelButton = addTaskDialog.querySelector(".cancel");
  const addTaskConfirmButton = addTaskDialog.querySelector(".add-task");

  const addTaskButton = featuresContainer.querySelector(".add-task");

  addProjectOpenButton.addEventListener("click", () => {
    addProjectDialog.showModal();
  });
  addProjectCancelButton.addEventListener("click", () => {
    addProjectDialog.close();
    addProjectForm.reset();
  });

  addProjectConfirmButton.addEventListener("click", (e) => {
    if (newProjectName.value) {
      e.preventDefault();
      createAndApppendProject(newProjectName.value.trim());
      addProjectDialog.close();
      addProjectForm.reset();
    }
  });

  addTaskButton.addEventListener("click", () => {
    addTaskDialog.showModal();
  });

  projectsContainer.addEventListener("click", (e) => {
    if (e.target.matches("div.project")) {
      console.log(e.target);
      mainContent.replaceChildren(
        viewProject(projects[Number.parseInt(e.target.dataset.index)])
      );
    }
    if (e.target.matches("p") || e.target.matches("svg")) {
      console.log(e.target.parentElement);
      mainContent.replaceChildren(
        viewProject(
          projects[Number.parseInt(e.target.parentElement.dataset.index)]
        )
      );
    }
  });

  const apppendProject = (projectCard) => {
    projectsContainer.append(projectCard);
  };

  const clearProjects = () => {
    projectsContainer.innerHTML = "";
  };

  const updateNumberOfProjects = (newNumber) => {
    document.querySelector(
      ".heading span"
    ).textContent = `used: ${newNumber}/10`;
  };

  const addTask = (projectIndex,task)=> {
    projects[projectIndex].addTask(task);
  }

  return { apppendProject, clearProjects, updateNumberOfProjects };
})();
