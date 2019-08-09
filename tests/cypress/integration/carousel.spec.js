describe('Carousel', () => {
  beforeEach(() => {
    cy.visit('/carousel.html')
  })

  it('should have correct default style', () => {
    cy.get('.default-carousel')
      .should('have.css', 'margin')
      .and('eq', '0px')

    cy.get('.default-carousel')
      .should('have.css', 'white-space')
      .and('eq', 'nowrap')

    cy.get('.default-carousel')
      .should('have.css', 'overflow-x')
      .and('eq', 'scroll')

    cy.get('.default-carousel-item')
      .should('have.css', 'display')
      .and('eq', 'inline-block')

    cy.get('.default-carousel-item')
      .should('have.css', 'white-space')
      .and('eq', 'normal')

    cy.get('.default-carousel-item')
      .should('have.css', 'width')
      .and('eq', '140px')

    cy.get('.default-carousel-item')
      .should('have.css', 'margin-left')
      .and('eq', '10px')
  })

  it('should have correct margin', () => {
    cy.get('.carousel-with-margin')
      .should('have.css', 'margin-top')
      .and('eq', '40px')

    cy.get('.carousel-with-margin')
      .should('have.css', 'margin-left')
      .and('eq', '30px')

    cy.get('.carousel-with-margin')
      .should('have.css', 'margin-right')
      .and('eq', '20px')

    cy.get('.carousel-with-margin')
      .should('have.css', 'margin-bottom')
      .and('eq', '10px')
  })

  it('should have correct container padding', () => {
    cy.get('.carousel-with-container-padding')
      .children('li')
      .first()
      .should('have.css', 'margin-left')
      .and('eq', '30px')

    cy.get('.carousel-with-container-padding')
      .children('li')
      .last()
      .should('have.css', 'margin-right')
      .and('eq', '20px')

    cy.get('.carousel-with-container-padding')
      .children('li')
      .next()
      .should('have.css', 'margin-left')
      .and('eq', '10px')
  })
})
