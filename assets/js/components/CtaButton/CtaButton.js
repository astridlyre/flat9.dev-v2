import { initComponent } from "../../utils.js";
import { defaultAnimationTiming, fadeInRight } from "../../animations.js";
import Flat9CtaButtonTemplate from "./Template.js";

export default class Flat9CtaButton extends HTMLElement {
  template = Flat9CtaButtonTemplate;
  constructor() {
    super();
    this.init();
  }
  connectedCallback() {
    this.dom.cta.animate(fadeInRight, defaultAnimationTiming);
  }
}

initComponent("cta-button", Flat9CtaButton);
