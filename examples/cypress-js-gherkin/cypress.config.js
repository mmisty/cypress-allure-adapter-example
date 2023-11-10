const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;
const  createBundler = require("@bahmutov/cypress-esbuild-preprocessor");

const { defineConfig } = require("cypress");
const { configureAllureAdapterPlugins } = require("@mmisty/cypress-allure-adapter/plugins");
const { addCucumberPreprocessorPlugin } = require("@badeball/cypress-cucumber-preprocessor");
const EventForwarder = require("./event-forwarder");

const eventForwarder = new EventForwarder();

module.exports = defineConfig({
  e2e: {
    defaultCommandTimeout: 1500,
    video: true,
    specPattern: 'cypress/e2e/**/*.feature',
    supportFile: 'cypress/support/e2e.js',
    downloadsFolder: 'cypress/downloads',
    videosFolder: 'cypress/videos',
    fixturesFolder: 'cypress/fixtures',
    screenshotsFolder: 'cypress/screenshots',
    trashAssetsBeforeRuns: true,
    chromeWebSecurity: false,
    env: {
      // can use allure env var here or from cmd line by
      // `npx cypress run --env allure=true` or `CYPRESS_allure=true npx cypress run`
      allure: true,
      // allureCleanResults: true,
      allureSkipCommands: 'wrap',
      allureResults: '../../allure-results',
      // when using Allure TestOps:
      // allureResultsWatchPath: 'allure-results/watch'
      tmsPrefix: 'https://jira/browse/*',
      issuePrefix: 'https://jira/browse/*',
    },
    setupNodeEvents: async function (cyOn, config) {
      const on = eventForwarder.on;
      const reporter = configureAllureAdapterPlugins(on, config);
      
      console.log(' === ENVIRONMENT:');
      console.log(config.env);
      console.log(' === ');
      
      const cucumberBundler = createBundler({
        define: { global: 'window' },
        plugins: [createEsbuildPlugin(config)],
      });
      
      on('file:preprocessor', cucumberBundler);
      
      // this is to write categories and environment information
      on('before:run', details => {
        reporter?.writeEnvironmentInfo({
          info: {
            // any env info you want to see in report
            os: details.system.osName,
            osVersion: details.system.osVersion,
            browser: details.browser?.displayName + ' ' + details.browser?.version,
          },
        });
      
        reporter?.writeCategoriesDefinitions({ categories: './allure-error-categories.json' });
      });
    
      await addCucumberPreprocessorPlugin(on, config);
      
      eventForwarder.forward(cyOn);
      
      // important to return config
      return config;
    },
  },
});
