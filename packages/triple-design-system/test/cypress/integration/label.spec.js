describe('Label', () => {
  beforeEach(() => {
    cy.visit('/label.html')
  })

  it('should have correct styles of unselected radio', () => {
    cy.get('.radio-unselected')
      .first()
      .as('unselectedRadio')

    cy.get('@unselectedRadio')
      .should('have.css', 'color')
      .and('eq', 'rgba(58, 58, 58, 0.3)')

    cy.get('@unselectedRadio')
      .should('have.css', 'font-size')
      .and('eq', '14px')

    cy.get('@unselectedRadio')
      .should('have.css', 'background-image')
      .and(
        'eq',
        'url("http://triple-web-assets-dev.s3-website-ap-northeast-1.amazonaws.com/images/img-search-select-off@4x.png")',
      )

    cy.get('@unselectedRadio')
      .should('have.css', 'cursor')
      .and('eq', 'pointer')
  })

  it('should have correct styles of selected radio', () => {
    cy.get('.radio-selected')
      .first()
      .as('selectedRadio')

    cy.get('@selectedRadio')
      .should('have.css', 'color')
      .and('eq', 'rgb(58, 58, 58)')

    cy.get('@selectedRadio')
      .should('have.css', 'font-size')
      .and('eq', '14px')

    cy.get('@selectedRadio')
      .should('have.css', 'background-image')
      .and(
        'eq',
        'url("http://triple-web-assets-dev.s3-website-ap-northeast-1.amazonaws.com/images/img-search-select-on@4x.png")',
      )

    cy.get('@selectedRadio')
      .should('have.css', 'cursor')
      .and('eq', 'pointer')
  })
})
