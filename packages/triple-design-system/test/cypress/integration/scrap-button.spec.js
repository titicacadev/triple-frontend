describe('ScrapButton', () => {
  beforeEach(() => {
    cy.visit('/scrap-button.html')
  })

  beforeEach(() => {
    cy.get('.compact-not-pressed')
      .first()
      .as('compactNotPressed')

    cy.get('.regular-pressed')
      .first()
      .as('regularPressed')

    cy.get('.regular-not-pressed')
      .first()
      .as('regularNotPressed')
  })

  context('when using compact layout', () => {
    it('should render `on` button for pressed state', () => {
      cy.get('.compact-pressed')
        .should('have.css', 'background-image')
        .and(
          'eq',
          'url("https://assets.triple.guide/images/btn-content-scrap-list-on@2x.png")',
        )
    })

    it('should render `on` button for not-pressed state', () => {
      cy.get('.compact-not-pressed')
        .should('have.css', 'background-image')
        .and(
          'eq',
          'url("https://assets.triple.guide/images/btn-content-scrap-list-off@2x.png")',
        )
    })
  })

  context('when using regular layout', () => {
    it('should render `on` button for pressed state', () => {
      cy.get('.regular-pressed')
        .should('have.css', 'background-image')
        .and(
          'eq',
          'url("https://assets.triple.guide/images/btn-content-scrap-overlay-on@2x.png")',
        )
    })

    it('should render `on` button for not-pressed state', () => {
      cy.get('.regular-not-pressed')
        .should('have.css', 'background-image')
        .and(
          'eq',
          'url("https://assets.triple.guide/images/btn-content-scrap-overlay-off@2x.png")',
        )
    })
  })
})
