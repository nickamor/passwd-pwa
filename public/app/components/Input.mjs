import htm from "htm";
import { createElement as h } from "preact";

const html = htm.bind(h);

const changeEvent = (event) => {
  if (event.target.type === "number") {
    return Number(event.target.value);
  }
  return event.target.value;
};

const InputLabel = ({ children, class: className = "", ...props }) => html`
  <label
    class="flex items-center justify-center min-w-[8rem] px-3 py-2 bg-surface border border-border border-r-0 rounded-l-lg text-text-muted text-sm ${className}"
    ...${props}
  >
    ${children}
  </label>
`;

const Input = ({
  name,
  label,
  type,
  group = true,
  inputClass = "",
  labelClass = "",
  onChange,
  ...props
}) => {
  const baseInputClass = `flex-1 px-3 py-2 bg-surface border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${label ? "rounded-r-lg" : "rounded-lg"}`;

  const Field = () => html`<div class="flex">
    ${label &&
    html`<${InputLabel} for=${name} class=${labelClass}>${label}</InputLabel>`}
    <input
      id=${name}
      type=${type}
      class="${baseInputClass} ${inputClass}"
      name=${name}
      onBlur=${(event) => onChange(changeEvent(event))}
      ...${props}
    />
  </div>`;

  return group ? html`<div class="mb-3"><${Field} /></div>` : html`<${Field} />`;
};

export default Input;
