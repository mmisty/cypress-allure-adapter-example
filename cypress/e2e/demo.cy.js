describe('demo spec', { retries: 1 },() => {
  
  it('01. should do smth', () => {
    cy.log('P1 test')
  })
  
  it('02. should do more', function () {
    cy.log('P2 test')
  });
  
})

