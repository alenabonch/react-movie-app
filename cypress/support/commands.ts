/// <reference types="cypress" />

Cypress.Commands.add('getByTestId', (id: string) => {
  return cy.get(`[data-testid=${id}]`);
});

declare global {
  namespace Cypress {
    interface Chainable {
      getByTestId(id: string): Chainable,
    }
  }
}

export {};
