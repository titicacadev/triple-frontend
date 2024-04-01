import { fireEvent, render, screen } from '@testing-library/react'
import moment from 'moment'

import { RangePicker } from './range-picker'

jest.mock('./use-public-holidays', () => ({
  usePublicHolidays: () => [],
}))

describe('RangePicker', () => {
  it('should select today when enableSameDay is false', () => {
    const handleDatesChange = jest.fn()
    render(
      <RangePicker
        startDate={null}
        endDate={null}
        onDatesChange={handleDatesChange}
        enableSameDay={false}
      />,
    )

    const dateCells = screen.getAllByRole('gridcell')
    const todayCell = dateCells.find((el) =>
      el.classList.contains('DayPicker-Day--today'),
    )
    if (!todayCell) {
      throw new Error('Cannot find today date cell')
    }

    fireEvent.click(todayCell)
    expect(handleDatesChange).toHaveBeenCalledWith({
      startDate: moment().format('YYYY-MM-DD'),
      endDate: null,
      nights: 0,
    })
  })

  it('should not select same day without enableSameDay', () => {
    let startDate = null
    const handleDatesChange = jest.fn(({ startDate: newStartDate }) => {
      startDate = newStartDate
    })

    const { rerender } = render(
      <RangePicker
        startDate={null}
        endDate={null}
        onDatesChange={handleDatesChange}
        enableSameDay={false}
      />,
    )

    const dateCells = screen.getAllByRole('gridcell')
    const targetCell = dateCells[0]
    if (!targetCell) {
      throw new Error('Cannot find target cell')
    }

    fireEvent.click(targetCell)

    rerender(
      <RangePicker
        startDate={startDate}
        endDate={null}
        onDatesChange={handleDatesChange}
        enableSameDay={false}
      />,
    )

    fireEvent.click(targetCell)
    expect(handleDatesChange).toHaveBeenCalledTimes(1)
  })
})
