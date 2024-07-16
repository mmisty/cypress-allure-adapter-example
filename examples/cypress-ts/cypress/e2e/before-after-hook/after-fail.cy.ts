import { visitHtml } from '../../support/helper';

describe('after hook failure', () => {
  Cypress.Allure.on('test:started', () => {
    Cypress.Allure.epic('hooks');
    Cypress.Allure.feature('after');
  });

  after('teardown app', () => {
    cy.log('setup step after all tests in suite');
    cy.wrap(null).then(() => {
      throw new Error('Fail in after hook');
    });
  });

  beforeEach(() => {
    visitHtml();
  });

  it('0201 should get surname', () => {
    cy.get('[data-test-id="data-surname-section"]').should('exist').should('contain.text', 'family name');
  });

  it('0202 should get name', () => {
    cy.get('[data-test-id="data-name-section"] input')
      .should('exist')
      .should('have.attr', 'placeholder', 'name');
  });
});
