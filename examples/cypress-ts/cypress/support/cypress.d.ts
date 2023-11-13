declare namespace Cypress {
  interface Chainable<S> {
    qaId(selector: string): Chainable<JQuery>;
    throw(message: string): Chainable<void>;
  }
}
