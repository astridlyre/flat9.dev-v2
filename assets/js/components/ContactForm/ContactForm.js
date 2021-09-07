import { initComponent, eventBus } from "../../utils.js";
import Flat9ContactFormTemplate from "./Template.js";
import Flat9Notification from "../Notification/Notification.js";
import config from "../../config.js";

export default class Flat9ContactForm extends HTMLElement {
  template = Flat9ContactFormTemplate;

  constructor() {
    super();
    this.init();
    this.els = [this.dom.name, this.dom.email, this.dom.message, this.dom.send];

    this.dom.form.addEventListener("submit", event => {
      event.preventDefault();
      const formData = Object.fromEntries([...new FormData(this.dom.form)]);
      requestAnimationFrame(() => {
        this.els.forEach(el => (el.disabled = true));
        this.dom.form.reset();
      });
      return this.sendMessage(formData);
    });
  }

  async sendMessage(formData) {
    return await fetch(`${config.API_ENDPOINT}/create-message`, {
      method: "POST",
      headers: {
        Authorization: `SuperSecretSecret ${config.superSecretSecret}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then(res => (this.isOk(res) ? res.json() : this.handleFailure()))
      .then(json => this.handleSuccess(json))
      .catch(error => this.handleFailure(error));
  }

  handleSuccess(json) {
    this.els.forEach(el => (el.disabled = false));
    requestAnimationFrame(() =>
      eventBus.dispatchEvent(
        new CustomEvent(Flat9Notification.NOTIFICATION_EVENT, {
          detail: json.response,
        })
      )
    );
  }

  handleFailure(error) {
    error && console.error(error);
    requestAnimationFrame(
      eventBus.dispatchEvent(
        new CustomEvent("error", {
          detail: error
            ? error.message
            : "Network Response was not OK or Content-Type was not JSON",
        })
      )
    );
  }

  isOk(res) {
    return (
      res.ok &&
      res.headers.has("Content-Type") &&
      res.headers.get("Content-Type").includes("application/json")
    );
  }
}

initComponent("contact-form", Flat9ContactForm);
