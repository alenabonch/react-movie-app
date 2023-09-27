describe('MovieSearch', () => {
  beforeEach(() => {
    cy.intercept('GET', '/movies**', { fixture: 'movies-all.json' }).as('allMovies')
    cy.intercept('GET', '/movies?search=bambi**', { fixture: 'movies-search.json' }).as('searchMovie')
    cy.intercept('GET', '/movies?*sortBy=title**', { fixture: 'movies-sort.json' }).as('sortMovies')
    cy.intercept('GET', '/movies?*filter=Crime**', { fixture: 'movies-filter.json' }).as('filterMovies')
    cy.intercept('GET', '/movies?*offset=6**', { fixture: 'movies-more.json' }).as('moreMovies')

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

  it('loads more elements with infinite scroll', () => {
    cy.getByTestId('movie-tile')
    .should('have.length', 6)
    .last()
    .should('contain.text', 'Journey 3: From the Earth to the Moon')
    .scrollIntoView()
    cy.wait('@moreMovies')

    cy.getByTestId('movie-tile')
    .should('have.length', 12)
    .last()
    .should('contain.text', 'Avengers: Infinity War')
  })
})
