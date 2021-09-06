import { Template } from "../../utils.js";

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

export default Flat9NotificationTemplate;
