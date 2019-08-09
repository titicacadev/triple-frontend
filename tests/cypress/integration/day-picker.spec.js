describe('DayPicker', () => {
  beforeEach(() => {
    cy.visit('/day-picker.html')
  })

  it('class and color check after click', () => {
    cy.get('.CalendarDay__today')
      .click()
      .should('have.class', 'CalendarDay__selected')

    cy.get('.CalendarDay__selected')
      .should('have.css', 'color')
      .and('eq', 'rgb(255, 255, 255)')
  })

  it('end Day block check', () => {
    cy.get('.CalendarMonth_verticalSpacing')
      .last()
      .find('.CalendarDay')
      .contains('28')
      .should('have.class', 'CalendarDay__blocked_out_of_range')
  })

  it('block day active click check', () => {
    cy.get('.CalendarMonth_verticalSpacing')
      .last()
      .find('.CalendarDay')
      .contains('28')
      .click()
      .should('have.class', 'CalendarDay__blocked_out_of_range')
  })
})
