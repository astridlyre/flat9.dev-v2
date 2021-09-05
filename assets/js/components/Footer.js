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
    width: 100vw;
    margin-top: auto;
    position: sticky;
    bottom: 0;
    right: 0;
  }
  #footer {
    display: flex;
    justify-content: flex-end;
    padding: var(--base-spacing);
  }

  #social {
    display: flex;
    gap: var(--base-spacing);
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
    width: var(--base-spacing);
    height: var(--base-spacing);
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
