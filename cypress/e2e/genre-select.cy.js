describe('GenreSelect', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('baseUrl'));
  })

  it('displays five genre buttons by default', () => {
    cy.getByTestId('genre-button')
    .should('have.length', 5)
  });

  it('displays first genre highlighted', () => {
    cy.getByTestId('genre-button')
    .first()
    .should('have.text', 'All')
    .should('have.class', 'active')
  })

  it('can highlight selected genre', () => {
    cy.getByTestId('genre-button')
    .last()
    .should('have.text', 'Crime')
    .should('not.have.class', 'active')
    .click()
    .should('have.class', 'active')
  })
})
