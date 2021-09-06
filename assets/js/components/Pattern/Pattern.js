import { initComponent } from "../../utils.js";
import { defaultAnimationTiming } from "../../animations.js";
import Flat9PatternTemplate from "./Template.js";

const patterKeyframes = [
  { transform: "translateX(-100%)" },
  { transform: "translateX(0)" },
];

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
