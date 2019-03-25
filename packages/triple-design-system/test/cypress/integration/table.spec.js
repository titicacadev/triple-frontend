describe('Table', () => {
  beforeEach(() => {
    cy.visit('/table.html')
  })

  context('when using horizontal table', () => {
    it('horizontal wrapper have border-radius', () => {
      cy.get('.wrap_horizontal > div')
        .should('have.css', 'border-radius')
        .and('eq', '6px')
    })

    it('horizontal wrapper element have border-bottom', () => {
      cy.get('.wrap_horizontal > div')
        .find('>div')
        .first()
        .should('have.css', 'border-bottom')
        .and('eq', '1px solid rgb(234, 234, 234)')
    })

    it('horizontal last wrapper element should not have border-bottom', () => {
      cy.get('.wrap_horizontal > div')
        .find('>div')
        .last()
        .should('have.css', 'border-bottom')
        .and('eq', '0px none rgb(0, 0, 0)')
    })
  })

  context('when using vertical table', () => {
    it('vertical wrapper have margin-bottom', () => {
      cy.get('.wrap_vertical > div')
        .find('>div')
        .first()
        .should('have.css', 'margin-bottom')
        .and('eq', '10px')
    })

    it('vertical last wrapper element should not have margin-bottom', () => {
      cy.get('.wrap_vertical > div')
        .find('>div')
        .last()
        .should('have.css', 'margin-bottom')
        .and('eq', '0px')
    })

    it('vertical header element have header color', () => {
      cy.get('.wrap_vertical > div')
        .find('>div')
        .first()
        .find('>div')
        .first()
        .should('have.css', 'background-color')
        .and('eq', 'rgb(234, 234, 234)')
    })

    it('vertical body element have body color', () => {
      cy.get('.wrap_vertical > div')
        .find('>div')
        .first()
        .find('>div')
        .last()
        .should('have.css', 'background-color')
        .and('eq', 'rgb(245, 245, 245)')
    })
  })
})
