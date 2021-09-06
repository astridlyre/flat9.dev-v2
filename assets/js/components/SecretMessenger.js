import { initComponent, Template, eventBus } from "../utils.js";

const Flat9SecretMessengerTemplate = Object.create(Template);
Flat9SecretMessengerTemplate.html = props => `<header id="header">
      <h4>Mainframe Encrypted HyperText Communiqué</h4><span id="user">${props.username}</span>
    </header>
    <ul id="messages">
    </ul>
    <form id="send">
      <input type="text" minlength="1" maxlength="140" name="message" id="message" autocomplete="off" placeholder="Type something..."/>
      <button type="submit" title="Send message" class="primary">Send</button>
      <button type="button" id="logoff" title="Logoff" class="secondary">Logoff</button>
    </form>`;
Flat9SecretMessengerTemplate.css = () => `<style>
  :host {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 50;
  }

  #header {
    width: 100%;
    box-sizing: border-box;
    padding: 0 var(--base-spacing);
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 6rem;
    border-bottom: 2px solid var(--gray-70);
  }

  h4 {
    font-size: var(--sm-font);
    color: var(--gray-50);
    margin: 0;
  }

  #user {
    padding: var(--base-unit) var(--md-spacing) var(--base-unit) calc(var(--base-unit) * 2);
    border-radius: var(--sm-radius);
    color: var(--gray-10);
    font-weight: 600;
    background-color: var(--gray-70);
    position: relative;
  }

  #user::after {
    content: '';
    position: absolute;
    height: 1rem;
    width: 1rem;
    right: calc(var(--base-spacing) - 0.5rem);
    top: calc(50% - 0.5rem);
    background-color: var(--complementary);
    border-radius: 100%;
  }

  ul {
    position: fixed;
    top: 6rem;
    left: 0;
    width: 100%;
    margin: 0;
    padding: var(--base-spacing);
    padding-bottom: var(--md-spacing);
    display: flex;
    flex-flow: column nowrap;
    gap: var(--base-unit);
    height: calc(100vh - 12rem);
    overflow-y: scroll;
    list-style: none;
  }

  li {
    width: fit-content;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
  }

  .content {
    display: flex;
    align-items: flex-start;
    gap: var(--base-spacing);
  }

  li span.message {
    background-color: var(--gray-70);
    border-radius: var(--sm-radius);
    color: var(--gray-10);
    padding: var(--base-unit);
  }

  li span.username {
    color: var(--gray-30);
    font-weight: 600;
    padding: var(--base-unit);
  }

  li span.time {
    color: var(--gray-60);
    font-size: var(--tiny-font);
  }

  #send {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: var(--base-spacing);
    display: flex;
    gap: var(--base-unit);
  }

  input {
    padding: calc(var(--base-unit) * 2);
    border: 2px solid transparent;
    border-radius: var(--sm-radius);
    background-color: var(--gray-70);
    outline: none;
    flex-grow: 1;
    color: var(--gray-10);
    font-family: var(--body-font-family);
    font-size: var(--base-font);
  }

  input:focus, input:hover {
    border-color: var(--gray-10);
    background-color: var(--gray-60);
  }

  input:placeholder {
    color: var(--gray-60);
  }

  button {
    width: 8rem;
    border: none;
    outline: none;
    border-radius: var(--sm-radius);
    color: var(--gray-10);
    font-weight: 600;
    font-family: var(--heading-font-family);
    font-size: var(--base-font);
    cursor: pointer;
  }

  button.primary {
    background-color: var(--primary);
  }

  button.primary:hover, button.primary:focus {
    background-color: var(--primary-light);
  }

  button.secondary {
    background-color: var(--secondary);
  }

  button.secondary:hover, button.secondary:focus {
    background-color: var(--secondary-light);
  }
  </style>`;

export default class Flat9SecretMessenger extends HTMLElement {
  template = Flat9SecretMessengerTemplate;

  constructor({ username = "" } = {}) {
    super();
    this.init({ username });
    this.dom.logoff.addEventListener("click", () => {
      eventBus.dispatchEvent(new CustomEvent("logoff"));
    });
    this.dom.send.addEventListener("submit", event => {
      event.preventDefault();
      const formData = Object.fromEntries([...new FormData(this.dom.send)]);
      this.dom.send.reset();
      eventBus.dispatchEvent(
        new CustomEvent("send-message", { detail: formData })
      );
    });
  }

  addMessage({ user, message }) {
    const m = document.createElement("li");
    m.innerHTML = `<span class="time"></span>
      <div class="content"><span class="username"></span><span class="message"></span></div>`;
    m.querySelector(".username").textContent = user.username;
    m.querySelector(".time").textContent = new Date(
      message.createdAt
    ).toUTCString();
    m.querySelector(".message").textContent = message.text;
    this.dom.messages.appendChild(m);
    this.dom.messages.scrollTop = this.dom.messages.scrollHeight;
  }
}

initComponent("secret-messenger", Flat9SecretMessenger);
