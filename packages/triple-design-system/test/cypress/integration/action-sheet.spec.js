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
  })

  it('should close when overlay is clicked', () => {
    cy.get('@overlay').click()

    cy.get('.action-sheet-container').should('be.empty')
  })

  it('should not close when sheet area is clicked', () => {
    cy.get('@sheet').click()

    cy.get('.action-sheet-container').should('not.be.empty')
  })
})
