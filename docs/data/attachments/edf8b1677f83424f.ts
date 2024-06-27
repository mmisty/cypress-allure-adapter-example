import { visitHtml } from "../support/helper";
import { basename } from "@mmisty/cypress-allure-adapter/common";

describe('commands', () => {
  describe('custom commands', () => {
    Cypress.Allure.on('test:started', ()=> {
      Cypress.Allure.epic('interface');
      Cypress.Allure.feature('status');
    });
    
    Cypress.Allure.on('test:ended', ()=> {
      Cypress.Allure.fileAttachment('test-file-' + basename(__filename), __filename, 'text/plain');
    });
    
    beforeEach(() => {
      visitHtml();
    });
    
    it('0901 should have custom commands wrapped', () => {
      cy.qaId('data-name-section').should('exist');
      cy.qaId('data-surname-section').should('exist');
      cy.qaId('data-submit-section').should('exist').click();
    });
  })
})