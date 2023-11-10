import { visitHtml } from "../../support/helper";

describe('interface', () => {
  describe('tags', () => {
    Cypress.Allure.on('test:started', ()=> {
      Cypress.Allure.epic('interface');
      Cypress.Allure.feature('tags');
    });
    
    beforeEach(() => {
      visitHtml();
    });
    
    it('0501 should have tag1', () => {
      cy.allure().tag('@showCaseTag1');
      cy.get('[data-test-id="data-surname-section"]')
        .should('exist')
        .should('contain.text', 'family name');
    });
    
    it('0502 should have tag2', () => {
      cy.allure().tag('@showCaseTag2');
      cy.get('[data-test-id="data-name-section"] input')
        .should('exist')
        .should('have.attr', 'placeholder', 'name');
    });
    
    it('0503 should have tag for failed test', () => {
      cy.allure().tag('@showCaseTag2');
      cy.get('[data-test-id="data-name-section"] input')
        .should('exist')
        .should('have.attr', 'placeholder', 'name');
  
      cy.throw('Fail in test - on purpose');
    });
  })
})