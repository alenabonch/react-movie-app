describe('MovieSelect', () => {
  beforeEach(() => {
    cy.intercept('GET', '/movies**', { fixture: 'movies-all.json' }).as('allMovies')
    cy.visit(Cypress.env('baseUrl'));
    cy.wait('@allMovies')
  })

  it('clicks on the first movie tile and displays movie details instead of search input', () => {
    cy.getByTestId('movie-tile')
    .first()
    .should('contain.text', 'Guardians of the Galaxy Vol. 3')
    .click()

    cy.getByTestId('search-input')
    .should('not.exist');

    cy.getByTestId('movie-details')
    .should('have.length', 1)
    .should('contain.text', 'Guardians of the Galaxy Vol. 3')
  });

  it('clicks on the first movie tile and returns back to search', () => {
    cy.getByTestId('movie-tile')
    .first()
    .should('contain.text', 'Guardians of the Galaxy Vol. 3')
    .click()

    cy.getByTestId('search-input')
    .should('not.exist');

    cy.getByTestId('return-to-search')
    .click()

    cy.getByTestId('search-input')
    .should('exist');

    cy.getByTestId('movie-details')
    .should('not.exist')
  });
})
