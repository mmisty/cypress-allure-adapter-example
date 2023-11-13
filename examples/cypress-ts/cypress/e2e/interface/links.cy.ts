import { visitHtml } from "../../support/helper";

it('0601 should have tags for root', { tags: [ '@test("hello")'] }, function() {
  console.log(this.test)
  cy.log(`${this.test?.tags?.map(t => t.tag)}`);
});

describe('interface @interfaceTag', {retries: 2}, () => {
  describe('links @tagTitle', { tags: ['@ff'] },() => {
    Cypress.Allure.on('test:started', ()=> {
      Cypress.Allure.epic('interface');
      Cypress.Allure.feature('links');
    });
    
    beforeEach(() => {
      visitHtml();
    });
    
    it('0601 should have link issue', { tags: [ '@test("hello")'] }, function() {
      console.log(this.test)
      cy.log(`${this.test?.tags?.map(t => t.tag)}`);
      cy.allure().issue('http://jira.com/ABC-123');
      cy.get('[data-test-id="data-surname-section"]')
        .should('exist')
        .should('contain.text', 'family name');
    });
    
    it('0601 should have tags on retry', { tags: [ '@test("hello")'] }, function() {
      console.log(this.test)
      cy.log(`${this.test?.tags?.map(t => t.tag)}`);
      cy.wrap(null).then(()=> {
        throw Error('purpose');
      })
    });
    
    // it('0602 should have link tms', () => {
    //   cy.allure().tms('http://jira.com/ABC-123');
    //   cy.get('[data-test-id="data-name-section"] input')
    //     .should('exist')
    //     .should('have.attr', 'placeholder', 'name');
    // });
    //
    // it('0603 should have link for failed test @myLink("hello")', {
    //   tags: [
    //     '@issue123("desc 123")',
    //     '@issue124()',
    //     '@tms("456","desc 456")',
    //     '@tms("457")',
    //     '@link("http://url.com/345","description 345")'
    //   ]}, function() {
    //   // grep - duplicate tags with diff info keep
    //   console.log(this.test.tags);
    //   this.test.tags.forEach(t=> {
    //     console.log(t);
    //     if(t.tag.startsWith( '@issue')){
    //       const issueKey = t.tag.replace('@issue', '');
    //       Cypress.Allure.issue(issueKey, ...t.info);
    //     }
    //
    //     if(t.tag.startsWith( '@tms')){
    //       const issueKey = t.tag.replace('@tms', '');
    //       Cypress.Allure.tms(issueKey, ...t.info);
    //     }
    //
    //     if(t.tag.startsWith('@link')){
    //       Cypress.Allure.link(...t.info);
    //     }
    //   })
    //   // cy.allure().link('http://jira.com/ABC-123', 'ABC-123 description', 'issue');
    //   cy.get('[data-test-id="data-name-section"] input')
    //     .should('exist')
    //     .should('have.attr', 'placeholder', 'name');
    //
    //   cy.throw('Fail in test - on purpose');
    //
    // });
  })
})