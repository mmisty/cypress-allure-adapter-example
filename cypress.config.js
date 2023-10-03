const { defineConfig } = require("cypress");
const { configureAllureAdapterPlugins } = require("@mmisty/cypress-allure-adapter/plugins");

module.exports = defineConfig({
  e2e: {
    env: {
      // can use allure env var here or from cmd line by
      // `npx cypress run --env allure=true` or `CYPRESS_allure=true npx cypress run`
      // allure: true,
      allureCleanResults: true,
      allureSkipCommands: 'wrap',
      allureResults: 'allure-results',
      // when using Allure TestOps:
      // allureResultsWatchPath: 'allure-results/watch'
    },
    video: true,
    specPattern: 'cypress/e2e/**/*.cy.js',
    setupNodeEvents(on, config) {
      configureAllureAdapterPlugins(on, config);
      
      console.log(' === ENVIRONMENT:');
      console.log(config.env);
      console.log(' === ');
      
      // important to return config
      return config;
    },
  },
});
