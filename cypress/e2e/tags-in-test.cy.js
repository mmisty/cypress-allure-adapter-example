describe('Example using tags in test', { retries: 1 },() => {
  
  beforeEach(function() {
    // can do something here depending on tests tag
    cy.log('Tags:'  + JSON.stringify(this.currentTest?.tags.map(t => t.tag + (t.info.length!==0 ?  `: ${t.info}` : ''))));
    
    if(this.currentTest && this.currentTest.tags.some(t=>t.tag === '@skip')){
      this.skip();
    }
  })
  
  it('passes @tagWithInfo("some info")', () => {
    cy.visit('https://example.cypress.io')
  })
  
  it('test to skip', { tags: '@skip("not implemented")' },() => {
    throw new Error('Not implemented yet');
  })
})