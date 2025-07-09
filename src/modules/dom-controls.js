import { projects } from "./storage.js";
import { createAndApppendProject, addTask } from "./utilities.js";
import { Task } from "../models/task.js";
import { viewProject } from "./project-view.js";
import { addProjectDialog, addTaskDialog } from "./dialogs.js";
import { projectsPage } from "./projects-page.js";
import { completedTasksPage } from "./completed-tasks-page.js";

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
  const userName = sidebar.querySelector(".top h3");
  const featuresContainer = sidebar.querySelector("div.features");
  const projectsContainer = sidebar.querySelector(".projects");
  const main = document.querySelector("main");
  const mainContent = main.querySelector("#content");
  const projectsPageTile = document.querySelector(".heading");
  const addProjectOpenButton = document.querySelector(".heading p");
  const addProjectForm = addProjectDialog.querySelector("form");
  const newProjectName = addProjectDialog.querySelector("input");
  const addProjectCancelButton = addProjectDialog.querySelector(".cancel");
  const addProjectConfirmButton =
    addProjectDialog.querySelector(".add-project");

  const newTaskTitle = addTaskDialog.querySelector("input#title");
  const newTaskDescription = addTaskDialog.querySelector(
    "textarea#description"
  );
  const newTaskDuedate = addTaskDialog.querySelector("input#due-date");
  const newTaskPriority = addTaskDialog.querySelector("select#priority");
  const addTaskProjectDropdown = addTaskDialog.querySelector("select#project");
  const addTaskCancelButton = addTaskDialog.querySelector(".cancel");
  const addTaskConfirmButton = addTaskDialog.querySelector(".add-task");

  const addTaskButton = featuresContainer.querySelector(".add-task");
  const inboxCard = featuresContainer.querySelector(".inbox");
  const completedProjectsCard = featuresContainer.querySelector(".completed");
  
  inboxCard.addEventListener("click",()=> changeMainPageContent(viewProject(projects()[0])));
  projectsPageTile.addEventListener("click",()=>{
    mainContent.replaceChildren(projectsPage())
  })
  completedProjectsCard.addEventListener("click",()=> changeMainPageContent(completedTasksPage()))

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
    addProjectsToDropdown();
    addTaskDialog.showModal();
  });
  addTaskCancelButton.addEventListener("click", () => {
    addTaskDialog.close();
  });

  addTaskConfirmButton.addEventListener("click", (e) => {
    if (
      newTaskTitle.value &&
      newTaskDescription.value &&
      newTaskDuedate.value &&
      addTaskProjectDropdown.selectedIndex != -1
    ) {
      e.preventDefault();
      let selectedProject =
        addTaskProjectDropdown.options[addTaskProjectDropdown.selectedIndex]
          .value;
      let newTask = new Task({
        title: newTaskTitle.value.trim(),
        description: newTaskDescription.value.trim(),
        dueDate: new Date(newTaskDuedate.valueAsDate),
        priority: newTaskPriority.options[newTaskPriority.selectedIndex].value,
      });
      newTask.dateAdded = new Date();
      addTask({
        projectIndex: Number.parseInt(selectedProject),
        task: newTask,
      });
      changeMainPageContent(viewProject(projects()[Number.parseInt(selectedProject)]));
      addTaskDialog.close();
      addTaskDialog.querySelector("form").reset();
    }
  });
  projectsContainer.addEventListener("click", (e) => {
    if (e.target.matches("div.project")) {
      changeMainPageContent(viewProject(projects()[Number.parseInt(e.target.dataset.index)]));
  
    }
    if (e.target.matches("p") || e.target.matches("svg")) {
      changeMainPageContent(viewProject(
        projects()[Number.parseInt(e.target.parentElement.dataset.index)]
      ));
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

  const addProjectsToDropdown = () => {
    addTaskProjectDropdown.innerHTML = "";
    projects().forEach((project) => {
      addTaskProjectDropdown.add(new Option(project.title, project.index));
    });
  };
  const setUserName = ()=>{
  userName.textContent = `${localStorage.getItem("userName")}`;
  }
  const changeMainPageContent = (pageToView)=>{
    mainContent.replaceChildren(pageToView)
  }

  return {
    apppendProject,
    clearProjects,
    updateNumberOfProjects,
    addProjectsToDropdown,
    setUserName,
    changeMainPageContent
  };
})();
