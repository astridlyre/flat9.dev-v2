import { initComponent, eventBus } from "../../utils.js";
import Flat9SecretMessengerTemplate from "./Template.js";

export default class Flat9SecretMessenger extends HTMLElement {
  template = Flat9SecretMessengerTemplate;
  #username;

  constructor({ username = "" } = {}) {
    super();
    this.init({ username });
    this.#username = username;

    this.dom.logoff.addEventListener("click", () => {
      eventBus.dispatchEvent(new CustomEvent("logoff"));
    });

    this.dom.send.addEventListener("submit", event => {
      event.preventDefault();
      eventBus.dispatchEvent(
        new CustomEvent("send-message", {
          detail: Object.fromEntries([...new FormData(this.dom.send)]),
        })
      );
      this.dom.send.reset();
    });
  }

  setUsers(users) {
    const fragment = new DocumentFragment();
    users.forEach(user => {
      const li = document.createElement("li");
      li.classList.add("user");
      li.textContent = user.username;
      fragment.appendChild(li);
    });
    requestAnimationFrame(() => {
      console.log(this.dom.users);
      this.dom.users.textContent = "";
      this.dom.users.appendChild(fragment);
    });
  }

  addMessages(messages) {
    const fragment = new DocumentFragment();
    messages.forEach(message => this.addMessage(message, fragment));
    requestAnimationFrame(() => {
      this.dom.messages.appendChild(fragment);
      this.dom.messages.scrollTop = this.dom.messages.scrollHeight;
    });
  }

  addMessage({ user, message }, destination) {
    return requestAnimationFrame(() => {
      const m = document.createElement("li");
      if (user.username === this.#username) {
        m.classList.add("user");
      }
      m.innerHTML = `<span class="time"></span>
      <div class="content"><span class="username"></span><span class="message"></span></div>`;
      m.querySelector(".username").textContent = user.username;
      m.querySelector(".time").textContent = new Date(
        message.createdAt
      ).toUTCString();
      m.querySelector(".message").textContent = message.text;

      if (destination) {
        destination.appendChild(m);
      } else {
        this.dom.messages.appendChild(m);
        this.dom.messages.scrollTop = this.dom.messages.scrollHeight;
      }
    });
  }
}

initComponent("secret-messenger", Flat9SecretMessenger);
