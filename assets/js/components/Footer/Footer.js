import { initComponent } from "../../utils.js";
import { defaultAnimationTiming, fadeInRight } from "../../animations.js";
import Flat9FooterTemplate from "./Template.js";

export default class Flat9Footer extends HTMLElement {
  template = Flat9FooterTemplate;
  constructor() {
    super();
    this.init();
  }

  connectedCallback() {
    this.dom.social.animate(fadeInRight, defaultAnimationTiming);
  }
}

initComponent("footer", Flat9Footer);
