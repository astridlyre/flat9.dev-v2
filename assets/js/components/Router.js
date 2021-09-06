import { eventBus } from "../utils.js";
import { defaultAnimationTiming, fadeIn } from "../animations.js";

const cache = new Map();

export default class Flat9Router extends HTMLElement {
  #currentPage;
  #pushState = true; // keep track of whether to change history state
  #worker;
  #page = window.location.href;

  connectedCallback() {
    this.#worker = new Worker("/assets/js/components/RouterCacheWorker.js");
    this.#currentPage = this.querySelector("#main-content");
    document.querySelector(".lds-grid").classList.add("hidden");
    this.#currentPage.classList.remove("hidden");

    window.addEventListener("popstate", () => {
      if (window.location.href === this.#page) return;
      this.#pushState = false;
      this.#navigate(window.location.href);
    });

    eventBus.addEventListener(
      "preload-mounted",
      ({ detail }) =>
        !this.cached(detail) && this.#worker.postMessage({ url: detail })
    );

    eventBus.addEventListener(Flat9Router.NAVIGATION_REQUEST, ({ detail }) => {
      this.#pushState = true;
      this.#navigate(detail);
    });

    this.#worker.onmessage = ({ data }) =>
      data.ok
        ? cache.set(data.url, data.text)
        : eventBus.dispatchEvent(
            new CustomEvent(Flat9Router.NAVIGATION_FAILURE, {
              detail: {
                message: "Navigation failed",
                error: null,
              },
            })
          );
  }

  cached(url) {
    return cache.get(url);
  }

  #navigate(href) {
    this.#pushState && history.pushState(null, null, href);
    this.#page = window.location.href;
    this.changePage();
  }

  async loadPage(url, cached = cache.get(url)) {
    try {
      if (cached) return cached;
      const res = await fetch(url, {
        method: "GET",
      });
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const text = await res.text();
      cache.set(url, text);
      return text;
    } catch (error) {
      cache.delete(url);
      eventBus.dispatchEvent(
        new CustomEvent(Flat9Router.NAVIGATION_FAILURE, {
          detail: {
            message: `Failed to navigate to ${url}`,
            error,
          },
        })
      );
    }
  }

  async changePage() {
    try {
      const res = await this.loadPage(window.location.href);
      const { newContent, title } = this.extractContent(res);
      document.title = title;
      requestAnimationFrame(() => {
        this.replaceChild(newContent, this.#currentPage);
        newContent.classList.remove("hidden");
        newContent.animate(fadeIn, defaultAnimationTiming);
        this.notifyChanged(newContent);
      });
    } catch (error) {
      eventBus.dispatchEvent(
        new CustomEvent(Flat9Router.NAVIGATION_FAILURE, {
          detail: {
            message: `Oops! Network error: ${error.message}`,
            error,
          },
        })
      );
      history.back();
    }
  }

  extractContent(res, wrapper = document.createElement("div")) {
    wrapper.innerHTML = res;
    const newContent = wrapper.querySelector("#main-content");
    if (!newContent) throw new Error("Prefetch failed");
    return {
      wrapper,
      newContent,
      title: newContent.getAttribute("page-title"),
    };
  }

  notifyChanged(newContent) {
    this.#currentPage = newContent;
    eventBus.dispatchEvent(new CustomEvent(Flat9Router.NAVIGATED_EVENT));
    return window.scrollTo({ top: 0 });
  }

  static navigate(url) {
    if (url === window.location.href) return;
    eventBus.dispatchEvent(
      new CustomEvent(Flat9Router.NAVIGATION_REQUEST, {
        detail: url,
      })
    );
  }

  static get NAVIGATED_EVENT() {
    return "router-navigated";
  }

  static get NAVIGATION_FAILURE() {
    return "navigation-failure";
  }

  static get NAVIGATION_REQUEST() {
    return "navigation-request";
  }
}

customElements.get("flat9-router") ||
  customElements.define("flat9-router", Flat9Router);
