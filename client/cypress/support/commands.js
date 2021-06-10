Cypress.Commands.add("mock", (url, modification) => {
  const fileName = url.slice(1).replace("/", "-");
  const handler = require(`../fixtures/${fileName}`);
  const response = handler.default();
  cy.intercept(`/api${url}`, { response, ...modification });
});
