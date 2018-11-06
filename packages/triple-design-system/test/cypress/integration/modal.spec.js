describe('Modal', () => {
  beforeEach(() => {
    cy.visit('/modal.html')
  })

  beforeEach(() => {
    cy.get('.modal-container')
      .find('div')
      .first()
      .as('overlay')

    cy.get('@overlay')
      .find('a')
      .first()
      .as('button')
  })

  it('should not close when overlay is clicked', () => {
    cy.get('@overlay').click()

    cy.get('.modal-container').should('not.be.empty')
  })

  it('should close when button is clicked', () => {
    cy.get('@button').click()

    cy.get('.modal-container').should('be.empty')
  })
})
