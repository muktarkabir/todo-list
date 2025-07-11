import "./global-styles.css";
import "./styles/dialogs.css";
import "./styles/side-bar.css";
import "./styles/main-content.css";
import { renderProjectsInSideBar } from "./modules/utilities.js";
import { addUserName } from "./modules/utilities.js";
import { noUserName } from "./modules/storage.js";
import { domStuff } from "./modules/dom-controls.js";


if (noUserName()) addUserName();
renderProjectsInSideBar();
domStuff.setUpInitialPage();
