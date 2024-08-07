const { defineConfig } = require("cypress");
const { readFileSync } = require("fs");
const { configureAllureAdapterPlugins } = require("@mmisty/cypress-allure-adapter/plugins");

const packageVersion = (packagename)=> {
  try {
    const versions = JSON.parse(readFileSync('package-lock.json'));
    return versions['packages']?.[`node_modules/${packagename}`]?.['version'];
  }
  catch (e){
    return 'could not get allure adapter version'
  }
}

module.exports = defineConfig({
  e2e: {
    defaultCommandTimeout: 1500,
    video: true,
    specPattern: 'cypress/e2e/**/*.cy.js',
    env: {
      // can use allure env var here or from cmd line by
      // `npx cypress run --env allure=true` or `CYPRESS_allure=true npx cypress run`
      allure: true,
      // allureCleanResults: true,
      allureSkipCommands: 'wrap',
      allureResults: 'allure-results',
      // when using Allure TestOps:
      // allureResultsWatchPath: 'allure-results/watch'
      allureAddBodiesToRequests: '*'
    },
    setupNodeEvents(on, config) {
      const reporter = configureAllureAdapterPlugins(on, config);
      const allureAdapterVersion = packageVersion('@mmisty/cypress-allure-adapter');
      const cypressVersion = packageVersion('cypress');
      
      console.log(' === ENVIRONMENT:');
      console.log(`Cypress version: ${cypressVersion}`);
      console.log(`Allure adapter version: ${allureAdapterVersion}`);
      console.log(config.env);
      console.log(' === ');
  
      // this is to write categories and environment information
      on('before:run', details => {
        reporter?.writeEnvironmentInfo({
          info: {
            "cypress version": cypressVersion,
            "allure adapter version": allureAdapterVersion,
            os: details.system.osName,
            osVersion: details.system.osVersion,
            browser: details.browser?.displayName + ' ' + details.browser?.version,
            ...config.env
          },
        });
  
         // this can be removed if you don't want to group tests into categories in AllureReport
         reporter?.writeCategoriesDefinitions({ categories: './allure-error-categories.json' });
      });
      
      
      // important to return config
      return config;
    },
  },
});
