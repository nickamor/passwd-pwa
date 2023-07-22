import htm from "htm";
import { createElement as h } from "preact";

import Input from "./Input.mjs";

const html = htm.bind(h);

const validate = (value) => typeof value === "number";

const changeEvent = (name, value) => ({ name, value });

const limit = (max) => Math.max(0, max);

const PasswordOptions = ({ options, onChange }) => {
  const Field = ({ name, ...props }) => html`<${Input}
    type="number"
    min="0"
    name=${name}
    value=${options[name]}
    ...${props}
    onChange=${(value) =>
      validate(value) && onChange(changeEvent(name, Math.floor(value)))}
  />`;

  const SpecialCharset = () => html`<label class="sr-only" for="specialCharset">
      Special Characters
    </label>
    <textarea
      id="specialCharset"
      type="text"
      class="form-control"
      value=${options.specialCharset}
      onBlur=${(event) =>
        onChange(changeEvent("specialCharset", event.target.value))}
    />`;

  const nLower =
    options.passwdLength - options.nUpper - options.nNumeric - options.nSpecial;

  return html`<div class="col">
    <${Field} name="passwdLength" label="Length" max="256" />
    <${Field}
      name="nUpper"
      label="Uppercase"
      max=${limit(nLower + options.nUpper)}
    />
    <${Field}
      name="nNumeric"
      label="Numbers"
      max=${limit(nLower + options.nNumeric)}
    />
    <div class="form-group passwd-special-group">
      <${Field}
        name="nSpecial"
        label="Special"
        max=${limit(nLower + options.nSpecial)}
        group=${false}
      />
      <${SpecialCharset} chars=${options.specialCharset} />
    </div>
  </div>`;
};

export default PasswordOptions;
