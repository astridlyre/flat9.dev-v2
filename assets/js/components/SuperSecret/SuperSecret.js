import { initComponent, eventBus } from "../../utils.js";
import config from "../../config.js";
import Flat9SuperSecretTemplate from "./Template.js";
import Flat9SuperSecretPage from "../SuperSecretPage/SuperSecretPage.js";

export default class Flat9SuperSecret extends HTMLElement {
  template = Flat9SuperSecretTemplate;
  #secretPage;

  constructor() {
    super();
    this.init();
    this.ping();
    this.dom.superSecret.addEventListener("click", event => {
      event.preventDefault();
      if ((event.ctrlKey || event.metaKey) && !this.#secretPage) {
        requestAnimationFrame(() => {
          this.#secretPage = new Flat9SuperSecretPage();
          this.#secretPage.addEventListener("destroy", () => {
            this.#secretPage.remove();
            this.#secretPage = null;
          });
          document.body.appendChild(this.#secretPage);
        });
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
