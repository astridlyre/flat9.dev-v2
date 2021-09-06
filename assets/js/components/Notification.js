import { eventBus, initComponent, Template } from "../utils.js";
import Flat9Router from "./Router.js";

const showNotification = [
  { opacity: 0, transform: "translateX(2rem)" },
  { opacity: 1, transform: "translateX(0)" },
];

const hideNotification = [
  { opacity: 1, transform: "translateX(0)" },
  { opacity: 0, transform: "translateX(2rem)" },
];

const Flat9NotificationTemplate = Object.create(Template);
Flat9NotificationTemplate.html = () => `<p id="notification">Hello</p>`;
Flat9NotificationTemplate.css = () => `<style>
  :host {
    position: fixed;
    top: var(--lg-spacing);
    right: var(--md-spacing);
    user-select: none;
    z-index: 18;
  }
  #notification {
    background-color: var(--primary);
    color: var(--gray-10);
    font-weight: 600;
    padding: var(--base-unit) var(--base-spacing);
    box-shadow: var(--box-shadow-sm);
    opacity: 0;
    transform: translateX(2rem);
    max-width: var(--readable-line-length);
  }
  </style>`;

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
