import { visitHtml } from "../../support/helper";

describe('after hook', () => {
  Cypress.Allure.on('test:started', () => {
    Cypress.Allure.epic('hooks');
    Cypress.Allure.feature('after');
  });
  
  after('teardown app', () => {
    cy.log('teardown step after all tests in suite');
  });
  
  beforeEach(() => {
    visitHtml();
  });
  
  it('0101 should get surname', () => {
    cy.get('[data-test-id="data-surname-section"]')
      .should('exist')
      .should('contain.text', 'family name');
  });
  
  it('0102 should get name', () => {
    cy.get('[data-test-id="data-name-section"] input')
      .should('exist')
      .should('have.attr', 'placeholder', 'name');
  })
})