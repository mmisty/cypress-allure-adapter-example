const { defineConfig } = require("cypress");
const { configureAllureAdapterPlugins } = require("@mmisty/cypress-allure-adapter/plugins");
const {Status} = require("@mmisty/cypress-allure-adapter/plugins/allure-types");

module.exports = defineConfig({
  e2e: {
    env: {
      // can use allure env var here or from cmd line by
      // `npx cypress run --env allure=true` or `CYPRESS_allure=true npx cypress run`
      allure: true,
      allureCleanResults: true,
      allureSkipCommands: 'wrap',
      allureResults: 'allure-results',
      // when using Allure TestOps:
      // allureResultsWatchPath: 'allure-results/watch'
    },
    defaultCommandTimeout: 1500,
    video: true,
    specPattern: 'cypress/e2e/**/*.cy.js',
    setupNodeEvents(on, config) {
      const reporter = configureAllureAdapterPlugins(on, config);
      
      console.log(' === ENVIRONMENT:');
      console.log(config.env);
      console.log(' === ');
  
      on('before:run', details => {
        reporter?.writeEnvironmentInfo({
          info: {
            os: details.system.osName,
            osVersion: details.system.osVersion,
            ...config.env
          },
        });
        reporter?.writeCategoriesDefinitions({
          categories: [
            {
              name: 'Errors on purpose',
              messageRegex: '.*purpose.*'
            },
            {
              name: 'Tests to review',
              messageRegex: '.*should be reviewed.*'
            }
          ]
        })
      });
      
      
      // important to return config
      return config;
    },
  },
});
