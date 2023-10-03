import { visitHtml } from "../support/helper";

describe('simple fail',  () => {
  Cypress.Allure.on('test:started', () => {
    Cypress.Allure.epic('basic');
  });
  
  beforeEach(() => {
    visitHtml();
  });
  
  it('1101 should have screenshot and video for test when failure', () => {
    cy.allure().tag('@smoke')
    cy.get('[data-test-id="data-name-section"] input')
      .should('exist')
      .should('have.attr', 'placeholder', 'name');
    cy.throw('Fail in test - on purpose');
  });
  
})