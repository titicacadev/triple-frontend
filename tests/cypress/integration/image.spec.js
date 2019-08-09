describe('Image', () => {
  beforeEach(() => {
    cy.visit('/image.html')
  })

  beforeEach(() => {
    cy.get('.fixed-dimension')
      .find('div')
      .first()
      .as('image')

    cy.get('.placeholder')
      .find('div')
      .first()
      .as('placeholderImage')
  })

  it('should have fixed dimension with specified width and height', () => {
    cy.get('@image')
      .should('have.css', 'width')
      .and('eq', '200px')

    cy.get('@image')
      .should('have.css', 'height')
      .and('eq', '100px')

    cy.get('@image')
      .should('have.css', 'background-color')
      .and('eq', 'rgb(245, 245, 245)')
  })

  it('should render a placeholder image', () => {
    cy.get('@placeholderImage')
      .should('have.css', 'background-color')
      .and('eq', 'rgb(239, 239, 239)')

    cy.get('@placeholderImage')
      .should('have.css', 'background-size')
      .and('eq', '40px 40px')
  })
})
