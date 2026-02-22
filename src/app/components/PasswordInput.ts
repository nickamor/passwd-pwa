import htm from "htm";
import { createElement as h } from "preact";

const html = htm.bind(h);

const PasswordInput = ({ passwdField, inputRef }) => html`<div class="mb-4">
  <label class="sr-only" for="passwdField">Password</label>
  <input
    id="passwdField"
    class="w-full px-4 py-3 text-lg font-mono bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
    type="text"
    name="passwdField"
    value="${passwdField}"
    placeholder="Password"
    aria-label="Password"
    ref=${inputRef}
  />
</div>`;

export default PasswordInput;
