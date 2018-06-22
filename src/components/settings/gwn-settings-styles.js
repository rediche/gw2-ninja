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
</style>
`;