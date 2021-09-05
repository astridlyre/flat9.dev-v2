import { Template, initComponent } from "../utils.js";
import {
  defaultAnimationTiming,
  fadeInLeft,
  fadeInRight,
} from "../animations.js";
import config from "../config.js";

const Flat9NavTemplate = Object.create(Template);

Flat9NavTemplate.html = () => `<header id="header">
      <nav id="nav">
        <h5 id="heading">
          <flat9-router-link>
            <a href="/" title="Go to home page">
              ${config.siteName}
            </a>
          </flat9-router-link>
        </h5>
        <div id="menu">
          ${config.siteLinks
            .map(
              link => `
            <flat9-router-link>
              <a href="${link.href}" title="${link.title}">${link.name}</a>
            </flat9-router-link>
            `
            )
            .join("\n")}
        </div>
      </nav>
    </header>`;

Flat9NavTemplate.css = () => `<style>
  :host {
    position: sticky;
    top: 0;
    left; 0;
  }
  #header {
    padding: var(--base-spacing);
    box-sizing: border-box;
  }

  #nav {
    width: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }

  #heading {
    margin: 0;
    font-size: var(--sm-font-mobile);
  }

  #heading a {
    color: var(--gray-80);
    text-decoration: none;
  }

  #heading a:hover, #heading a:focus {
    color: var(--gray-10);
  }

  #menu {
    display: flex;
    gap: var(--base-unit);
  }

  a {
    color: var(--primary);
    text-decoration: none;
    display: inline-block;
    font-weight: 600;
    line-height: 1;
    padding: var(--base-unit);
    outline: none;
  }

  a:hover, a:focus {
    background-color: var(--gray-80);
    color: var(--gray-10);
  }

  @media screen and (min-width: 901px) {
    #heading {
      font-size: var(--sm-font);
    }
    #menu {
      gap: var(--base-spacing);
    }
  }
  </style>`;

export default class Flat9Nav extends HTMLElement {
  template = Flat9NavTemplate;
  constructor() {
    super();
    this.init();
  }

  connectedCallback() {
    this.dom.heading.animate(fadeInLeft, defaultAnimationTiming);
    this.dom.menu.animate(fadeInRight, defaultAnimationTiming);
  }
}

initComponent("nav", Flat9Nav);
