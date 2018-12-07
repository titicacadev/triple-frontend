describe('Image', () => {
  beforeEach(() => {
    cy.visit('/image.html')
  })

  beforeEach(() => {
    cy.get('.fixed-dimension')
      .find('div')
      .first()
      .as('image')
  })

  it('should have fixed dimension with specified width and height', () => {
    cy.get('@image')
      .should('have.css', 'width')
      .and('eq', '200px')

    cy.get('@image')
      .should('have.css', 'height')
      .and('eq', '100px')
  })
})
