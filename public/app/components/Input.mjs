import htm from "htm";
import { createElement as h } from "preact";

const html = htm.bind(h);

const changeEvent = (event) => {
  if (event.target.type === "number") {
    return Number(event.target.value);
  }
  return event.target.value;
};

const InputLabel = ({ children, ...props }) => html`
  <div class="input-group-prepend">
    <label class="input-group-text" ...${props}>${children}</label>
  </div>
`;

const Input = ({ name, label, type, group = true, onChange, ...props }) => {
  const Field = () => html`<div class="input-group">
    ${label && html`<${InputLabel} for=${name}>${label}</Label>`}
    <input
      id=${name}
      type=${type}
      class="form-control"
      name=${name}
      onBlur=${(event) => onChange(changeEvent(event))}
      ...${props}
    />
  </div>`;

  return group
    ? html`<div class="form-group"><${Field} /></div>`
    : html`<${Field} />`;
};

export default Input;
