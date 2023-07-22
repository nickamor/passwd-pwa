import htm from "htm";
import { createElement as h, render } from "preact";
import App from "./components/App.mjs";

const html = htm.bind(h);

export const renderApp = (target) => {
  render(html`<${App} />`, target);
};
