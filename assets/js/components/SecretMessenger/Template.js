import { Template } from "../../utils.js";

const Flat9SecretMessengerTemplate = Object.create(Template);

Flat9SecretMessengerTemplate.html = props => `<header id="header">
      <h4>Mainframe Encrypted HyperText Communiqué</h4><span id="user">${props.username}</span>
    </header>
    <ul id="users"></ul>
    <ul id="messages"></ul>
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

  ul::-webkit-scrollbar {
    width: 10px;
  }

  ul::-webkit-scrollbar-track {
    background: var(--gray-70);
  }

  ul::-webkit-scrollbar-thumb {
    background: var(--gray-50);
    border-radius: 20px;
    border: 2px solid var(--gray-70);
  }

  ul {
    scrollbar-width: thin;
    scrollbar-color: var(--gray-50) var(--gray-70);
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
    box-sizing: border-box;
  }

  h4 {
    font-size: var(--sm-font);
    color: var(--gray-50);
    margin: 0;
  }

  #users {
    position: fixed;
    top: 6rem;
    left: 0;
    width: 12rem;
    bottom: 6rem;
    background-color: var(--gray-90);
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    list-style: none;
    display: flex;
    flex-flow: column nowrap;
    gap: 2px;
    overflow-y: scroll;
  } 

  #users .user {
    padding: var(--base-unit);
    background-color: var(--gray-85);
    color: var(--gray-30);
    font-weight: 600;
  }

  #user {
    padding: var(--base-unit);
    border-radius: var(--sm-radius);
    color: var(--gray-10);
    font-weight: 600;
    background-color: var(--gray-70);
  }

  #messages {
    position: fixed;
    top: 6rem;
    left: 12rem;
    bottom: 6rem;
    right: 0;
    margin: 0;
    padding: var(--base-spacing);
    padding-bottom: var(--md-spacing);
    display: flex;
    flex-flow: column nowrap;
    gap: var(--base-unit);
    overflow-y: scroll;
    list-style: none;
    box-sizing: border-box;
    background-color: var(--gray-90);
  }

  #messages li {
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
  }

  #messages li.user {
    align-items: flex-end;
  }

  #messages li.user .content {
    flex-flow: row-reverse nowrap;
    align-items: flex-end;
  }

  #messages .content {
    display: flex;
    align-items: flex-start;
    gap: var(--base-spacing);
  }

  #messages li span.message {
    background-color: var(--gray-70);
    border-radius: var(--sm-radius);
    color: var(--gray-10);
    padding: var(--base-unit);
  }

  #messages li span.username {
    color: var(--gray-30);
    font-weight: 600;
    padding: var(--base-unit);
  }

  #messages li span.time {
    color: var(--gray-60);
    font-size: var(--tiny-font);
  }

  #send {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 6rem;
    border-top: 2px solid var(--gray-70);
    padding: var(--base-spacing);
    margin: 0;
    box-sizing: border-box;
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

export default Flat9SecretMessengerTemplate;
