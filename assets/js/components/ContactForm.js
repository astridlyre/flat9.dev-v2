import { initComponent, Template } from "../utils.js";

const Flat9ContactFormTemplate = Object.create(Template);

Flat9ContactFormTemplate.html = () => `<form id="form">
  <div>
    <label for="name">
      <input type="text" name="name" id="name" required minlength="2" maxlength="50" />
      <span id="nameLabel">Name</span>
    </label>
    <label for="email">
      <input type="email" name="email" id="email" required minlength="2" maxlength="100" />
      <span id="emailLabel">Email</span>
    </label>
  </div>
  <label for="message">
    <textarea id="message" name="message" minlength="1" maxlength="500" required autocomplete="off"></textarea>
    <span id="messageLabel">Message</span>
  </label>
  <button type="submit" title="Send Message">Send</button>
  </form>`;

Flat9ContactFormTemplate.css = () => `<style>
  :host {
    width: 100%;
  }
  #form {
    display: flex;
    flex-flow: column nowrap;
    align-items: flex-end;
    gap: var(--base-spacing);
    max-width: var(--readable-line-length);
    margin: 0 auto;
  }

  div {
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    gap: var(--base-spacing);
  }

  @media screen and (min-width: 901px) {
    div {
      flex-flow: row nowrap;
    }
  }

  label {
    margin-top: calc(var(--base-unit) * 2);
    position: relative;
    width: 100%;
  }

  label:focus-within span, input:valid + span, textarea:valid + span {
    top: -1.2rem;
    left: 0px;
    color: var(--gray-80);
    font-weight: 600;
    transition: all 0.2s ease-out;
  }

  span {
    position: absolute;
    top: calc(var(--base-unit) + 0.5rem);
    left: calc(var(--base-unit) * 2);
    line-height: 1;
    color: var(--gray-40);
    transition: all 0.2s ease-out;
  }

  input, textarea {
    padding: calc(var(--base-unit) * 2);
    border: 2px solid var(--gray-30);
    border-radius: var(--sm-radius);
    box-sizing: border-box;
    font-size: var(--base-font);
    background-color: var(--gray-10);
    outline: none;
  }

  input:focus, textarea:focus {
    border-color: var(--gray-80);
  }

  input {
    width: 100%;
  }

  textarea {
    resize: none;
    width: 100%;
    min-width: 50vw;
    height: 33vh;
  }

  button {
    margin-left: auto;
    padding: calc(var(--base-unit) * 1.5) var(--md-spacing);
    border: none;
    border-radius: var(--sm-radius);
    background-color: var(--primary);
    color: var(--white);
    font-size: var(--base-font);
    font-weight: 600;
    font-family: var(--heading-font-family);
    outline: none;
  }

  button:hover, button:focus {
    background-color: var(--gray-80);
    cursor: pointer;
  }
</style>`;

export default class Flat9ContactForm extends HTMLElement {
  template = Flat9ContactFormTemplate;
  constructor() {
    super();
    this.init();
    this.dom.form.addEventListener("submit", event => {
      event.preventDefault();
      const data = Object.fromEntries([...new FormData(this.dom.form)]);
      console.log(data);
    });
  }
}

initComponent("contact-form", Flat9ContactForm);
