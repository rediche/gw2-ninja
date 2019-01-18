import { html } from "@polymer/polymer/polymer-element.js";

export const SharedStyles = html`
  <style>
    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }

    :host {
      display: block;
      box-sizing: border-box;
    }

    [hidden],
    :host([hidden]) {
      display: none;
    }

    body {
      color: var(--gwn-text-dark);
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin-top: var(--spacer-none);
      margin-bottom: var(--spacer-small);
    }

    p,
    ol,
    ul {
      margin-top: var(--spacer-none);
      margin-bottom: var(--spacer-medium);
    }

    p:last-child,
    ol:last-child,
    ul:last-child {
      margin-bottom: var(--spacer-none);
    }

    ol,
    ul {
      padding-left: 1.2rem;
    }

    ol ol,
    ul ul,
    ol ul,
    ul ol {
      margin-bottom: var(--spacer-none);
    }

    .card {
      padding: var(--spacer-medium);
      border-radius: var(--gwn-border-radius);
      background-color: var(--gwn-surface);
      color: var(--gwn-on-surface);
      box-shadow: var(--gwn-box-shadow);
      box-sizing: border-box;
      overflow: hidden;
    }

    hr {
      display: block;
      height: 1px;
      border: 0;
      border-top: 1px solid var(--gwn-divider);
      margin: var(--spacer-medium) var(--spacer-none);
      padding: var(--spacer-none);
    }

    .row {
      margin: var(--spacer-large);
    }

    .row.narrow {
      max-width: 800px;
      margin-left: auto;
      margin-right: auto;
    }

    .text-center {
      text-align: center;
    }

    h1,
    .display-4 {
      font-size: 112px;
      font-weight: 300;
      color: var(--gwn-on-surface);
    }

    h2,
    .display-3 {
      font-size: 56px;
      font-weight: 400;
      color: var(--gwn-on-surface);
    }

    h3,
    .display-2 {
      font-size: 45px;
      font-weight: 400;
      color: var(--gwn-on-surface);
    }

    h4,
    .display-1 {
      font-size: 34px;
      font-weight: 400;
      color: var(--gwn-on-surface);
    }

    h5,
    .headline {
      font-size: 24px;
      font-weight: 400;
      color: var(--gwn-on-surface);
    }

    h6,
    .title {
      font-size: 20px;
      font-weight: 800;
      color: var(--gwn-on-surface);
    }

    .description {
      padding: 0 var(--spacer-large) var(--spacer-large);
      margin: 0;
      color: var(--gwn-on-primary);
      background-color: var(--gwn-primary);
    }

    .sticky-tabs {
      position: sticky;
      top: 4rem;
      z-index: 401; /* 401 because it needs to be higher than z-index 400 on timer page */
    }

    paper-item {
      cursor: pointer;
    }

    .no-text-overflow {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  </style>
`;
