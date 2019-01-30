describe('DayPicker', () => {
  beforeEach(() => {
    cy.visit('/day-picker.html')
  })

  it('class and color check after click', () => {
    cy.get('.CalendarDay__today')
      .click()
      .should('have.class', 'CalendarDay__selected')

    cy.get('.CalendarDay__selected')
      .should('have.css', 'background-color')
      .and('eq', 'rgb(54, 143, 255)')
  })

  it('end Day block check (2019-04-29)', () => {
    cy.get('.CalendarMonth_table')
      .last()
      .find('.CalendarDay')
      .contains('30')
      .should('have.class', 'CalendarDay__blocked_out_of_range')
  })

  it('block day active click check (2019-04-29)', () => {
    cy.get('.CalendarMonth_table')
      .last()
      .find('.CalendarDay')
      .contains('30')
      .click()
      .should('have.class', 'CalendarDay__blocked_out_of_range')
  })
})
