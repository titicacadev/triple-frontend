describe('Responsive', () => {
  beforeEach(() => {
    cy.visit('/responsive.html')
  })

  context('when it is hidden by max width', () => {
    it('should be hidden', () => {
      cy.get('.responsive-max-hidden').should('not.be', 'visible')
    })
  })

  context('when it is not hidden by max width', () => {
    it('should be visible', () => {
      cy.get('.responsive-max-visible').should('be', 'visible')
    })
  })

  context('when it is hidden by min width', () => {
    it('should be hidden', () => {
      cy.get('.responsive-min-hidden').should('not.be', 'visible')
    })
  })

  context('when it is not hidden by min width', () => {
    it('should be visible', () => {
      cy.get('.responsive-min-visible').should('be', 'visible')
    })
  })

  context('when it is hidden by min-max width', () => {
    it('should be hidden', () => {
      cy.get('.responsive-minmax-hidden').should('not.be', 'visible')
    })
  })

  context('when it is not hidden by min-max width', () => {
    it('should be visible', () => {
      cy.get('.responsive-minmax-visible').should('be', 'visible')
    })
  })
})
