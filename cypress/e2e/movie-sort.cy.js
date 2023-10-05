describe('MovieSort', () => {
  beforeEach(() => {
    cy.intercept('GET', '/movies**', { fixture: 'movies-all.json' }).as('allMovies')
    cy.intercept('GET', '/movies?*sortBy=title**', { fixture: 'movies-sort.json' }).as('sortMovies')

    cy.visit(Cypress.env('baseUrl'))
    cy.wait('@allMovies')
  })

  it('changes sort from release date to sort by title', () => {
    cy.getByTestId('sort-select')
    .should('have.value', 'release_date')
    .select('title');
    cy.wait('@sortMovies')

    cy.getByTestId('movies-found')
    .should('have.text', '3000 movies found')

    cy.getByTestId('movie-tile')
    .should('have.length', 6)
    .first()
    .should('contain.text', 'Zulu')
  })

  it('changes sort from release date to sort by title and preserves it after page refresh', () => {
    cy.getByTestId('sort-select')
    .should('have.value', 'release_date')
    .select('title');
    cy.reload();

    cy.getByTestId('movies-found')
    .should('have.text', '3000 movies found')

    cy.getByTestId('movie-tile')
    .should('have.length', 6)
    .first()
    .should('contain.text', 'Zulu')
  })

  it('navigates to link with sort filter applied', () => {
    cy.visit(`${Cypress.env('baseUrl')}/?sortBy=title`)

    cy.getByTestId('movies-found')
    .should('have.text', '3000 movies found')

    cy.getByTestId('movie-tile')
    .should('have.length', 6)
    .first()
    .should('contain.text', 'Zulu')
  })
})
