import { visitHtml } from "../../support/helper";

describe('before hook', () => {
  Cypress.Allure.on('test:started', () => {
    Cypress.Allure.epic('hooks');
    Cypress.Allure.feature('before');
  });
  
  before('setup app', () => {
    cy.log('setup step before all tests in suite');
  });
  
  beforeEach(() => {
    visitHtml();
  });
  
  it('0301 should get surname', () => {
    cy.get('[data-test-id="data-surname-section"]')
      .should('exist')
      .should('contain.text', 'family name');
  });
  
  it('0302 should get name', () => {
    cy.get('[data-test-id="data-name-section"] input')
      .should('exist')
      .should('have.attr', 'placeholder', 'name');
  })
})