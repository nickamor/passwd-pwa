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
      class="w-full px-3 py-2 bg-surface border border-border border-t-0 rounded-b-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
      rows="2"
      value=${options.specialCharset}
      onBlur=${(event) =>
        onChange(changeEvent("specialCharset", event.target.value))}
    />`;

  const nLower =
    options.passwdLength - options.nUpper - options.nNumeric - options.nSpecial;

  return html`<div>
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
    <div class="mb-3">
      <${Field}
        name="nSpecial"
        label="Special"
        max=${limit(nLower + options.nSpecial)}
        group=${false}
        inputClass="rounded-br-none"
        labelClass="rounded-bl-none"
      />
      <${SpecialCharset} chars=${options.specialCharset} />
    </div>
  </div>`;
};

export default PasswordOptions;
