import { Template, initComponent } from "../utils.js";
import { defaultAnimationTiming } from "../animations.js";

const patterKeyframes = [
  { transform: "translateX(-100%)" },
  { transform: "translateX(0)" },
];

const Flat9PatternTemplate = Object.create(Template);
Flat9PatternTemplate.html = () => `<div id="pattern"></div>`;
Flat9PatternTemplate.css = () => `<style>
  :host {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 50vw;
    z-index: -1;
  }
  #pattern {
    height: 100vh;
    width: 50vw;
    border-right: var(--base-unit) solid var(--gray-80);
    opacity: 0.05;
    background-repeat: repeat;
    background-image: var(--big-pattern);
  </style>`;

export default class Flat9Pattern extends HTMLElement {
  template = Flat9PatternTemplate;
  constructor() {
    super();
    this.init();
  }

  connectedCallback() {
    this.dom.pattern.animate(patterKeyframes, defaultAnimationTiming);
  }
}

initComponent("pattern", Flat9Pattern);
