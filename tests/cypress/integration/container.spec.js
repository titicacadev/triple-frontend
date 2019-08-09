describe('Container', () => {
  beforeEach(() => {
    cy.visit('/container.html')
  })

  it('should have correct default style', () => {
    cy.get('.default-container')
      .should('have.css', 'position')
      .and('eq', 'static')

    cy.get('.default-container')
      .should('have.css', 'margin')
      .and('eq', '0px')

    cy.get('.default-container')
      .should('have.css', 'padding')
      .and('eq', '0px')
  })

  it('should have specified position', () => {
    cy.get('.relative-container')
      .should('have.css', 'position')
      .and('eq', 'relative')

    cy.get('.absolute-container')
      .should('have.css', 'position')
      .and('eq', 'absolute')

    cy.get('.fixed-container')
      .should('have.css', 'position')
      .and('eq', 'fixed')

    cy.get('.sticky-container')
      .should('have.css', 'position')
      .and('eq', 'sticky')
  })
})
