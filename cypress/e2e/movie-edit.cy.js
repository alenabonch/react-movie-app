describe('Edit Movie', () => {
  beforeEach(() => {
    cy.intercept('GET', '/movies**', { fixture: 'movies-all.json' }).as('allMovies')
    cy.intercept('GET', '/movies?search=bambi**', { fixture: 'movies-search-bambi.json' }).as('searchMovie')
    cy.intercept('GET', '/movies/3170**', { fixture: 'movie-get-bambi.json' }).as('getBambiMovie')
    cy.intercept('PUT', '/movies**', { fixture: 'movie-edit.json' }).as('editMovie')

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

  it('fills and submits Edit Movie form, verifies newly updated movie and its details', () => {
    cy.getByTestId('movie-tile')
    .should('have.length', 1)
    .first()
    .should('contain.text', 'Bambi')
    .getByTestId('context-menu-button')
    .click()
    .getByTestId('context-menu-item')
    .first()
    .click()

    cy.getByTestId('dialog-content')
    .should('contain.text', 'Edit Movie')

    cy.getByTestId('title-input')
    .should('have.value', 'Bambi')
    .type(' Bumble Bee')

    cy.getByTestId('url-input')
    .should('have.value', 'https://image.tmdb.org/t/p/w500/wV9e2y4myJ4KMFsyFfWYcUOawyK.jpg')
    .clear()
    .type('https://m.media-amazon.com/images/I/41GMriCpmYL._AC_.jpg')

    cy.get('#releaseDate')
    .should('have.value', '1942-08-14')
    .clear()
    .type('2008-04-17{enter}')

    cy.getByTestId('rating-input')
    .should('have.value', '6.8')
    .clear()
    .type('7.8')

    cy.getByTestId('duration-input')
    .should('have.value', '70')
    .clear()
    .type('88')

    cy.getByTestId('overview-input')
    .should('have.value', 'Bambi\'s tale unfolds from season to season as the young prince of the forest learns about life, love, and friends.')
    .clear()
    .type('Cool adventures of Bambi Bumble Bee')

    cy.intercept('GET', '/movies/3170**', { fixture: 'movie-get-edited.json' }).as('getEditedMovie')

    cy.getByTestId('submit-movie-form')
    .click()

    cy.wait('@editMovie')
    cy.wait('@getEditedMovie')

    cy.getByTestId('dialog-content')
    .should('not.exist')

    cy.getByTestId('movie-details')
    .should('have.length', 1)
    .should('contain.text', 'Bambi Bumble Bee')
    .should('contain.text', '2008-04-17')
    .should('contain.text', 'Animation, Drama, Family')
    .should('contain.text', '7.8')
    .should('contain.text', '1h 28m')
    .should('contain.text', 'Cool adventures of Bambi Bumble Bee')
    .should('contain.html', 'https://m.media-amazon.com/images/I/41GMriCpmYL._AC_.jpg')

    cy.getByTestId('movie-tile')
    .should('have.length', 1)
    .first()
    .should('contain.text', 'Bambi Bumble Bee')
  })
})
