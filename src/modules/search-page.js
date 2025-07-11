import { createElement } from "./utilities";

export const searchPage = () => {
  const container = createElement({ tagName: "div" });
  const text = createElement({ tagName: "h1" });
  text.textContent = "C O M I N G S O O N";
  container.append(text);
  container.setAttribute("style", "text-align: center;");
  return container;
};
