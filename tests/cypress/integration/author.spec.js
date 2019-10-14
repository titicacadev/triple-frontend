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
      .as('name')

    cy.get('@author')
      .find('div')
      .last()
      .as('bio')
  })

  it('should have correct image style', () => {
    cy.get('@image')
      .should('have.css', 'width')
      .and('eq', '60px')

    cy.get('@image')
      .should('have.css', 'height')
      .and('eq', '60px')

    cy.get('@image')
      .should('have.css', 'border-radius')
      .and('eq', '30px')
  })

  it('should have correct name style', () => {
    cy.get('@name')
      .should('have.css', 'font-size')
      .and('eq', '16px')

    cy.get('@name')
      .should('have.css', 'color')
      .and('eq', 'rgb(58, 58, 58)')

    cy.get('@name')
      .should('have.css', 'margin-top')
      .and('eq', '15px')
  })

  it('should have correct bio style', () => {
    cy.get('@bio')
      .should('have.css', 'font-size')
      .and('eq', '14px')

    cy.get('@bio')
      .should('have.css', 'font-weight')
      .and('eq', '500')

    cy.get('@bio')
      .should('have.css', 'color')
      .and('eq', 'rgba(58, 58, 58, 0.5)')

    cy.get('@bio')
      .should('have.css', 'text-align')
      .and('eq', 'center')

    cy.get('@bio')
      .should('have.css', 'margin-top')
      .and('eq', '5px')
  })
})
