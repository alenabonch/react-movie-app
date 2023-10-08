describe('Add Movie', () => {
  beforeEach(() => {
    cy.intercept('GET', '/movies**', { fixture: 'movies-all.json' }).as('allMovies')
    cy.intercept('GET', '/movies?search=bambi**', { fixture: 'movies-search-bambi.json' }).as('searchMovie')
    cy.intercept('POST', '/movies**', { fixture: 'movie-add.json' }).as('addMovie')
    cy.intercept('GET', '/movies/1696790724464**', { fixture: 'movie-get-added.json' }).as('getAddedMovie')

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

    cy.getByTestId('movie-tile')
    .should('have.length', 1)
    .first()
    .should('contain.text', 'Bambi')
  })

  it('fills and submits Add Movie form, verifies newly added movie and its details', () => {
    cy.getByTestId('add-movie-button')
      .should('have.text', '+ Add Movie')
      .click()

    cy.getByTestId('dialog-content')
    .should('contain.text', 'Add Movie')

    cy.getByTestId('title-input')
    .should('have.value', '')
    .type('Bambi and the Great Prince of the Forest')

    cy.getByTestId('url-input')
    .should('have.value', '')
    .type('https://m.media-amazon.com/images/I/41GMriCpmYL._AC_.jpg')

    cy.get('#genres_input')
    .should('have.value', '')
    .type('Comedy{enter}')
    .type('Drama{enter}')

    cy.get('#releaseDate')
    .should('have.value', '')
    .type('2006-02-07{enter}')

    cy.getByTestId('rating-input')
    .should('have.value', '0')
    .type('7.5')

    cy.getByTestId('duration-input')
    .should('have.value', '0')
    .type('72')

    cy.getByTestId('overview-input')
    .should('have.value', '')
    .type('Taking place between Bambi\'s mother\'s death and Bambi shown as a young adult buck, the film follows Bambi\'s relationship with his father, The Great Prince of the Forest, and Bambi\'s efforts to earn his father\'s love for him.')

    cy.intercept('GET', '/movies?search=bambi**', { fixture: 'movies-search-with-added.json' }).as('searchMovieWithAdded')

    cy.getByTestId('submit-movie-form')
    .click()

    cy.wait('@addMovie')
    cy.wait('@getAddedMovie')
    cy.wait('@searchMovieWithAdded')

    cy.getByTestId('dialog-content')
    .should('not.exist')

    cy.getByTestId('movie-details')
    .should('have.length', 1)
    .should('contain.text', 'Bambi and the Great Prince of the Forest')
    .should('contain.text', '2006-02-07')
    .should('contain.text', 'Comedy, Drama')
    .should('contain.text', '7.5')
    .should('contain.text', '1h 12m')
    .should('contain.text', 'Taking place between Bambi\'s mother\'s death and Bambi shown as a young adult buck, the film follows Bambi\'s relationship with his father, The Great Prince of the Forest, and Bambi\'s efforts to earn his father\'s love for him.')
    .should('contain.html', 'https://m.media-amazon.com/images/I/41GMriCpmYL._AC_.jpg')

    cy.getByTestId('movie-tile')
    .should('have.length', 2)
    .first()
    .should('contain.text', 'Bambi and the Great Prince of the Forest')
    .last()
    .should('contain.text', 'Bambi')
  })
})
