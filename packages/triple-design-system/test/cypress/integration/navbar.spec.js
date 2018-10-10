describe('Navbar', () => {
  beforeEach(() => {
    cy.visit('/navbar.html')
  })

  it('should float left-floated items properly', () => {
    cy.get('.back-btn')
      .should('have.css', 'float')
      .and('eq', 'left')
  })

  it('should float right-floated items properly', () => {
    cy.get('.more-btn')
      .should('have.css', 'float')
      .and('eq', 'right')
  })
})
