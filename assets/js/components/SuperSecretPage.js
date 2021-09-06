import {
  initComponent,
  Template,
  eventBus,
  withAsyncScript,
} from "../utils.js";
import Flat9SecretMessenger from "./SecretMessenger.js";
import config from "../config.js";

const Flat9SuperSecretPageTemplate = Object.create(Template);
Flat9SuperSecretPageTemplate.html = () => `<section id="section">
  <form id="login" class="">
    <h2>Log into Mainframe</h2>
    <label for="username">
      <span>Enter Username</span>
      <input
        type="text"
        name="username"
        title="Enter Your Username"
        minlength="2"
        maxlength="100"
        id="username"
        required
      />
    </label>
    <div class="grid">
      <button type="submit" class="primary">Login</button>
      <button type="button" id="cancel" class="secondary">Cancel</button>
    </div>
  </form>
  <div id="messenger" class="hidden"><flat9-secret-messenger></flat9-secret-messenger></div>
  </section>`;
Flat9SuperSecretPageTemplate.css = () => `<style>
  :host {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
  }
  section {
    height: 100vh;
    width: 100vw;
    background: var(--gray-80);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  #messenger.hidden {
    display: none;
  }

  form {
    display: flex;
    flex-flow: column nowrap;
    align-items: flex-end;
    max-width: 32rem;
  }

  form.hidden {
    display: none;
  }

  h2 {
    font-size: var(--lg-font);
    color: var(--gray-30);
    max-width: 50vw;
    line-height: var(--lg-line-height);
    letter-spacing: var(--lg-letter-spacing);
    margin-top: 0;
  }

  label {
    color: var(--gray-50);
    display: flex;
    flex-flow: column nowrap;
    width: 100%;
  }

  input {
    padding: calc(var(--base-unit) * 2);
    border: 2px solid transparent;
    border-radius: var(--sm-radius);
    background: var(--gray-60);
    outline: none;
    color: var(--gray-10);
    font-size: var(--base-font);
    font-family: var(--body-font-family);
  }

  input:focus, input:hover {
    border-color: var(--gray-50);
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--base-spacing);
    width: 100%;
  }

  button {
    margin-top: var(--base-spacing);
    padding: calc(var(--base-unit) * 2) var(--md-spacing);
    border: none;
    color: var(--gray-10);
    font-weight: 600;
    font-size: var(--base-font);
    font-family: var(--heading-font-family);
    cursor: pointer;
    width: 100%;
    outline: none;
  }

  button:first-of-type {
    margin-left: auto;
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

export default class Flat9SuperSecretPage extends HTMLElement {
  template = Flat9SuperSecretPageTemplate;
  #scriptLoaded = false;

  constructor() {
    super();
    this.init();
    this.style.display = "none";

    eventBus.addEventListener("super-secret-init", async () => {
      if (!this.#scriptLoaded) {
        const res = await this.loadScript({
          src: "https://cdn.socket.io/3.1.3/socket.io.min.js",
          integrity:
            "sha384-cPwlPLvBTa3sKAgddT6krw0cJat7egBga3DJepJyrLl4Q9/5WLra3rrnMcyTyOnh",
        });
        if (res.ok) {
          this.#scriptLoaded = true;
          this.initSocket();
        } else {
          return;
        }
      } else if (this.#scriptLoaded) {
        this.initSocket();
      }

      this.show();
      this.dom.cancel.addEventListener("click", () => this.hide());
      this.dom.login.addEventListener("submit", event => {
        event.preventDefault();
        const formData = Object.fromEntries([...new FormData(this.dom.login)]);
        this.socket.emit("created", JSON.stringify(formData));
      });
    });
  }

  hide() {
    this.style.display = "none";
    document.body.classList.remove("hide-y");
  }

  show() {
    this.style.display = "block";
    document.body.classList.add("hide-y");
  }

  initSocket() {
    this.socket = io(config.SECRET_ENDPOINT, {
      withCredentials: true,
      extraHeaders: {
        "my-secret-header": "ilovecats",
      },
    });

    this.socket.on("messages", messages => {
      messages.forEach(message => this.messenger.addMessage(message));
    });

    this.socket.on("message", message => {
      this.messenger.addMessage(message);
    });

    this.socket.on("error", data => console.log(data));

    this.socket.on("created", data => {
      localStorage.setItem("user", JSON.stringify(data));
      this.messenger = new Flat9SecretMessenger(data);
      eventBus.addEventListener("logoff", () => {
        this.socket.emit("logoff", localStorage.getItem("user"));
        localStorage.clear();
        this.dom.messenger.classList.add("hidden");
        this.dom.login.classList.remove("hidden");
        this.hide();
      });
      eventBus.addEventListener("send-message", ({ detail }) => {
        this.socket.emit("message", JSON.stringify(detail));
      });
      this.dom.messenger.appendChild(this.messenger);
      this.dom.messenger.classList.remove("hidden");
      this.dom.login.classList.add("hidden");
    });
  }
}

initComponent("super-secret-page", Flat9SuperSecretPage, withAsyncScript());
