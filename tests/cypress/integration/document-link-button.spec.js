describe('Triple Document Link Button spacing', () => {
  beforeEach(() => {
    cy.visit('/document-link-button.html')
  })

  it('one button should have no margin', () => {
    cy.get('#one-button')
      .find('a')
      .first()
      .should('have.css', 'margin')
      .and('eq', '5px 0px 0px')
  })

  it('two buttons should have margins', () => {
    cy.get('#two-button')
      .find('a')
      .first()
      .should('have.css', 'margin')
      .and('eq', '5px 0px 0px')

    cy.get('#two-button')
      .find('a')
      .last()
      .should('have.css', 'margin')
      .and('eq', '5px 0px 0px 5px')
  })
})
