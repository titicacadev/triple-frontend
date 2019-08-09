describe('Numeric Spinner', () => {
  beforeEach(() => {
    cy.visit('/numeric-spinner.html')
  })

  it('default decrement button should have 0.2 opacity', () => {
    cy.get('.numeric-container div')
      .first()
      .find('span')
      .first()
      .should('have.css', 'opacity')
      .and('eq', '0.2')
  })

  it('default increment button should have 1 opacity', () => {
    cy.get('.numeric-container div')
      .first()
      .find('span')
      .last()
      .should('have.css', 'opacity')
      .and('eq', '1')
  })

  it('when first increment. Container should have min value (min = 1)', () => {
    cy.get('.numeric-container div')
      .first()
      .find('span')
      .last()
      .click()
      .parents()
      .find('div')
      .contains(1)
  })

  it('when first increment. Container should have min value (min = 2)', () => {
    cy.get('.numeric-container > div')
      .last()
      .find('span')
      .last()
      .click()
      .parents()
      .find('div')
      .contains(2)
  })

  it('when over increment. container should have max value (max = 5)', () => {
    cy.get('.numeric-container > div')
      .last()
      .find('span')
      .last()
      .click()
      .click()
      .click()
      .click()
      .click()
      .parents()
      .find('div')
      .contains(5)
  })
})
