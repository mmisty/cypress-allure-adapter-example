import { visitHtml } from '../../support/helper';

describe('interface', () => {
  describe('status', () => {
    Cypress.Allure.on('test:started', () => {
      Cypress.Allure.epic('interface');
      Cypress.Allure.feature('status');
    });

    beforeEach(() => {
      visitHtml();
    });

    it('0701 should have status broken', () => {
      cy.get('[data-test-id="data-surname-section"]').should('exist').should('contain.text', 'family name');

      cy.allure().testStatus('broken', { message: 'this has broken since this test should be reviewed' });
    });

    it('0702 should have status skipped', () => {
      cy.get('[data-test-id="data-name-section"] input')
        .should('exist')
        .should('have.attr', 'placeholder', 'name');
      cy.allure().testStatus('skipped', { message: 'this has skipped since this test should be reviewed' });
    });
  });
});
