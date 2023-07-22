import htm from "htm";
import { createElement as h } from "preact";

const html = htm.bind(h);

const nbsp = "\xA0";

const PasswordControls = ({
  showOptions,
  onGenerate,
  onMoreOptions,
}) => html` <div class="row">
  <div class="col">
    <div class="form-group">
      <button
        class="btn btn-default btn-outline-primary btn-lg"
        type="button"
        name="passwdButton"
        onClick=${() => onGenerate()}
      >
        Generate
      </button>
      ${nbsp}
      <button
        class="btn btn-outline-light btn-lg"
        ng-class="${showOptions ? "active" : null}"
        type="button"
        onClick=${() => onMoreOptions()}
        aria-expanded="false"
        aria-controls="collapseOptions"
      >
        More options
      </button>
    </div>
  </div>
</div>`;

export default PasswordControls;
