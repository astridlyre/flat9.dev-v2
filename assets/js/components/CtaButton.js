import { initComponent, Template } from "../utils.js";
import { defaultAnimationTiming, fadeInRight } from "../animations.js";
import config from "../config.js";

const Flat9CtaButtonTemplate = Object.create(Template);

Flat9CtaButtonTemplate.html = () =>
  `<flat9-router-link id="ctaLink">
     <a id="cta" title="${config.cta.title}" href="${config.cta.href}">
       ${config.cta.icon}
       <span>${config.cta.text}</span>
     </a>
   </flat9-router-link>`;

Flat9CtaButtonTemplate.css = () => `<style>
  :host {
    margin-top: var(--base-spacing);
  }
  @media screen and (min-width: 901px) {
    :host {
      margin-top: unset;
    }
  }
  #cta {
    padding: var(--base-unit) var(--base-spacing);
    border: none;
    margin: 0;
    font-weight: 600;
    font-size: var(--sm-font);
    display: flex;
    align-items: center;
    gap: var(--base-spacing);
    text-decoration: none;
    width: fit-content;
    background-color: var(--gray-80);
    color: var(--gray-10);
  }

  #cta:hover, #cta:focus {
    background-color: var(--primary);
    color: var(--white);
  }

  #cta:hover svg, #cta:focus svg {
    transform: translateX(var(--base-unit));
    transition: transform 0.1s ease-out;
  }

  svg {
    transition: transform 0.1s ease-out;
    height: var(--base-spacing);
    width: var(--base-spacing);
  }
  </style>`;

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
