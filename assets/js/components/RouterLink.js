import { eventBus } from "../utils.js";
import Flat9Router from "./Router.js";

export default class Flat9RouterLink extends HTMLElement {
  #link;
  #isActive = false;
  #activeFunction;

  constructor() {
    super();
    this.#activeFunction = () => window.location.href.includes(this.#link.href);
  }

  connectedCallback() {
    this.#link = this.querySelector("a");
    eventBus.dispatchEvent(
      new CustomEvent("preload-mounted", { detail: this.#link.href })
    );
    this.#link.addEventListener("click", event => this.clicked(event));
    eventBus.addEventListener(Flat9Router.NAVIGATED_EVENT, () =>
      this.setStatus()
    );
    this.setStatus();
  }

  disconnectedCallback() {
    this.#link.removeEventListener("click", event => this.clicked(event));
  }

  set isActive(value) {
    this.#isActive = value;
    this.#isActive
      ? this.#link.classList.add("active")
      : this.#link.classList.remove("active");
  }

  get isActive() {
    return this.#isActive;
  }

  set active(func) {
    this.#activeFunction = func;
  }

  get active() {
    return this.#activeFunction;
  }

  setStatus() {
    this.#activeFunction() ? (this.isActive = true) : (this.isActive = false);
  }

  clicked(event) {
    event.preventDefault();
    Flat9Router.navigate(this.#link.href);
  }
}

customElements.get("flat9-router-link") ||
  customElements.define("flat9-router-link", Flat9RouterLink);
