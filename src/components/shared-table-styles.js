import { html } from "@polymer/polymer/polymer-element.js";

export const SharedTableStyles = html`
<style>
  .table-scroll {
    overflow-x: auto;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    min-width: 600px;
    table-layout: fixed;
  }

  thead, tfoot {
    display: table;
    width: 100%;
    table-layout: fixed;
  }

  tbody {
    overflow-y: auto;
    width: 100%;
    display: block;
  }

  tbody tr {
    display: table;
    width: 100%;
    table-layout: fixed;
  }

  td {
    padding: 4px;
    text-overflow: ellipsis;
    overflow: hidden; 
    white-space: nowrap;
  }

  th {
    text-align: left;
    font-size: .9rem;
    font-weight: 800;
    padding: 1rem 4px;
  }

  thead th {
    padding-top: .5rem;
  }

  tr td:first-child, tr th:first-child {
    padding-left: 1rem;
  }

  tr td:last-child, tr th:last-child {
    padding-right: 1rem;
  }

  tr:nth-child(2n) {
    background-color: rgba(0, 0, 0, .04);
  }
</style>
`;