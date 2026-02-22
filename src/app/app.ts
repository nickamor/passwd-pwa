import htm from "htm";
import { createElement as h, render } from "preact";
import App from "./components/App";
import { registerServiceWorker } from "./service";
import { store } from "./store";

const html = htm.bind(h);

export const renderApp = (target) => {
  render(html`<${App} />`, target);
  store.dispatch({ type: "init" });
};

renderApp(document.body);
registerServiceWorker();

export { registerServiceWorker };
