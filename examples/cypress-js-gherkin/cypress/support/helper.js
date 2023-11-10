export const htmlFormatted = `
    <html>
    <head>
    <style>
    body {background-color: powderblue; font-size: 20pt}
    h1   {color: blue;}
    p    {color: #68e2c0;}
    .title{
        background-color: rgba(98,220,220,0.75);
        margin-bottom: 30px;
    }
    label{
        background-color: rgba(180,246,246,0.75);
        margin-bottom: 30px;
        width: 100%;
        height: 100px;
    }
    input {
        width: 100%;
        height: 100px;
        font-size: 20pt
    }
    .dialog-container {
      width: 500px;
      height: 500px;
      margin: auto;
      margin-top: 200px;
      border: solid 1px;
    }
    .btn {
    
    }
    </style>
</head>
    
    <body>
        <div class="dialog-container">
            <div class="dialog">
              <div class="title">Dialog title</div>
              <div data-test-id="data-name-section">
                  <input type="text" placeholder="name"/>
              </div>
              <div data-test-id="data-surname-section">
                <label >family name</label>
                <input type="text" placeholder="family name"/>
              </div>
              <div data-test-id="data-submit-section">
                <input type="button" class="btn" aria-disabled="false" value="Submit"/>
              </div>
              <label class="err"></label>
              
              <select data-test-id="data-selector">
                <option>opt 1</option>
                <option>opt 2</option>
                <option>opt 3</option>
              </select>
            </div>
        </div>
        <div class="footer" data-test-id="data-footer">Footer here</div>
        <div class="other-footer">
          <div class="inside-footer">Insider</div>
          <div class="inside-footer">In 2</div>
        </div>
    </body>
    </html>
    `;


export const visitHtml = (options) => {
  cy.intercept('mytest.com**', {
    body: options?.htmlOverride ?? htmlFormatted,
    delayMs: options?.delayBeforeLoad ?? 200,
  });
  cy.visit('mytest.com', options?.visitTimeout ? { timeout: options.visitTimeout } : {});
};

