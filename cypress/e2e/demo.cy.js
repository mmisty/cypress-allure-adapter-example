describe('demo spec @suiteTag', { retries: 1 },() => {
  const moreTags = [0,1,2].map(t=>`@p${t}`);
  
  it('01. should do smth @P1', () => {
    cy.log('P1 test')
  })
  
  it('02. should do more', { tags: ['@P2'] },function () {
    cy.log('P2 test')
  });
  
  it('03. should select test with dynamic tags', { tags: moreTags },function () {
    cy.log('moreTags variable - test with @P0, @P1 and @P2 tags');
  });
})

