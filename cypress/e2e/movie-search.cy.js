describe('MovieSearch', () => {
  beforeEach(() => {
    cy.intercept('GET', '/movies**', { fixture: 'movies-all.json' }).as('allMovies')
    cy.intercept('GET', '/movies?search=bambi**', { fixture: 'movies-search-bambi.json' }).as('searchMovie')

    cy.visit(Cypress.env('baseUrl'))
    cy.wait('@allMovies')
  })

  it('displaying all movies, loading first six of them', () => {
    cy.getByTestId('movies-found')
    .should('have.text', '3000 movies found')

    cy.getByTestId('movie-tile')
    .should('have.length', 6)
    .first()
    .should('contain.text', 'Guardians of the Galaxy Vol. 3')
  })

  it('searches by query and displays the result', () => {
    cy.getByTestId('search-input')
    .should('have.value', '')
    .type('bambi');
    cy.getByTestId('search-button')
    .click();
    cy.wait('@searchMovie').its('request.url').should('include', '/movies?search=bambi')

    cy.getByTestId('movies-found')
      .should('have.text', '1 movies found')

    cy.getByTestId('movie-tile')
    .should('have.length', 1)
    .first()
    .should('contain.text', 'Bambi')
  })

  it('searches by query and displays the searched result after page refresh', () => {
    cy.getByTestId('search-input')
    .should('have.value', '')
    .type('bambi');
    cy.getByTestId('search-button')
    .click();

    cy.reload()

    cy.getByTestId('movies-found')
    .should('have.text', '1 movies found')

    cy.getByTestId('movie-tile')
    .should('have.length', 1)
    .first()
    .should('contain.text', 'Bambi')
  })

  it('searches by query and displays the searched result after page refresh', () => {
    cy.visit(`${Cypress.env('baseUrl')}/?query=bambi`)

    cy.getByTestId('movies-found')
    .should('have.text', '1 movies found')

    cy.getByTestId('movie-tile')
    .should('have.length', 1)
    .first()
    .should('contain.text', 'Bambi')
  })
})
