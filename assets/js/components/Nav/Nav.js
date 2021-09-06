import { initComponent } from "../../utils.js";
import {
  defaultAnimationTiming,
  fadeInLeft,
  fadeInRight,
} from "../../animations.js";
import Flat9NavTemplate from "./Template.js";

export default class Flat9Nav extends HTMLElement {
  template = Flat9NavTemplate;
  #inScrollState;
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
    this.isScrollingDown = Flat9Nav.scrollState();
  }

  animateHeading(show) {
    if (show) {
      requestAnimationFrame(() => {
        this.dom.heading.classList.remove("transform");
      });
    } else {
      requestAnimationFrame(() => {
        this.dom.heading.classList.add("transform");
      });
    }
  }

  animateButton(show) {
    if (show) {
      requestAnimationFrame(() => {
        this.dom.mobileButton.classList.add("show");
      });
    } else {
      requestAnimationFrame(() => {
        this.dom.mobileButton.classList.remove("show");
      });
    }
  }

  static *scrollState() {
    let [prev, cur] = [window.scrollY, null];
    while (true) {
      [prev, cur] = [cur, window.scrollY];
      yield prev - cur < 0;
    }
  }

  handleScroll() {
    const isScrollingDown = this.isScrollingDown.next().value;
    if (window.scrollY > 100 && !this.#animatedHeading) {
      requestAnimationFrame(() => {
        this.#animatedHeading = true;
        this.animateHeading(false);
        this.dom.mobileButton.classList.add("scrolled");
        this.animateButton(true);
        this.dom.nav.classList.add("scrolled");
      });
    } else if (window.scrollY < 100) {
      requestAnimationFrame(() => {
        this.#animatedHeading = false;
        this.animateHeading(true);
        this.dom.mobileButton.classList.remove("scrolled");
        this.animateButton(false);
        this.dom.nav.classList.remove("scrolled");
      });
    }
    if (isScrollingDown && window.scrollY > 200 && !this.#inScrollState) {
      this.#inScrollState = true;
    } else if (!isScrollingDown && this.#inScrollState) {
      this.#inScrollState = false;
    }
  }

  connectedCallback() {
    this.dom.heading.animate(fadeInLeft, defaultAnimationTiming);
    this.dom.desktop.animate(fadeInRight, defaultAnimationTiming);
  }
}

initComponent("nav", Flat9Nav);
