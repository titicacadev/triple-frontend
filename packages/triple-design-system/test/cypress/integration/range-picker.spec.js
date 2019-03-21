describe('DayPicker', () => {
  beforeEach(() => {
    cy.visit('/range-picker.html')
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
    cy.get('.CalendarMonth_table')
      .last()
      .find('.CalendarDay')
      .contains('28')
      .should('have.class', 'CalendarDay__blocked_out_of_range')
  })

  it('block day active click check', () => {
    cy.get('.CalendarMonth_table')
      .last()
      .find('.CalendarDay')
      .contains('28')
      .click()
      .should('have.class', 'CalendarDay__blocked_out_of_range')
  })

  it('check range class', () => {
    cy.get('.CalendarDay__today')
      .click()
      .get('.CalendarMonth_table')
      .eq(2)
      .find('.CalendarDay')
      .contains('15')
      .click()
      .get('.CalendarMonth_table')
      .eq(1)
      .find('.CalendarDay')
      .contains('15')
      .should('have.class', 'CalendarDay__selected_span')
  })
})
