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
      .find('div')
      .first()
      .as('box')

    cy.get('@overlay')
      .find('a')
      .first()
      .as('button')
  })

  it('should prevent body from being scrolled', () => {
    cy.get('body')
      .should('have.css', 'overflow')
      .and('eq', 'hidden')

    cy.get('body').should('have.class', 'scroll-disabled')

    cy.get('@button').click()

    cy.get('body')
      .should('have.css', 'overflow')
      .and('not.eq', 'hidden')

    cy.get('body').should('not.have.class', 'scroll-disabled')
  })

  it('should close when overlay is clicked', () => {
    cy.get('@overlay').click('top')

    cy.get('.modal-container').should('be.empty')
  })

  it('should not close when box area is clicked', () => {
    cy.get('@box').click()

    cy.get('.modal-container').should('not.be.empty')
  })

  it('should close when button is clicked', () => {
    cy.get('@button').click()

    cy.get('.modal-container').should('be.empty')
  })
})
