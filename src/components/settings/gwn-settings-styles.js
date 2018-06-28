import { html } from "@polymer/polymer/polymer-element.js";

export const SettingsStyles = html`
<style>
  paper-dropdown-menu {
    display: block;
  }

  paper-item {
    user-select: none;
  }

  paper-item:not([disabled]) {
    cursor: pointer;
  }

  .section {
    margin-bottom: 0;
    margin-top: var(--spacer-medium);
    font-weight: 800;
  }

  .subsection {
    font-weight: 800;
    font-size: .75rem;
    margin-bottom: var(--spacer-xsmall);
  }
</style>
`;