import { basename } from 'path';
import { visitHtml } from '../../support/helper';

// can be moved into e2e.ts
Cypress.Allure.on('request:started', req => {
  Cypress.Allure.step(`✧ ${req.method} ${req.url}`);
});

// can be moved into e2e.ts
Cypress.Allure.on('request:ended', req => {
  const duration = req.duration ? `(${req.duration / 1000} sec) ` : '';
  Cypress.Allure.startStep(`✦  ${req.method} ${req.status} ${duration}${req.url}`);

  // by default not all requests have bodies, to have request/reqspone bodies
  // you need to intercept thos requests (or use env variable 'allureAddBodiesToRequests' )
  if (req.responseBody) {
    Cypress.Allure.parameter('requestHeaders', req.requestHeaders);
    Cypress.Allure.parameter('responseBody', req.responseBody);
  }

  Cypress.Allure.endStep(!['200', '201'].includes(`${req.status}`) ? 'broken' : 'passed');
});

// add env variable
Cypress.Allure.on('test:started', () => {
  const allureAddBodiesToRequests = Cypress.env('allureAddBodiesToRequests');

  if (allureAddBodiesToRequests) {
    Cypress.Allure.parameter('allureAddBodiesToRequests', Cypress.env('allureAddBodiesToRequests'));
  }
});

// attach test file
Cypress.Allure.on('test:ended', () => {
  Cypress.Allure.testFileAttachment(basename(Cypress.spec.absolute), Cypress.spec.absolute, 'text/plain');
});

describe('requests', { baseUrl: 'https://jsonplaceholder.typicode.com' }, () => {
  const url = () => Cypress.config('baseUrl') + '/';

  it(
    'app fetches GET with data (do not store bodies)',
    { env: { allureAddBodiesToRequests: undefined } },
    () => {
      visitHtml({
        additionalBodyHtml: `
      <div id="fetchEl">click to fetch</div>
      <div id="result"></div>
      `,

        script: `document.getElementById('fetchEl').addEventListener('click', () => {
        document.getElementById('result').innerText = '';
        fetch('${url()}/todos/1',{
                method: "GET",
                headers: {
                  "Content-type": "application/json; charset=UTF-8"
                }
            })
            .then(response => response.json())
            .then(data => {
                document.getElementById('result').innerText = JSON.stringify(data);
            })
            .catch(error => {
                document.getElementById('result').innerText = 'Error: ' + error;
            });
        });`,
      });

      cy.get('#fetchEl').should('exist').click();
      cy.get('#result').should('contain.text', 'title');
    },
  );

  it('app fetches GET with data (additional interception, store bodies)', () => {
    cy.intercept('*').as('min');

    visitHtml({
      additionalBodyHtml: `
      <div id="fetchEl">click to fetch</div>
      <div id="result"></div>
      `,

      script: `document.getElementById('fetchEl').addEventListener('click', () => {
        document.getElementById('result').innerText = '';
        fetch('${url()}/todos/1',{
                method: "GET",
                headers: {
                  "Content-type": "application/json; charset=UTF-8"
                }
            })
            .then(response => response.json())
            .then(data => {
                document.getElementById('result').innerText = JSON.stringify(data);
            })
            .catch(error => {
                document.getElementById('result').innerText = 'Error: ' + error;
            });
        });`,
    });

    cy.get('#fetchEl').should('exist').click();
    cy.get('#result').should('contain.text', 'title');
  });

  it('app fetches POST with data (additional interception)', () => {
    cy.intercept('*').as('min');

    visitHtml({
      additionalBodyHtml: `
      <div id="fetchEl">click to fetch</div>
      <div id="result"></div>
      `,

      script: `document.getElementById('fetchEl').addEventListener('click', () => {
        document.getElementById('result').innerText = '';
        fetch('${url()}/todos',{
                method: "POST",
                body: JSON.stringify({ data: 1}),
                headers: {
                  "Content-type": "application/json; charset=UTF-8"
                }
            })
            .then(response => response.json())
            .then(data => {
                document.getElementById('result').innerText = JSON.stringify(data);
            })
            .catch(error => {
                document.getElementById('result').innerText = 'Error: ' + error;
            });
        });`,
    });

    cy.get('#fetchEl').should('exist').click();
    cy.get('#result').should('not.be.empty');
  });

  it('cypress request POST with data', () => {
    visitHtml({
      additionalBodyHtml: `
      <div id="fetchEl">click to fetch</div>
      <div id="result"></div>
      `,
    });

    cy.get('#fetchEl').should('exist').click();
    cy.request('POST', `${url()}/todos`, { data: 1 });
    cy.get('#result').should('be.empty');
  });

  it('cypress request POST with data and app POST fetch', { env: { allureAddBodiesToRequests: '*' } }, () => {
    visitHtml({
      additionalBodyHtml: `
      <div id="fetchEl">click to fetch</div>
      <div id="result"></div>
      `,
      script: `document.getElementById('fetchEl').addEventListener('click', () => {
        document.getElementById('result').innerText = '';
        fetch('${url()}/todos',{
                method: "POST",
                body: JSON.stringify({ data: 1}),
                headers: {
                  "Content-type": "application/json; charset=UTF-8"
                }
            })
            .then(response => response.json())
            .then(data => {
                document.getElementById('result').innerText = JSON.stringify(data);
            })
            .catch(error => {
                document.getElementById('result').innerText = 'Error: ' + error;
            });
        });`,
    });

    cy.request('POST', `${url()}/todos`, { data: 1 });
    cy.get('#fetchEl').should('exist').click();
    cy.get('#result').should('not.be.empty');
  });

  it('app fetch (store specific requests)', { env: { allureAddBodiesToRequests: '**/todos/**' } }, () => {
    visitHtml({
      additionalBodyHtml: `
      <div id="fetchEl">click to fetch</div>
      <div id="fetchEl2">click to fetch 2</div>
      <div id="result"></div>
      `,
      script: `
      
      document.getElementById('fetchEl').addEventListener('click', () => {
        document.getElementById('result').innerText = '';
        fetch('${url()}/todos',{
            method: "POST",
            body: JSON.stringify({ data: 1}),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('result').innerText = JSON.stringify(data);
        })
        .catch(error => {
            document.getElementById('result').innerText = 'Error: ' + error;
        });
      });

      document.getElementById('fetchEl2').addEventListener('click', () => {
        document.getElementById('result').innerText = '';
        
        fetch('${url()}/todos/1', {
          method: "GET",
          headers: { "Content-type": "application/json; charset=UTF-8" }
        })
        .then(response => response.json())
        .then(data => {
          document.getElementById('result').innerText = JSON.stringify(data);
        })
        .catch(error => {
          document.getElementById('result').innerText = 'Error: ' + error;
        });
      });

        `,
    });

    cy.get('#fetchEl').should('exist').click();
    cy.get('#result').should('not.be.empty');
    cy.get('#fetchEl2').should('exist').click();
    cy.get('#result').should('not.be.empty');
  });
});
