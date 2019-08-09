describe('Spinner', () => {
  beforeEach(() => {
    cy.visit('/spinner.html')
  })

  context('when using spinner', () => {
    it('Spinner Container have fixed', () => {
      cy.get('.wrap_spinner > div')
        .should('have.css', 'position')
        .and('eq', 'fixed')
    })

    it('Full type Container have background 255, 255, 255', () => {
      cy.get('.wrap_spinner > div')
        .should('have.css', 'background-color')
        .and('eq', 'rgb(255, 255, 255)')
    })
  })
})
