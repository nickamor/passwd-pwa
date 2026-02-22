import htm from "htm";
import { createElement as h } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";

import * as optionsActions from "../features/options/optionsSlice";
import { generatePassword } from "../features/password/passwordSlice";
import { store } from "../store";
import Collapse from "./Collapse";
import PasswordControls from "./PasswordControls";
import PasswordInput from "./PasswordInput";
import PasswordOptions from "./PasswordOptions";

const html = htm.bind(h);

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
  // const [state, dispatch] = useReducer(rootReducer, initialState);
  const [state, setState] = useState(store.getState());
  const inputRef = useSelectInputEffect([state.password]);
  useEffect(() => {
    const f = store.subscribe(() => {
      setState(store.getState());
    });
    return f;
  }, [store]);

  return html`<main class="px-4">
    <${PasswordInput} passwdField=${state.password.value} inputRef=${inputRef} />
    <${PasswordControls}
      showOptions=${state.options.showOptions}
      onGenerate=${() => {
        store.dispatch(generatePassword());
      }}
      onMoreOptions=${() => {
        store.dispatch(optionsActions.toggleOptions());
      }}
    />
    <${Collapse} open=${state.options.showOptions}>
      <${PasswordOptions}
        options=${state.options.options}
        onChange=${(payload) => {
          store.dispatch(optionsActions.changeOption(payload));
        }}
      />
    </Collapse>
  </main>`;
};

export default App;
