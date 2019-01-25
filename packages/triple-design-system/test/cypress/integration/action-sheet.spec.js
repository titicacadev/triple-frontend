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

  it('should prevent body from being scrolled', () => {
    cy.get('body')
      .should('have.css', 'overflow')
      .and('eq', 'hidden')

    cy.get('body').should('have.class', 'scroll-disabled')

    cy.get('@overlay').click()

    cy.get('body')
      .should('have.css', 'overflow')
      .and('not.eq', 'hidden')

    cy.get('body').should('not.have.class', 'scroll-disabled')
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
