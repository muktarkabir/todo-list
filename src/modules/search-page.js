import { createElement } from "./utilities";

export const searchPage = () => {
  const container = createElement({ tagName: "div" });
  container.innerHTML = "Coming soon!";
  return container;
};
