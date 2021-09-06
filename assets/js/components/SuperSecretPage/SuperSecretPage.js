import { initComponent, eventBus, withAsyncScript } from "../../utils.js";
import Flat9SuperSecretPageTemplate from "./Template.js";
import Flat9SecretMessenger from "../SecretMessenger/SecretMessenger.js";
import config from "../../config.js";

let scriptLoaded = false;

export default class Flat9SuperSecretPage extends HTMLElement {
  template = Flat9SuperSecretPageTemplate;
  messenger = null;
  socket = null;

  constructor() {
    super();
    this.init();

    if (!scriptLoaded) {
      this.loadScript({
        src: "https://cdn.socket.io/3.1.3/socket.io.min.js",
        integrity:
          "sha384-cPwlPLvBTa3sKAgddT6krw0cJat7egBga3DJepJyrLl4Q9/5WLra3rrnMcyTyOnh",
      }).then(res => {
        if (res.ok || res.loaded === true) {
          scriptLoaded = true;
        }
        this.load();
      });
    } else this.load();
  }

  load() {
    this.initSocket();
    requestAnimationFrame(() => document.body.classList.add("hide-y"));

    this.dom.cancel.addEventListener("click", () => this.hide(), {
      once: true,
    });

    this.dom.login.addEventListener(
      "submit",
      event => {
        event.preventDefault();
        this.socket.emit(
          "login",
          JSON.stringify(Object.fromEntries([...new FormData(this.dom.login)]))
        );
        this.dom.login.reset();
      },
      { once: true }
    );
  }

  hide() {
    requestAnimationFrame(() => {
      document.body.classList.remove("hide-y");
      this.dom.messenger.textContent = "";
      this.messenger = null;
      this.dispatchEvent(new CustomEvent("destroy"));
    });
  }

  initSocket() {
    this.socket = io(config.SECRET_ENDPOINT, {
      withCredentials: true,
      extraHeaders: {
        "my-secret-header": "ilovecats",
      },
    });

    this.socket.on("created", data => {
      localStorage.setItem("user", JSON.stringify(data));
      this.messenger = new Flat9SecretMessenger(data);
      this.dom.messenger.appendChild(this.messenger);
      this.dom.login.classList.add("hidden");
    });

    this.socket.on("error", data => console.error(data));

    this.socket.on("messages", messages =>
      this.messenger.addMessages(messages)
    );

    this.socket.on("message", message => this.messenger.addMessage(message));

    eventBus.addEventListener("logoff", () => {
      this.socket.emit("logoff", localStorage.getItem("user"));
      this.socket.disconnect();
      localStorage.removeItem("user");
      this.hide();
    });

    eventBus.addEventListener("send-message", ({ detail }) => {
      this.socket.emit("message", JSON.stringify(detail));
    });
  }
}

initComponent("super-secret-page", Flat9SuperSecretPage, withAsyncScript());