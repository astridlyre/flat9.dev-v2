import { Template, initComponent } from "../utils.js";
import { defaultAnimationTiming, fadeInRight } from "../animations.js";
import config from "../config.js";

const Flat9FooterTemplate = Object.create(Template);
Flat9FooterTemplate.html = () => `<footer id="footer">
  <div id="social">
    ${config.footerLinks
      .map(
        link => `
      <a
        href="${link.href}"
        title="${link.title}"
        rel="noreferrer noopener"
        target="_blank"
      >${link.icon}
      </a>
      `
      )
      .join("\n")}
  </div>
</footer>`;
Flat9FooterTemplate.css = () => `<style>
  :host {
    --side-spacing: var(--base-spacing);
  }
  @media screen and (min-width: 901px) {
    :host {
      --side-spacing: var(--lg-spacing);
    }
  }
  @media screen and (min-width: 1921px) {
    :host {
      --side-spacing: var(--xl-spacing);
    }
  }
  #footer {
    display: flex;
    justify-content: flex-end;
    position: fixed;
    right: var(--side-spacing);
    bottom: var(--base-unit);
  }

  #social {
    display: flex;
    gap: var(--base-unit);
    background-color: var(--gray-10);
  }

  a {
    line-height: 1;
    padding: var(--base-unit);
    color: var(--primary);
    display: flex;
    justify-content: center;
    align-items: center;
    outline: none;
  }

  a:hover, a:focus {
    background-color: var(--gray-80);
    color: var(--gray-10);
  }
  
  svg {
    width: 1.62rem;
    height: 1.62rem;
  }
  </style>`;

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
