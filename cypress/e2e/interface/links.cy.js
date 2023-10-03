import { visitHtml } from "../../support/helper";

describe('interface', () => {
  describe('links', () => {
    Cypress.Allure.on('test:started', ()=> {
      Cypress.Allure.epic('interface');
      Cypress.Allure.feature('links');
    });
    
    beforeEach(() => {
      visitHtml();
    });
    
    it('0601 should have link issue', () => {
      cy.allure().issue('http://jira.com/ABC-123');
      cy.get('[data-test-id="data-surname-section"]')
        .should('exist')
        .should('contain.text', 'family name');
    });
    
    it('0602 should have link tms', () => {
      cy.allure().tms('http://jira.com/ABC-123');
      cy.get('[data-test-id="data-name-section"] input')
        .should('exist')
        .should('have.attr', 'placeholder', 'name');
    });
    
    it('0603 should have link for failed test', () => {
      cy.allure().link('http://jira.com/ABC-123', 'ABC-123 description', 'issue');
      cy.get('[data-test-id="data-name-section"] input')
        .should('exist')
        .should('have.attr', 'placeholder', 'name');
  
      cy.throw('Fail in test - on purpose');
      
    });
  })
})