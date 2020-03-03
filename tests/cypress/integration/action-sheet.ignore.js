describe('ActionSheet', () => {
  beforeEach(() => {
    cy.visit('/action-sheet.html')
  })

  beforeEach(() => {
    cy.get('.action-sheet-container')
      .find('div')
      .first()
      .as('overlay')

    cy.get('@overlay')
      .find('div')
      .first()
      .as('sheet')

    cy.get('@sheet')
      .find('div')
      .first()
      .as('item')
  })

  it('should close when overlay is clicked', () => {
    cy.get('@overlay').click()

    cy.get('@overlay')
      .should('have.css', 'display')
      .and('eq', 'none')
  })

  it('should not close when sheet area is clicked', () => {
    cy.get('@sheet').click(15, 15)

    cy.get('@overlay')
      .should('have.css', 'display')
      .and('eq', 'block')
  })

  it('should close when an item is clicked', () => {
    cy.get('@item').click()

    cy.get('@overlay')
      .should('have.css', 'display')
      .and('eq', 'none')
  })
})
