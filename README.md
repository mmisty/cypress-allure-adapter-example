# cypress-grep-example

This is example of [@mmisty/cypress-grep](https://www.npmjs.com/package/@mmisty/cypress-grep) package usage for cypress


To run tests: 
1. run all with `@smoke`:
   ```shell
   CYPRESS_GREP='@smoke' npm run cy:grep
   # or 
   npm run cy:grep -- --grep '@smoke'
   ```
2. run all non-`@smoke`:
   ```shell
   CYPRESS_GREP='!@smoke' npm run cy:grep
   # or 
   npm run cy:grep -- --grep '!@smoke'
   ```
3. run all tests with `@smoke` or `@P1`:`
   ```shell
   CYPRESS_GREP='@smoke|@P1' npm run cy:grep
   # or 
   npm run cy:grep -- --grep '@smoke|@P1'
   ```
4. run all tests with `@smoke` AND `@P1`:
   ```shell
   CYPRESS_GREP='@smoke&@P1' npm run cy:grep
   # or 
   npm run cy:grep -- --grep '@smoke&@P1'
   ```
5. inverts result - will run all tests without `@smoke` and `@P1`:
   ```shell
   CYPRESS_GREP='!(@smoke&@P1)' npm run cy:grep
   # or 
   npm run cy:grep -- --grep '!(@smoke&@P1)'
   ```

All tags are case in-sensitive (you can either use `@p1` or `@P1`)

To see help: 
```
npm run cy:grep -- --help
```