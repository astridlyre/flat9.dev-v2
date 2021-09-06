import { Template } from "../../utils.js";

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
  <div id="messenger" class=""></div>
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
    padding: var(--base-spacing);
    box-sizing: border-box;
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
    line-height: var(--lg-line-height);
    letter-spacing: var(--lg-letter-spacing);
    margin-top: 0;
  }

  @media screen and (min-width: 901px) {
    h2 {
      max-width: 50vw;
    }
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

export default Flat9SuperSecretPageTemplate;
