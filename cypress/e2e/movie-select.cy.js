describe('MovieSelect', () => {
  beforeEach(() => {
    cy.intercept('GET', '/movies**', { fixture: 'movies-all.json' }).as('allMovies')
    cy.intercept('GET', '/movies/447365**', { fixture: 'movie-get-selected.json' }).as('getSelectedMovie')
    cy.visit(Cypress.env('baseUrl'));
    cy.wait('@allMovies')
  })

  it('clicks on the first movie tile and displays movie details instead of search input', () => {
    cy.getByTestId('movie-tile')
    .first()
    .should('contain.text', 'Guardians of the Galaxy Vol. 3')
    .click()

    cy.wait('@getSelectedMovie')

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

    cy.wait('@getSelectedMovie')

    cy.getByTestId('search-input')
    .should('not.exist');

    cy.getByTestId('return-to-search')
    .click()

    cy.getByTestId('search-input')
    .should('exist');

    cy.getByTestId('movie-details')
    .should('not.exist')
  });

  it('clicks on the first movie tile, refreshes the page and ensures same movie tile is displayed', () => {
    cy.getByTestId('movie-tile')
    .first()
    .should('contain.text', 'Guardians of the Galaxy Vol. 3')
    .click()

    cy.reload()

    cy.getByTestId('movie-details')
    .should('have.length', 1)
    .should('contain.text', 'Guardians of the Galaxy Vol. 3')
  });

  it('navigates by link with movie id', () => {
    cy.visit(`${Cypress.env('baseUrl')}/447365`)
    cy.wait('@getSelectedMovie')

    cy.getByTestId('movie-details')
    .should('have.length', 1)
    .should('contain.text', 'Guardians of the Galaxy Vol. 3')
  });
})
