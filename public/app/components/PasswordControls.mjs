import htm from "htm";
import { createElement as h } from "preact";

const html = htm.bind(h);

const PasswordControls = ({
  showOptions,
  onGenerate,
  onMoreOptions,
}) => html`<div class="mb-4 flex gap-2">
  <button
    class="px-6 py-3 text-lg font-medium border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
    type="button"
    name="passwdButton"
    onClick=${() => onGenerate()}
  >
    Generate
  </button>
  <button
    class="px-6 py-3 text-lg font-medium border-2 rounded-lg transition-colors ${showOptions
      ? "border-text-muted bg-surface-hover text-text"
      : "border-text-muted text-text-muted hover:bg-surface hover:text-text"}"
    type="button"
    onClick=${() => onMoreOptions()}
    aria-expanded=${showOptions}
    aria-controls="collapseOptions"
  >
    More options
  </button>
</div>`;

export default PasswordControls;
