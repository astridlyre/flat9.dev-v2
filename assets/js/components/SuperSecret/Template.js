import { Template } from "../../utils.js";

const Flat9SuperSecretTemplate = Object.create(Template);

Flat9SuperSecretTemplate.html = () => `<span id="superSecret">π</span>`;

Flat9SuperSecretTemplate.css = () => `<style>
  :host {
    position: fixed;
    bottom: var(--base-unit);
    right: var(--base-unit);
    user-select: none;
    color: var(--gray-80);
    font-family: var(--body-font-family);
  }
  </style>`;

export default Flat9SuperSecretTemplate;
