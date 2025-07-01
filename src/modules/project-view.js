import { taskTile } from "./task-tile";
import { createElement } from "./utilities";
import "../styles/main-content.css";

export const viewProject = (project) => {
  const container = createElement({ tagName: "div", className: "project-div" });
  const addTaskDiv = createElement({
    tagName: "div",
    className: "add-task-div",
  });
  addTaskDiv.innerHTML = "<button>Add Task</button>";
  const heading = createElement({ tagName: "h1" });
  const filters = createElement({ tagName: "div", className: "filters" });
  filters.innerHTML = `<button class="all">All <span>${project.numberOfTasks}</span></button><button class="low">Low <span>${project.lowPriorityTasks.length}</span></button><button class="medium">Medium <span>${project.mediumPriorityTasks.length}</span></button><button class="high">High <span>${project.highPriorityTasks.length}</span></button><button class="urgent">Urgent <span>${project.urgentPriorityTasks.length}</span></button>`;
  const tasks = createElement({ tagName: "div" });
  heading.textContent = project.title;
  filters.querySelector("button.all").classList.add("active-pill");
  addTaskDiv.querySelector("button").addEventListener("click", () => {
    document.querySelector(
      "dialog.task select#project"
    ).innerHTML = `<option value=${project.index}>${project.title}</option>`;
    document.querySelector("dialog.task").showModal();
  });
  filters.addEventListener("click", (e) => {
    if (e.target.classList.contains("all")) {
      renderTasks("all");
      showActiveTab("all");
    } else if (e.target.classList.contains("low")) {
      renderTasks("low");
      showActiveTab("low");
    } else if (e.target.classList.contains("medium")) {
      renderTasks("medium");
      showActiveTab("medium");
    } else if (e.target.classList.contains("high")) {
      renderTasks("high");
      showActiveTab("high");
    } else if (e.target.classList.contains("urgent")) {
      renderTasks("urgent");
      showActiveTab("urgent");
    }
  });

  tasks.addEventListener("click", (e) => {
    if (e.target instanceof HTMLInputElement) {
      let taskIndex = e.target.parentElement.parentElement.dataset.index;
      project.allTasks[taskIndex].toggleDone();
      updateVisuals();
    } else if (e.target instanceof SVGElement) {
      let taskIndex =
        e.target.parentElement.parentElement.parentElement.dataset.index;
      if (e.target.classList.contains("delete")) {
        project.deleteTask(taskIndex);
        updateVisuals();
      }
    }
  });

  const renderTasks = (priority) => {
    tasks.innerHTML = "";
    if (priority == "all") {
      project.allTasks.forEach((task, index) => {
        if (!task.isDone) {
          const renderedTask = taskTile(task, index);
          tasks.append(renderedTask);
        }
      });
    } else {
      project.allTasks.forEach((task, index) => {
        if (task.priority == priority && !task.isDone) {
          const renderedTask = taskTile(task, index);
          tasks.append(renderedTask);
        }
      });
    }
  };
  const showActiveTab = (activeTab) => {
    filters.childNodes.forEach((node) => {
      if (!node.classList.contains(activeTab)) {
        node.classList.remove("active-pill");
      }
    });
    filters.querySelector(`button.${activeTab}`).classList.add("active-pill");
  };

  const updateVisuals = () => {
    filters.querySelectorAll("button").forEach((childNode) => {
      if (childNode.classList.contains("active-pill")) {
        renderTasks(childNode.classList[0]);
        filters.querySelector(
          "button.all span"
        ).innerHTML = `${project.numberOfTasks}`;
        filters.querySelector(
          "button.low span"
        ).innerHTML = `${project.lowPriorityTasks.length}`;
        filters.querySelector(
          "button.medium span"
        ).innerHTML = `${project.mediumPriorityTasks.length}`;
        filters.querySelector(
          "button.high span"
        ).innerHTML = `${project.highPriorityTasks.length}`;
        filters.querySelector(
          "button.urgent span"
        ).innerHTML = `${project.urgentPriorityTasks.length}`;
      }
    });
  };
  renderTasks("all");
  container.append(heading, filters, tasks, addTaskDiv);
  return container;
};
