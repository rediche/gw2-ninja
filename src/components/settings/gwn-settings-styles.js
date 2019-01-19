import { html } from "@polymer/polymer/polymer-element.js";

export const SettingsStyles = html`
  <style>
    :host {
      --paper-input-container-color: var(--gwn-on-surface);
      --paper-input-container-input-color: var(--gwn-on-surface);
      --paper-font-subhead: {
        font-family: var(--gwn-font-family);
      }
    }

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
      font-size: 0.75rem;
      margin-bottom: var(--spacer-xsmall);
    }
  </style>
`;
