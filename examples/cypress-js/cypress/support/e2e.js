// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************
//impiort cypress allure adapter first to have all custom
// commands being collapsed in report as parent command
import '@mmisty/cypress-allure-adapter/support';

// Import commands.js using ES2015 syntax:
import './commands';

/**
 * This is needed only if you want to change parent suite, otherwise delete
 * @param test
 * @param parentSuite - name of parent suite
 */
const addSuiteLabels = (test, parentSuite) => {
  const title = test.titlePath();
  
  if (title.length >= 1){
   // test, no suite
    Cypress.Allure.parentSuite(parentSuite);
  }
  
  if (title.length >= 2){
    // suite + test
    const parent = title[0];
    Cypress.Allure.suite(parent);
  }
  
  if (title.length === 3 ) {
    // suite + subsuite + test
    const suite = title[1];
    Cypress.Allure.subSuite(suite);
  }
  
  if (title.length >= 4) {
    // suite + subsuite + (...) +  test
    const suite = title[1];
    const subSuite = title[2];
    Cypress.Allure.subSuite(suite + (' -> ' + subSuite));
  }
}

// example adding host and thread to see in timeline
Cypress.Allure?.on('test:started', (test) => {
  Cypress.Allure.host('my-host');
  Cypress.Allure.thread(Cypress.env('thread') ?? '01');
  Cypress.Allure.fullName(`cypress-js ${test.fullTitle()}`);
  addSuiteLabels(test, 'cypress-js');
})
