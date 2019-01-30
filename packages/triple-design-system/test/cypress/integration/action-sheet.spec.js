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

    cy.get('.action-sheet-container')
      .find('span')
      .first()
      .should('be.empty')
  })

  it('should not close when sheet area is clicked', () => {
    cy.get('@sheet').click()

    cy.get('.action-sheet-container')
      .find('span')
      .first()
      .should('not.be.empty')
  })

  it('should close when an item is clicked', () => {
    cy.get('@item').click()

    cy.get('.action-sheet-container')
      .find('span')
      .first()
      .should('be.empty')
  })
})
