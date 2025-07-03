import { createElement, priorities } from "./utilities.js";
import { format, formatDistanceToNow } from "date-fns";
import "../styles/task-tile.css";

export const taskTile = (task, index) => {
  const { title, description, dueDate, priority, dateAdded } = task;
  const container = createElement({ tagName: "div", className: "task-tile" });
  container.dataset.index = index;
  container.style.border = `1px solid ${priorities[priority]}`;
  container.style.borderLeft = `10px solid ${priorities[priority]}`;
  container.style.borderRadius = "8px";

  container.innerHTML = `<div class="the-input"><input type ="checkbox"/></div><div><h4>${title}</h4>
                           <p>${description}</p>
                           <p class="due">due ${formatDistanceToNow(dueDate, {
                             addSuffix: true,
                           })} • ${format(dueDate, "MM/dd")} </p>
                           </div>
                            <p class="time">Added ${formatDistanceToNow(
                              dateAdded,
                              { includeSeconds: true, addSuffix: true }
                            )}</p>
                           <div class="buttons">
                           <button title="edit task" class="edit"><svg width="24" height="24" class="edit"><g fill="none" fill-rule="evenodd"><path fill="currentColor" d="M9.5 19h10a.5.5 0 1 1 0 1h-10a.5.5 0 1 1 0-1"></path><path stroke="currentColor" d="M4.42 16.03a1.5 1.5 0 0 0-.43.9l-.22 2.02a.5.5 0 0 0 .55.55l2.02-.21a1.5 1.5 0 0 0 .9-.44L18.7 7.4a1.5 1.5 0 0 0 0-2.12l-.7-.7a1.5 1.5 0 0 0-2.13 0L4.42 16.02z"></path></g></svg></button>
                           <button title="delete task"><svg width="22px" height="22px" class="delete" viewBox="0 0 1024 1024" fill="red" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M32 241.6c-11.2 0-20-8.8-20-20s8.8-20 20-20l940 1.6c11.2 0 20 8.8 20 20s-8.8 20-20 20L32 241.6zM186.4 282.4c0-11.2 8.8-20 20-20s20 8.8 20 20v688.8l585.6-6.4V289.6c0-11.2 8.8-20 20-20s20 8.8 20 20v716.8l-666.4 7.2V282.4z" fill=""></path><path d="M682.4 867.2c-11.2 0-20-8.8-20-20V372c0-11.2 8.8-20 20-20s20 8.8 20 20v475.2c0.8 11.2-8.8 20-20 20zM367.2 867.2c-11.2 0-20-8.8-20-20V372c0-11.2 8.8-20 20-20s20 8.8 20 20v475.2c0.8 11.2-8.8 20-20 20zM524.8 867.2c-11.2 0-20-8.8-20-20V372c0-11.2 8.8-20 20-20s20 8.8 20 20v475.2c0.8 11.2-8.8 20-20 20zM655.2 213.6v-48.8c0-17.6-14.4-32-32-32H418.4c-18.4 0-32 14.4-32 32.8V208h-40v-42.4c0-40 32.8-72.8 72.8-72.8H624c40 0 72.8 32.8 72.8 72.8v48.8h-41.6z" fill=""></path></g></svg></button>
                           </div>
                          `;
  return container;
};
