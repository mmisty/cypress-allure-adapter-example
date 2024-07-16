import { visitHtml } from '../../support/helper';

describe('interface', () => {
  describe('steps', () => {
    Cypress.Allure.on('test:started', () => {
      Cypress.Allure.epic('interface');
      Cypress.Allure.feature('steps');
    });

    before(() => {
      cy.allure().startStep('setup application in before hook');
      cy.log('here goes setup');
      cy.allure().endStep();
    });

    beforeEach(() => {
      cy.allure().startStep('visit app');
      visitHtml();
      cy.allure().endStep();
    });

    it('1001 should have steps', () => {
      cy.allure().startStep('check surname');
      cy.get('[data-test-id="data-surname-section"]').should('exist').should('contain.text', 'family name');
      cy.allure().endStep();
      cy.allure().step('one more step');
    });
  });
});
