declare namespace Cypress {
  interface Chainable<Subject = any> {
    qaId(selector: string): Chainable<JQuery>;
    throw(message: string): Chainable<void>;
  }
}
