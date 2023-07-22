import htm from "htm";
import { createElement as h } from "preact";

const html = htm.bind(h);

const PasswordInput = ({ passwdField, inputRef }) => html`<div class="row">
  <div class="col">
    <div class="form-group">
      <label class="sr-only" for="passwdField">Password</label>
      <input
        id="passwdField"
        class="form-control form-control-lg form-passwd"
        type="text"
        name="passwdField"
        value="${passwdField}"
        placeholder="Password"
        aria-label="Password"
        ref=${inputRef}
      />
    </div>
  </div>
</div>`;

export default PasswordInput;
