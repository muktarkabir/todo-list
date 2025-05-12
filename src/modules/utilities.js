import { projects } from "../index.js";
import { Project } from "../models/project.js";
import {domStuff} from "./dom-controls.js";

export function createProjectCard({ titleText, color }) {
  const card = createElement({ tagName: "div", className: "project" });
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
  renderProjects();
  domStuff.updateNumberOfProjects(projects.length);
};

export const renderProjects = () => {
  domStuff.clearProjects();
  domStuff.updateNumberOfProjects(projects.length);
  projects.forEach((project, index) => {
    const renderedProject = createProjectCard({
      titleText: project.title,
      color: standoutColors[index],
    });
    domStuff.apppendProject(renderedProject);
  });
};

export const standoutColors = [
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
