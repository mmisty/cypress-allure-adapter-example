import { configureAllureAdapterPlugins } from "@mmisty/cypress-allure-adapter/plugins";
import { defineConfig } from "cypress";

module.exports = defineConfig({
  e2e: {
    defaultCommandTimeout: 1500,
    video: true,
    specPattern: 'cypress/e2e/**/*.cy.ts',
    env: {
      // can use allure env var here or from cmd line by
      // `npx cypress run --env allure=true` or `CYPRESS_allure=true npx cypress run`
      allure: true,
      // allureCleanResults: true,
      allureSkipCommands: 'wrap',
      allureResults: '../../allure-results',
      // when using Allure TestOps:
      // allureResultsWatchPath: 'allure-results/watch'
    },
    setupNodeEvents(on, config) {
      const reporter = configureAllureAdapterPlugins(on, config);
      
      console.log(' === ENVIRONMENT:');
      console.log(config.env);
      console.log(' === ');
  
      // this is to write categories and environment information
      // delete if you don't need it
      on('before:run', details => {
        reporter?.writeEnvironmentInfo({
          info: {
            os: details.system.osName,
            osVersion: details.system.osVersion,
            browser: details.browser?.displayName + ' ' + details.browser?.version,
            ...config.env
          },
        });
  
         reporter?.writeCategoriesDefinitions({ categories: './allure-error-categories.json' });
      });
      
      
      // important to return config
      return config;
    },
  },
});
