import { initComponent, Template } from "../utils.js";
import { defaultAnimationTiming, fadeInLeft } from "../animations.js";

const Flat9SiteHeadingTemplate = Object.create(Template);

Flat9SiteHeadingTemplate.html = () => `<h1 id="heading">
  I make websites <span>work</span>.
</h1>`;
Flat9SiteHeadingTemplate.css = () => `<style>
  #heading {
    font-size: var(--xxl-font-mobile);
    line-height: var(--xxl-line-height-mobile);
    letter-spacing: var(--xxl-letter-spacing-mobile);
    margin: var(--lg-spacing) 0 var(--base-spacing) 0;
  }

  span {
    color: var(--primary);
  }

  @media screen and (min-width: 601px) {
    #heading {
      margin: var(--xl-spacing) 0 var(--md-spacing) 0;
    }
  }

  @media screen and (min-width: 901px) {
    #heading {
      font-size: var(--xxl-font);
      line-height: var(--xxl-line-height);
      letter-spacing: var(--xxl-letter-spacing);
      margin: var(--lg-spacing) 0 var(--md-spacing) 0;
      max-width: 50vw;
    }
  }
</style>`;

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
