import { visitHtml } from "../support/helper";

describe('retries', { retries: 2 }, () => {
  Cypress.Allure.on('test:started', () => {
    Cypress.Allure.epic('retries');
  });
  
  beforeEach(() => {
    visitHtml();
  });
  
  it('0801 should have pass after fail', () => {
    cy.allure().tag('@retries');
    if(Cypress.currentRetry < 1){
      cy.throw('Fail in test - on purpose');
    }
    cy.get('[data-test-id="data-name-section"] input')
      .should('exist')
      .should('have.attr', 'placeholder', 'name');
  });
  
})