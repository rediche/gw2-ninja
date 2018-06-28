import { html } from "@polymer/polymer/polymer-element.js";

export const SharedStyles = html`
<style>
  :host {
    /* Colors */
    --color-guild-wars-2: #F44336;
    --color-guild-wars-2-dark: #C62828;

    --color-heart-of-thorns: #4CAF50;
    --color-heart-of-thorns-dark: #2E7D32;

    --color-path-of-fire: #9C27B0;
    --color-path-of-fire-dark: #6A1B9A;

    /* Main variables */
    --app-primary-color: var(--color-path-of-fire);
    --app-primary-color-dark: var(--color-path-of-fire-dark);
    --app-text-color: #212121;
    --app-text-color-light: #ffffff;
    --app-background-color: #ffffff;

    /* Generic styles */
    --app-box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.12);
    --app-box-shadow-reverse: 0 -1px 4px rgba(0, 0, 0, 0.12);
    --app-border-radius: .125rem;
    --spacer-none: 0;
    --spacer-xsmall: .25rem;
    --spacer-small: .5rem;
    --spacer-medium: 1rem;
    --spacer-large: 1.5rem;
  }

  :host([theme="core"]) {
    --app-primary-color: var(--color-guild-wars-2);
    --app-primary-color-dark: var(--color-guild-wars-2-dark);
  }

  :host([theme="hot"]) {
    --app-primary-color: var(--color-heart-of-thorns);
    --app-primary-color-dark: var(--color-heart-of-thorns-dark);
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  *[hidden] {
    display: none;
  }

  body {
    color: var(--app-text-color);
  }

  h1, h2, h3, h4, h5, h6 {
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
    border-radius: var(--app-border-radius);
    background-color: var(--app-background-color);
    box-shadow: var(--app-box-shadow);
    box-sizing: border-box;
    overflow: hidden;
  }

  hr {
    display: block;
    height: 1px;
    border: 0;
    border-top: 1px solid var(--paper-grey-300);
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
    color: var(--app-text-color);
  }

  h2,
  .display-3 {
    font-size: 56px;
    font-weight: 400;
    color: var(--app-text-color);
  }

  h3,
  .display-2 {
    font-size: 45px;
    font-weight: 400;
    color: var(--app-text-color);
  }

  h4,
  .display-1 {
    font-size: 34px;
    font-weight: 400;
    color: var(--app-text-color);
  }

  h5,
  .headline {
    font-size: 24px;
    font-weight: 400;
    color: var(--app-text-color);
  }

  h6,
  .title {
    font-size: 20px;
    font-weight: 800;
    color: var(--app-text-color);
  }

  .description {
    padding: 0 var(--spacer-large) var(--spacer-large);
    margin: 0;
    color: #ffffff;
    background-color: var(--app-primary-color);
  }

  .sticky-tabs {
    position: sticky;
    top: 4rem;
    z-index: 401; /* 401 because it needs to be higher than z-index 400 on timer page */
  }

  paper-item {
    cursor: pointer;
  }
</style>
`;