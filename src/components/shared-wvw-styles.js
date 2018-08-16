import { html } from "@polymer/polymer/polymer-element.js";

export const SharedWvwStyles = html`
<style>
  :host {
    /* Colors */
    --team-green: #4CAF50;
    --team-blue: #1E88E5;
    --team-red: #E53935;
  }

  .team-green-bg {
    background-color: var(--team-green);
  }

  .team-blue-bg {
    background-color: var(--team-blue);
  }

  .team-red-bg {
    background-color: var(--team-red);
  }

  gwn-progress.green {
    --gwn-progress-color: var(--team-green);
  }

  gwn-progress.blue {
    --gwn-progress-color: var(--team-blue);
  }

  gwn-progress.red {
    --gwn-progress-color: var(--team-red);
  }
</style>
`;