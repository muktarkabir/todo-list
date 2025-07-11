import { createElement } from "./utilities";

export const todayPage = () => {
  const container = createElement({ tagName: "div" });
  container.innerHTML = "Coming soon!";
  return container;
};
