import { When, Then, Given, After, Before } from '@badeball/cypress-cucumber-preprocessor';

Given('I log message {string}', (text) => {
  cy.log(text);
});

When('I visit site', () => {
  cy.log('visit site');
});

Then('I should see a search bar {string}', (text) => {
  cy.log(text);
});

Then('This step should fail', () => {
  cy.wrap({ a: 1 }).then(t => {
    expect(t).eq(2);
  });
});

Before({tags: '@fail-before'}, () => {
  expect(true, 'failed in after hook').to.be.false;
});

After({tags: '@fail-after'}, () => {
  expect(true, 'failed in after hook').to.be.false;
});
