import { visitHtml } from "../../support/helper";

describe('commands', () => {
  describe('other', () => {
    Cypress.Allure.on('test:started', ()=> {
      Cypress.Allure.epic('interface');
      Cypress.Allure.feature('status');
    });
    
    beforeEach(() => {
      visitHtml();
    });
    
    it('0901 should have other fields', () => {
      cy.allure().severity('critical');
      cy.allure().owner('TP');
      cy.allure().lead('AP');
      cy.allure().addDescriptionHtml('<b>test description line 1</br></b>');
      cy.allure().addDescriptionHtml('<b>test description line 2</br></b>');
      cy.allure().parameter('var A', 'value of A');
      cy.allure().allureId('TCID1');
      cy.allure().browser('Chrome');
      cy.allure().device('Device MAc');
      cy.allure().language('javascript');
      cy.allure().layer('E2E');
      cy.allure().os('MAC OS');
      cy.allure().testDetails({message: 'This is updated status message for test'});
      cy.allure().attachment('hello.json',  JSON.stringify({a: 'hello world'}), 'application/json');
      cy.allure().fileAttachment('other.cy.js', __filename, 'text/plain');
    });
  })
})