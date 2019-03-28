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
        'url("https://assets.triple.guide/images/img-search-select-off@4x.png")',
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
        'url("https://assets.triple.guide/images/img-search-select-on@4x.png")',
      )

    cy.get('@selectedRadio')
      .should('have.css', 'cursor')
      .and('eq', 'pointer')
  })

  it('should have correct styles of small promo', () => {
    cy.get('.promo-small')
      .first()
      .as('smallPromo')

    cy.get('@smallPromo')
      .should('have.css', 'font-size')
      .and('eq', '11px')

    cy.get('@smallPromo')
      .should('have.css', 'border-radius')
      .and('eq', '1px')

    cy.get('@smallPromo')
      .should('have.css', 'height')
      .and('eq', '20px')

    cy.get('@smallPromo')
      .should('have.css', 'padding')
      .and('eq', '0px 6px')
  })

  it('should have correct styles of medium promo', () => {
    cy.get('.promo-medium')
      .first()
      .as('mediumPromo')

    cy.get('@mediumPromo')
      .should('have.css', 'font-size')
      .and('eq', '12px')

    cy.get('@mediumPromo')
      .should('have.css', 'border-radius')
      .and('eq', '2px')

    cy.get('@mediumPromo')
      .should('have.css', 'height')
      .and('eq', '26px')

    cy.get('@mediumPromo')
      .should('have.css', 'padding')
      .and('eq', '0px 10px')
  })
})
