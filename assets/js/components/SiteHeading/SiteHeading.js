import { initComponent } from "../../utils.js";
import { defaultAnimationTiming, fadeInLeft } from "../../animations.js";
import Flat9SiteHeadingTemplate from "./Template.js";

export default class Flat9SiteHeading extends HTMLElement {
  template = Flat9SiteHeadingTemplate;
  constructor() {
    super();
    this.init();
  }
  connectedCallback() {
    this.dom.heading.animate(fadeInLeft, defaultAnimationTiming);
  }
}

initComponent("site-heading", Flat9SiteHeading);
