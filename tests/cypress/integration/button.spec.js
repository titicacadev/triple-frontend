describe('Button', () => {
  beforeEach(() => {
    cy.visit('/button.html')
  })

  context('when included in Button.Group with default style', () => {
    it('should have correct default style', () => {
      cy.get('.default-button-group')
        .children('a')
        .should('have.css', 'margin')
        .and('eq', '0px')

      cy.get('.default-button-group')
        .children('a')
        .should('have.css', 'width')
        .and('eq', '179.5px')
    })
  })

  context('when included in Button.Group with horizontal gap', () => {
    it('should have correct margin', () => {
      cy.get('.button-group-horizontal-gap')
        .children('a')
        .first()
        .should('have.css', 'margin-left')
        .and('eq', '0px')

      cy.get('.button-group-horizontal-gap')
        .children('a')
        .last()
        .should('have.css', 'margin-left')
        .and('eq', '50px')

      cy.get('.button-group-horizontal-gap')
        .children('a')
        .should('have.css', 'width')
        .and('eq', '154.5px')
    })
  })
})
