import { eventBus, initComponent } from "../../utils.js";
import Flat9Router from "../Router.js";
import Flat9NotificationTemplate from "./Template.js";

const showNotification = [
  { opacity: 0, transform: "translateX(2rem)" },
  { opacity: 1, transform: "translateX(0)" },
];

const hideNotification = [
  { opacity: 1, transform: "translateX(0)" },
  { opacity: 0, transform: "translateX(2rem)" },
];

export default class Flat9Notification extends HTMLElement {
  template = Flat9NotificationTemplate;
  constructor() {
    super();
    this.init();
    eventBus.addEventListener("error", ({ detail }) =>
      this.handleNotification(detail)
    );
    eventBus.addEventListener(
      Flat9Notification.NOTIFICATION_EVENT,
      ({ detail }) => this.handleNotification(detail)
    );
    eventBus.addEventListener(Flat9Router.NAVIGATION_FAILURE, ({ detail }) =>
      this.handleNotification(detail.message)
    );
  }

  handleNotification(text) {
    requestAnimationFrame(() => {
      this.showNotification(text);
      setTimeout(
        () => requestAnimationFrame(() => this.hideNotification()),
        3000
      );
    });
  }

  showNotification(text) {
    this.dom.notification.textContent = text;
    this.dom.notification.animate(showNotification, {
      duration: 250,
      fill: "forwards",
      easing: "ease-out",
    });
  }

  hideNotification() {
    this.dom.notification.animate(hideNotification, {
      duration: 250,
      fill: "forwards",
      easing: "ease-out",
    });
  }

  static get NOTIFICATION_EVENT() {
    return "notification";
  }
}

initComponent("notification", Flat9Notification);
