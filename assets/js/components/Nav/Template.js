import { Template } from "../../utils.js";
import config from "../../config.js";
import { Menu } from "../Icons.js";

const Flat9NavTemplate = Object.create(Template);

Flat9NavTemplate.html = () => `<a href="#main-content"
  title="Skip to main content" id="skip">Skip to main content</a>
      <h5 id="heading" class="">
        <flat9-router-link>
          <a href="/" title="Go to home page">
            ${config.siteName}<span id="dev">.dev</span>
          </a>
        </flat9-router-link>
      </h5>
      <nav id="desktop">
        ${config.siteLinks
          .map(
            link => `
          <flat9-router-link>
            <a href="${link.href}" title="${link.title}">${link.name}</a>
          </flat9-router-link>
          `
          )
          .join("\n")}
      </nav>
      <button id="mobileButton" class="">${Menu}</button>
      <nav id="nav" class="">
        ${config.siteLinks
          .map(
            link => `
          <flat9-router-link>
            <a href="${link.href}" title="${link.title}">${link.name}</a>
          </flat9-router-link>
          `
          )
          .join("\n")}
      </nav>
      <div id="mask"></div>
  `;

Flat9NavTemplate.css = () => `<style>
  :host {
    --top-spacing: var(--base-spacing);
    --side-spacing: var(--base-spacing);
  }
  @media screen and (min-width: 901px) {
    :host {
      --side-spacing: var(--lg-spacing);
    }
  }
  @media screen and (min-width: 1921px) {
    :host {
      --top-spacing: var(--md-spacing);
      --side-spacing: var(--xl-spacing);
    }
  }
  #skip {
    transform: translateY(-120%);
    position: fixed;
    top: 0;
    left: 0;
  }
  #skip:focus {
    transform: translateY(0);
  }

  #desktop {
    position: absolute;
    top: var(--top-spacing);
    right: var(--side-spacing);
    display: none;
    gap: var(--base-spacing);
  }

  @media screen and (min-width: 901px) {  
    #desktop {
      display: flex;
    }
    #desktop.hidden {
      display: none;
    }
  }

  #nav {
    height: 100vh;
    display: flex;
    flex-flow: column nowrap;
    z-index: 20;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    max-width: 100vw;
    padding: var(--md-spacing);
    justify-content: center;
    gap: var(--md-spacing);
    background-color: var(--gray-90);
    transform: translateX(110%);
  }

  #nav.open, #nav:focus-within {
    transform: translateX(0);
    transition: transform 0.2s ease-out;
  }

  #nav a {
    font-size: var(--lg-font-mobile);
  }
  
  @media screen and (min-width: 601px) {
    #nav {
      left: unset;
    }
  }

  @media screen and (min-width: 901px) {
    #nav {
      display: none;
    }
    #nav.scrolled {
      display: flex;
    }
    #nav a {
      font-size: var(--lg-font);
    }
  }

  #mask {
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    right: 0;
    position: fixed;
    content: "";
    background-color: var(--gray-80);
    opacity: 0;
    display: none;
    z-index: 1;
  }

  #nav.open + #mask {
    opacity: 0.5;
    transition: opacity: 0.2s ease-out;
  }

  #heading {
    position: fixed;
    top: var(--top-spacing);
    left: var(--side-spacing);
    width: fit-content;
    margin: 0;
    font-size: var(--sm-font-mobile);
    transform: translate(0, 0);
    transition: transform 0.2s ease-out;
    z-index: 10;
  }

  #heading.transform {
    background-color: var(--gray-80);
    transform: translate(-1rem, -1rem);
    transition: transform 0.2s ease-out;
  }

  #heading a {
    color: var(--gray-80);
    text-decoration: none;
  }

  #heading.transform a {
    color: var(--gray-10) !important;
  }

  #heading a:hover, #heading a:focus {
    color: var(--gray-10);
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
  }

  #mobileButton {
    margin: 0;
    background: none;
    border: none;
    padding: var(--base-unit);
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--gray-80);
    position: fixed;
    top: var(--top-spacing);
    right: var(--side-spacing);
    opacity: 1;
    transform: translate(0, 0);
    transition: all 0.2s ease-out;
    cursor: pointer;
    z-index: 10;
  }

  @media screen and (min-width: 901px) {
    #mobileButton {
      display: none;
    }
    #mobileButton.scrolled {
      opacity: 0;
      display: flex;
    }
  }

  #mobileButton.scrolled.show, #mobileButton:focus {
    opacity: 1;
    transition: all 0.2s ease-out;
    transform: translate(1rem, -1rem);
  }

  #mobileButton svg {
    color: var(--white);
    height: 1.86rem;
    width: 1.86rem;
  }
  </style>`;

export default Flat9NavTemplate;
