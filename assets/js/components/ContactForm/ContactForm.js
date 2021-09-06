import { initComponent, eventBus } from "../../utils.js";
import Flat9ContactFormTemplate from "./Template.js";
import Flat9Notification from "../Notification/Notification.js";
import config from "../../config.js";

export default class Flat9ContactForm extends HTMLElement {
  template = Flat9ContactFormTemplate;
  constructor() {
    super();
    this.init();
    this.dom.form.addEventListener("submit", event => {
      event.preventDefault();
      const formData = Object.fromEntries([...new FormData(this.dom.form)]);
      this.els = [
        this.dom.name,
        this.dom.email,
        this.dom.message,
        this.dom.send,
      ];
      this.els.forEach(el => (el.disabled = true));
      this.dom.form.reset();
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
      .then(res => {
        if (
          res.ok &&
          res.headers.has("Content-Type") &&
          res.headers.get("Content-Type").includes("application/json")
        ) {
          return res.json();
        } else {
          eventBus.dispatchEvent(
            new CustomEvent("error", {
              detail:
                "Network Response was not OK or Content-Type was not JSON",
            })
          );
        }
      })
      .then(json => {
        eventBus.dispatchEvent(
          new CustomEvent(Flat9Notification.NOTIFICATION_EVENT, {
            detail: json.response,
          })
        );
        this.els.forEach(el => (el.disabled = false));
      });
  }
}

initComponent("contact-form", Flat9ContactForm);
