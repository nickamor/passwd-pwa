import htm from "htm";
import { createElement as h } from "preact";
import { useEffect, useReducer, useRef } from "preact/hooks";
import { rootReducer } from "../reducer.mjs";
import { initialState } from "../store.mjs";
import PasswordControls from "./PasswordControls.mjs";
import PasswordInput from "./PasswordInput.mjs";
import PasswordOptions from "./PasswordOptions.mjs";
import { Collapse } from "./Collapse.mjs";

const html = htm.bind(h);

const changeOption = (value) => ({
  type: "changeOption",
  payload: { ...value },
});

const generate = () => ({ type: "generate" });

const toggleOptions = () => ({ type: "toggleOptions" });

const useSelectInputEffect = (args) => {
  const inputRef = useRef(null);
  useEffect(() => {
    if (
      !inputRef ||
      !inputRef.current ||
      typeof inputRef.current.select !== "function"
    ) {
      return;
    }
    inputRef.current.select();
  }, args);
  return inputRef;
};

const App = () => {
  const [state, dispatch] = useReducer(rootReducer, initialState);
  const inputRef = useSelectInputEffect([state.password]);

  return html`<main class="container">
    <${PasswordInput} passwdField=${state.password} inputRef=${inputRef} />
    <${PasswordControls}
      showOptions=${state.showOptions}
      onGenerate=${() => {
        dispatch(generate());
      }}
      onMoreOptions=${() => {
        dispatch(toggleOptions());
      }}
    />
    <${Collapse} className="passwd-options-container" open=${state.showOptions}>
      <${PasswordOptions}
        options=${state.options}
        onChange=${(payload) => {
          dispatch(changeOption(payload));
        }}
      />
    </Optional>
  </main>`;
};

export default App;
