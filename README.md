# cypress-allure-adapter example

This is repo with examples of using [@mmisty/cypress-allure-adapter](https://www.npmjs.com/package/@mmisty/cypress-allure-adapter) package with cypress


There are several examples: 
 - cypress-js (setup and usage with javascript)
 - cypress-js-gherkin (setup and usage with javascript and gherkin plugin @badeball/cypress-cucumber-preprocessor)

To check out go in examples folder.

## Scripts
Each example folder has scripts.

Before running scripts install all packages by `npm i`.

- open cypress interactive mode:
   ```shell
   npm run cy:open
   ```
  
- run all tests:
   ```shell
   npm run cy:run
   ```
## Root scripts
- open allure report :
   ```shell
   npm run report:open
   ```
  
-  run all tests and open report afterwards:
   ```shell
   npm run cy:run:with:report
   ```
   

To see report example you can visit [https://mmisty.github.io/cypress-allure-adapter-example](https://mmisty.github.io/cypress-allure-adapter-example)