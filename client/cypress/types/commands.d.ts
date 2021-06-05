declare namespace Cypress {
  interface Chainable {
    mock(url: string, modifcation?: any): Chainable<Element>;
  }
}
