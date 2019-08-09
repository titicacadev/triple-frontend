describe('Text', () => {
  beforeEach(() => {
    cy.visit('/text.html')
  })
  beforeEach(() => {
    cy.get('#root')
      .find('div')
      .first()
      .as('text')
  })

  context('when not specifying props', () => {
    it('should have default font-size', () => {
      cy.get('@text')
        .should('have.css', 'font-size')
        .and('eq', '16px')
    })

    it('should have jefault font-weight', () => {
      cy.get('@text')
        .should('have.css', 'font-weight')
        .and('eq', '500')
    })

    it('should have default color', () => {
      cy.get('@text')
        .should('have.css', 'color')
        .and('eq', 'rgb(58, 58, 58)')
    })
  })
})
