import { initComponent, Template, eventBus } from "../utils.js";
import config from "../config.js";

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

export default class Flat9SuperSecret extends HTMLElement {
  template = Flat9SuperSecretTemplate;
  constructor() {
    super();
    this.init();
    this.ping();
    this.dom.superSecret.addEventListener("click", event => {
      if (event.ctrlKey) {
        eventBus.dispatchEvent(new CustomEvent("super-secret-init"));
      } else {
        eventBus.dispatchEvent(
          new CustomEvent("notification", {
            detail: "This action has been logged.",
          })
        );
      }
    });
  }

  async ping() {
    return await fetch(`${config.API_ENDPOINT}/ping`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `SuperSecretSecret ${config.superSecretSecret}`,
      },
    });
  }
}

initComponent("super-secret", Flat9SuperSecret);
