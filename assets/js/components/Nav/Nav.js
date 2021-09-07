import { initComponent } from "../../utils.js";
import {
  defaultAnimationTiming,
  fadeInLeft,
  fadeInRight,
} from "../../animations.js";
import Flat9NavTemplate from "./Template.js";

export default class Flat9Nav extends HTMLElement {
  template = Flat9NavTemplate;
  #animatedHeading;

  constructor() {
    super();
    this.init();

    this.dom.mask.addEventListener("click", () =>
      requestAnimationFrame(() => {
        this.dom.nav.classList.remove("open");
        setTimeout(() => {
          this.dom.mask.style.display = "none";
        }, 200);
      })
    );

    this.dom.nav.addEventListener("click", () =>
      requestAnimationFrame(() => {
        this.dom.nav.classList.remove("open");
        setTimeout(() => {
          this.dom.mask.style.display = "none";
        }, 200);
      })
    );

    this.dom.mobileButton.addEventListener("click", () =>
      requestAnimationFrame(() => {
        this.dom.mask.style.display = "block";
        this.dom.nav.classList.add("open");
      })
    );

    document.addEventListener("scroll", event => this.handleScroll(event));
  }

  enterScrollState() {
    return requestAnimationFrame(() => {
      this.#animatedHeading = true;
      this.dom.heading.classList.add("transform");
      this.dom.mobileButton.classList.add("scrolled");
      this.dom.nav.classList.add("scrolled");
      return requestAnimationFrame(() =>
        this.dom.mobileButton.classList.add("show")
      );
    });
  }

  exitScrollState() {
    return requestAnimationFrame(() => {
      this.#animatedHeading = false;
      this.dom.heading.classList.remove("transform");
      this.dom.mobileButton.classList.remove("scrolled");
      this.dom.nav.classList.remove("scrolled");
      return requestAnimationFrame(() =>
        this.dom.mobileButton.classList.remove("show")
      );
    });
  }

  handleScroll() {
    if (window.scrollY > 100 && !this.#animatedHeading) {
      return this.enterScrollState();
    } else if (window.scrollY < 100) {
      return this.exitScrollState();
    }
  }

  connectedCallback() {
    this.dom.heading.animate(fadeInLeft, defaultAnimationTiming);
    this.dom.desktop.animate(fadeInRight, defaultAnimationTiming);
  }
}

initComponent("nav", Flat9Nav);
