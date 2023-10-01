describe('MovieFilter', () => {
  beforeEach(() => {
    cy.intercept('GET', '/movies**', { fixture: 'movies-all.json' }).as('allMovies')
    cy.intercept('GET', '/movies?*filter=Crime**', { fixture: 'movies-filter.json' }).as('filterMovies')

    cy.visit(Cypress.env('baseUrl'))
    cy.wait('@allMovies')
  })

  it('filters movies by genre', () => {
      cy.getByTestId('genre-button')
      .last()
      .should('have.text', 'Crime')
      .click()
    cy.wait('@filterMovies')

    cy.getByTestId('movies-found')
    .should('have.text', '498 movies found')

    cy.getByTestId('movie-tile')
    .should('have.length', 6)
    .first()
    .should('contain.text', 'Trouble Is My Business')
  })

  it('filters movies by genre and displays same result after refresh', () => {
    cy.getByTestId('genre-button')
    .last()
    .should('have.text', 'Crime')
    .click()

    cy.reload()
    cy.wait('@filterMovies')

    cy.getByTestId('movies-found')
    .should('have.text', '498 movies found')

    cy.getByTestId('movie-tile')
    .should('have.length', 6)
    .first()
    .should('contain.text', 'Trouble Is My Business')
  })

  it('navigates by link with genre filter', () => {
    cy.visit(`${Cypress.env('baseUrl')}/?genre=Crime`)
    cy.wait('@filterMovies')

    cy.getByTestId('movies-found')
    .should('have.text', '498 movies found')

    cy.getByTestId('movie-tile')
    .should('have.length', 6)
    .first()
    .should('contain.text', 'Trouble Is My Business')
  })
})
