import { projects } from "../index.js";
import { Project } from "../models/project.js";
import { domStuff } from "./dom-controls.js";
import "../styles/task-tile.css";
import "../styles/main-content.css";

export function createProjectCard({ titleText, color, index }) {
  const card = createElement({ tagName: "div", className: "project" });
  card.dataset.index = index;
  const iconContainer = createElement({ tagName: "div" });

  const svgIcon = createHashSignSvg(color);
  const title = createElement({ tagName: "p" });
  title.textContent = titleText;
  iconContainer.append(svgIcon);
  card.append(svgIcon, title);

  return card;
}

export function createElement({ tagName, className }) {
  const element = document.createElement(tagName);
  if (className) element.classList.add(className);
  return element;
}

function createHashSignSvg(color) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  svg.setAttribute("viewBox", "0 0 448 512");
  svg.setAttribute("width", "20px");
  svg.setAttribute("height", "20px");
  svg.setAttribute("style", `fill: ${color};`);
  path.setAttribute(
    "d",
    "M181.3 32.4c17.4 2.9 29.2 19.4 26.3 36.8L197.8 128l95.1 0 11.5-69.3c2.9-17.4 19.4-29.2 36.8-26.3s29.2 19.4 26.3 36.8L357.8 128l58.2 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-68.9 0L325.8 320l58.2 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-68.9 0-11.5 69.3c-2.9 17.4-19.4 29.2-36.8 26.3s-29.2-19.4-26.3-36.8l9.8-58.7-95.1 0-11.5 69.3c-2.9 17.4-19.4 29.2-36.8 26.3s-29.2-19.4-26.3-36.8L90.2 384 32 384c-17.7 0-32-14.3-32-32s14.3-32 32-32l68.9 0 21.3-128L64 192c-17.7 0-32-14.3-32-32s14.3-32 32-32l68.9 0 11.5-69.3c2.9-17.4 19.4-29.2 36.8-26.3zM187.1 192L165.8 320l95.1 0 21.3-128-95.1 0z"
  );

  svg.append(path);
  return svg;
}

export const createAndApppendProject = (title) => {
  projects.push(new Project(title));
  projects.at(-1).index = projects.length - 1;
  renderProjects();
};
export const addTask = ({ projectIndex, task }) => {
  projects[projectIndex].addTask(task);
};

export const renderProjects = () => {
  domStuff.clearProjects();
  domStuff.updateNumberOfProjects(projects.length);
  projects.forEach((project, index) => {
    const renderedProject = createProjectCard({
      titleText: project.title,
      color: standoutColors[index],
      index: index,
    });
    domStuff.apppendProject(renderedProject);
  });
};

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
      filters.querySelectorAll("button").forEach((childNode) => {
        if (childNode.classList.contains("active-pill")) {
          renderTasks(childNode.classList[0]);
          filters.querySelector("button.all span").innerHTML = `${project.numberOfTasks}`;
          filters.querySelector("button.low span").innerHTML = `${project.lowPriorityTasks.length}`;
          filters.querySelector("button.medium span").innerHTML = `${project.mediumPriorityTasks.length}`;
          filters.querySelector("button.high span").innerHTML = `${project.highPriorityTasks.length}`;
          filters.querySelector("button.urgent span").innerHTML = `${project.urgentPriorityTasks.length}`;
        }
      });
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
  renderTasks("all");
  container.append(heading, filters, tasks, addTaskDiv);
  return container;
};


const standoutColors = [
  "#FF5733", // bright red-orange
  "#33C3FF", // vivid sky blue
  "#FFC300", // strong yellow
  "#DA33FF", // electric purple
  "#4CAF50", // bright green
  "#FF3B77", // hot pink
  "#00E676", // neon mint
  "#FF6F00", // deep orange
  "#2979FF", // strong blue
  "#D500F9", // neon magenta
];
const priorities = {
  low: "#4caf50",
  medium: "#ffca28",
  high: "#ff5722",
  urgent: "#d32f2f",
};
