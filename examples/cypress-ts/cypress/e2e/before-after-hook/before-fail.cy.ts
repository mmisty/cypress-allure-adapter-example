import { visitHtml } from '../../support/helper';

describe('before hook failure', () => {
  Cypress.Allure.on('test:started', () => {
    Cypress.Allure.epic('hooks');
    Cypress.Allure.feature('before');
  });

  before('setup app', () => {
    cy.log('setup step before all tests in suite');
    cy.throw('Fail in before hook');
  });

  beforeEach(() => {
    visitHtml();
  });

  it('0401 should get surname', () => {
    cy.get('[data-test-id="data-surname-section"]').should('exist').should('contain.text', 'family name');
  });

  it('0402 should get name', () => {
    cy.get('[data-test-id="data-name-section"] input')
      .should('exist')
      .should('have.attr', 'placeholder', 'name');
  });
});
