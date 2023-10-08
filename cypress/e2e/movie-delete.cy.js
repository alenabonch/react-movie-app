describe('Delete Movie', () => {
  beforeEach(() => {
    cy.intercept('GET', '/movies**', { fixture: 'movies-all.json' }).as('allMovies')
    cy.intercept('GET', '/movies?search=bambi**', { fixture: 'movies-search-bambi.json' }).as('searchMovie')
    cy.intercept('GET', '/movies/3170**', { fixture: 'movie-get-bambi.json' }).as('getBambiMovie')
    cy.intercept('DELETE', '/movies/3170**', { fixture: 'movie-delete.json' }).as('deleteMovie')

    cy.visit(Cypress.env('baseUrl'))
    cy.wait('@allMovies')

    cy.getByTestId('search-input')
    .should('have.value', '')
    .type('bambi');
    cy.getByTestId('search-button')
    .click()

    cy.wait('@searchMovie')
    cy.getByTestId('movies-found')
    .should('have.text', '1 movies found')
  })

  it('confirms Delete Movie in Dialog, verifies movie is deleted', () => {
    cy.getByTestId('movie-tile')
    .should('have.length', 1)
    .first()
    .should('contain.text', 'Bambi')
    .getByTestId('context-menu-button')
    .click()
    .getByTestId('context-menu-item')
    .last()
    .click()

    cy.getByTestId('dialog-content')
    .should('contain.text', 'Delete Movie')
    .should('contain.text', 'Are you sure you want to delete this movie?')

    cy.intercept('GET', '/movies?search=bambi**', { fixture: 'movies-search-zero-found.json' }).as('searchAfterDelete')

    cy.getByTestId('confirm-delete-button')
    .click()

    cy.wait('@deleteMovie')
    cy.wait('@searchAfterDelete')

    cy.getByTestId('dialog-content')
    .should('not.exist')

    cy.getByTestId('movie-tile')
    .should('have.length', 0)

    cy.getByTestId('movies-found')
    .should('have.text', '0 movies found')
  })
})
