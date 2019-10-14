describe('Author', () => {
  beforeEach(() => {
    cy.visit('/author.html')
  })
  beforeEach(() => {
    cy.get('#root')
      .find('div')
      .first()
      .as('author')

    cy.get('@author')
      .find('img')
      .first()
      .as('image')

    cy.get('@author')
      .find('div')
      .first()
      .as('info')

    cy.get('@info')
      .find('div')
      .first()
      .as('name')

    cy.get('@info')
      .find('div')
      .last()
      .as('bio')

    cy.get('@author')
      .find('div')
      .last()
      .as('intro')
  })

  it('should have correct image style', () => {
    cy.get('@image')
      .should('have.css', 'width')
      .and('eq', '45px')

    cy.get('@image')
      .should('have.css', 'height')
      .and('eq', '45px')
  })

  it('should have correct name style', () => {
    cy.get('@name')
      .should('have.css', 'font-size')
      .and('eq', '16px')

    cy.get('@name')
      .should('have.css', 'color')
      .and('eq', 'rgb(58, 58, 58)')
  })

  it('should have correct bio style', () => {
    cy.get('@bio')
      .should('have.css', 'font-size')
      .and('eq', '13px')

    cy.get('@bio')
      .should('have.css', 'font-weight')
      .and('eq', '500')

    cy.get('@bio')
      .should('have.css', 'color')
      .and('eq', 'rgba(58, 58, 58, 0.3)')
  })

  it('should have correct intro style', () => {
    cy.get('@intro')
      .should('have.css', 'font-size')
      .and('eq', '14px')

    cy.get('@intro')
      .should('have.css', 'color')
      .and('eq', 'rgba(58, 58, 58, 0.5)')
  })
})
