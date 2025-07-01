import { createElement } from "./utilities";

export const addProjectDialog = createElement({
  tagName: "dialog",
  className: "project",
});
addProjectDialog.innerHTML = `<form action="#" method="dialog">
        <div>
          <h3>Add Project</h3>
          <hr />
          <label for="name">Name</label><br />
          <input
            type="text"
            name="project-name"
            id="name"
            required
            maxlength="14"
          />
        </div>
        <div class="buttons">
          <button type="button" class="cancel">Cancel</button>
          <button type="submit" class="add-project">Create</button>
        </div>
      </form>`;

export const addTaskDialog = createElement({
  tagName: "dialog",
  className: "task",
});
addTaskDialog.innerHTML = `<form action="#" method="dialog">
        <div>
          <h3>Add task</h3>
          <hr />
          <label for="title">Title</label><br />
          <input
            type="text"
            name="task-name"
            id="title"
            required
            maxlength="50"
          />
          <label for="description">Description</label><br />
          <textarea name="task-description"
          id="description"
          required rows="10" cols="30"
          maxlength="150"></textarea>
          <label for="due-date">Date</label>
          <input type="date" name="due-date" id="due-date" required/>
          <label for="priority">Priority</label>
          <select name="priority" id="priority">
          <option value="low" selected>Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="urgent">Urgent</option>
        </select>
        <label for="project">Project</label> 
        <select name="project" id="project" required></select>
        </div>
        <div class="buttons">
          <button type="button" class="cancel">Cancel</button>
          <button type="submit" class="add-task">Create</button>
        </div>
      </form>`;
      document.body.append(addProjectDialog,addTaskDialog);