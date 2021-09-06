import { v4 as uuidv4 } from "uuid";

export default class User {
  #name;
  #id;
  constructor({ username }) {
    this.#id = uuidv4();
    this.#name = username;
  }

  get username() {
    return this.#name;
  }

  get id() {
    return this.#id;
  }

  toJSON() {
    return {
      username: this.#name,
      id: this.#id,
    };
  }

  toString() {
    return `${this.#name}`;
  }
}
