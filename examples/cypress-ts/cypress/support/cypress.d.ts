declare namespace Cypress {
  interface Chainable {
    qaId(selector: string): Chainable<JQuery>;
    throw(message: string): Chainable<void>;
  }
}
