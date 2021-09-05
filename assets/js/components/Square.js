import { Template, initComponent } from "../utils.js";
import { defaultAnimationTiming } from "../animations.js";

const triangleKeyframes = [
  { transform: "rotate(0deg) translateX(0)" },
  { transform: "rotate(35deg) translateX(15%)" },
];

const Flat9SquareTemplate = Object.create(Template);
Flat9SquareTemplate.html = () => `<div id="square">
  <div id="triangle"></div>
</div>`;
Flat9SquareTemplate.css = () => `<style>
  #square {
    position: absolute;
    right: 0;
    height: 50vh;
    width: 50vw;
    background-color: var(--gray-20);
    z-index: -1;
    overflow: hidden;
  }

  #triangle {
    background-color: var(--gray-30);
    width: 100vw;
    height: 100vw;
    transform: rotate(35deg) translateX(15%);
  }
  </style>`;

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
