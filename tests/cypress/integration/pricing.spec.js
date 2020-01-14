describe('Pricing', () => {
  beforeEach(() => {
    cy.visit('/pricing.html')
  })

  context('when using listing layout', () => {
    it('DescountRate Text have pink color', () => {
      cy.get('.rich-pressed > div')
        .find('span')
        .contains('16%')
        .should('have.css', 'color')
        .and('eq', 'rgb(253, 46, 105)')
    })

    it('Price Text have font-size 20px', () => {
      cy.get('.rich-pressed > div')
        .find('span')
        .contains('25,000원')
        .should('have.css', 'font-size')
        .and('eq', '20px')
    })
  })

  context('when using regular layout', () => {
    it('regular have padding 18px', () => {
      cy.get('.regular-pressed > div')
        .should('have.css', 'padding')
        .and('eq', '18px 0px 0px')
    })

    it('Price Text have font-size 18px', () => {
      cy.get('.regular-pressed > div')
        .find('span')
        .contains('25,000원')
        .should('have.css', 'font-size')
        .and('eq', '18px')
    })

    it('BasePrice Text have absolute', () => {
      cy.get('.regular-pressed > div')
        .find('span')
        .contains('30,000')
        .should('have.css', 'display')
        .and('eq', 'inline-block')
    })
  })

  context('when using regular layout fixed layout', () => {
    it('Fixed Container have fixed position', () => {
      cy.get('.fixed-pressed > div')
        .should('have.css', 'position')
        .and('eq', 'fixed')
    })

    it('Label Text have props Text', () => {
      cy.get('.fixed-pressed > div')
        .find('div')
        .first()
        .contains('트리플 클럽가')
    })

    it('Fixed Button Text have prop Text', () => {
      cy.get('.fixed-pressed')
        .find('button')
        .contains('객실예약')
    })
  })
})
