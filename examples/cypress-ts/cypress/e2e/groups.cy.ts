describe('groups', () => {
  it('session command', () => {
    Cypress.session.clearAllSavedSessions();

    cy.log('first step');
    cy.session('user123', () => {
      cy.log('1');
      cy.setCookie('A', 'AAA');
      cy.log('last session step');
    });

    cy.log('next step 2');
  });
});
