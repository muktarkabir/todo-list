import { projects } from "../index.js";
import { Project } from "../models/project.js";
import { editTaskDialog } from "./dialogs.js";
import { domStuff } from "./dom-controls.js";

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

export const showEditTaskDialog = (project, taskIndex) => {
  let task = projects[project.index].allTasks[taskIndex];
  let title = task.title;
  let description = task.description;
  let dueDate = task.dueDate;
  let priority = task.priority;
  editTaskDialog.innerHTML = `<form action="#" method="dialog">
              <div>
                <h3>Edit task</h3>
                <hr />
                <label for="title">Title</label><br />
                <input
                  type="text"
                  name="task-name"
                  id="title"
                  required
                  maxlength="50"
                  value= '${title}'
                />
                <label for="description">Description</label><br />
                <textarea name="task-description"
                id="description"
                required rows="10" cols="30"
                maxlength="150">${description}</textarea>
                <label for="due-date">Date</label>
                <input type="date" name="due-date" id="due-date" value='${dueDate}' required/>
                <label for="priority">Priority</label>
                <select name="priority" id="priority">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
              </div>
              <div class="buttons">
                <button type="button" class="cancel">Cancel</button>
                <button type="submit" class="add-task">Save</button>
              </div>
            </form>`;

  editTaskDialog.querySelector("#priority").querySelectorAll("option").forEach((option)=>{
    if (option.value == priority){
      option.selected = true;
    }
  })          
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
export const priorities = {
  low: "#4caf50",
  medium: "#ffca28",
  high: "#ff5722",
  urgent: "#d32f2f",
};
