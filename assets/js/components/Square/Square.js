import { initComponent } from "../../utils.js";
import { defaultAnimationTiming } from "../../animations.js";
import Flat9SquareTemplate from "./Template.js";

const triangleKeyframes = [
  { transform: "rotate(0deg) translateX(0)" },
  { transform: "rotate(35deg) translateX(15%)" },
];

export default class Flat9Square extends HTMLElement {
  template = Flat9SquareTemplate;
  constructor() {
    super();
    this.init();
  }
  connectedCallback() {
    this.dom.triangle.animate(triangleKeyframes, defaultAnimationTiming);
  }
}

initComponent("square", Flat9Square);
