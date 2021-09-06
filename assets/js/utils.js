export function setAttributes(target, attrs) {
  return Object.entries(attrs).forEach(([key, value]) =>
    target.setAttribute(key, value)
  );
}

export function withTemplate() {
  return {
    init(props) {
      this.attachShadow({ mode: "open" });
      this.render(props);
    },
    render(props) {
      this.shadowRoot.innerHTML = this.template.render(props);
      this.dom = this.template.mapDOM(this.shadowRoot);
    },
  };
}

export const Template = {
  render(props) {
    return `${this.html(props)}${this.css(props)}`;
  },
  mapDOM(scope) {
    // maps nodes with id
    const getChildren = node =>
      node.hasChildNodes()
        ? [node].concat([...node.children].map(getChildren))
        : node;
    return getChildren(scope)
      .flat(Infinity)
      .filter(
        child =>
          typeof child.hasAttribute === "function" && child.hasAttribute("id")
      )
      .reduce((acc, child) => ({ ...acc, [child.id]: child }), {});
  },
};

export function initComponent(name, component, ...mixins) {
  Object.assign(component.prototype, withTemplate(), ...mixins);
  customElements.get(`flat9-${name}`) ||
    customElements.define(`flat9-${name}`, component);
}

class EventBus {
  #listeners;
  constructor() {
    this.#listeners = new Map();
  }

  addEventListener(event, callback) {
    this.#listeners.set(
      event,
      (this.#listeners.get(event) || new Set()).add(callback)
    );
  }

  dispatchEvent(customEvent) {
    this.#listeners
      .get(customEvent.type)
      ?.forEach(callback => callback(customEvent));
  }
}

// Event bus singleton
export const eventBus = new EventBus();

// Mixin to asyncronously load a SDK script file
export function withAsyncScript() {
  let loaded = false;
  return {
    async loadScript({
      src,
      type = "text/javascript",
      async = true,
      integrity,
    }) {
      return loaded
        ? await Promise.resolve({ ok: true, loaded })
        : await new Promise((resolve, reject) => {
            this.scriptElement = document.createElement("script");
            setAttributes(this.scriptElement, {
              src,
              async,
              type,
              integrity,
              crossorigin: "anonymous",
            });
            document.head.appendChild(this.scriptElement);
            this.scriptElement.addEventListener("load", () => {
              resolve({ ok: true, loaded });
              loaded = true;
            });
            this.scriptElement.addEventListener("error", () =>
              reject({
                error: `Error loading script from ${src}`,
              })
            );
          }).catch(e => {
            console.log(e);
            eventBus.dispatchEvent(
              new CustomEvent("error", {
                default: `Script loading failed: ${e}`,
              })
            );
          });
    },
  };
}
