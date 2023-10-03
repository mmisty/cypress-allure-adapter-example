describe('login', () => {
  beforeEach('visit app', ()=> {
    cy.log('visit app step');
  })
  
  it('01. should login', () => {
    //... test code
  })
  
  describe('err on login',  () => {
    it('02. should have error on login', () => {
      //... test code
    })
    
    it('03. should do smth', () => {
      cy.allure().startStep('my step');
      cy.wrap(null).then(() => {
        throw new Error('Error on purpose')
      })
      cy.allure().endStep();
    })
  })
})