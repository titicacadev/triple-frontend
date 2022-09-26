import { fireEvent, render } from '@testing-library/react'
import moment from 'moment'

import RangePicker from './range-picker'

jest.mock('./use-public-holidays', () => ({
  usePublicHolidays: () => [],
}))

describe('RangePicker', () => {
  it('should select today when enableSameDay is false', () => {
    const handleDatesChange = jest.fn()
    const { getAllByRole } = render(
      <RangePicker
        startDate={null}
        endDate={null}
        onDatesChange={handleDatesChange}
        enableSameDay={false}
      />,
    )

    const dateCells = getAllByRole('gridcell')
    const todayCell = dateCells.find((el) =>
      el.classList.contains('DayPicker-Day--today'),
    )
    if (!todayCell) {
      throw new Error('Cannot find today date cell')
    }

    fireEvent.click(todayCell)
    expect(handleDatesChange).toBeCalledWith({
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

    const { getAllByRole, rerender } = render(
      <RangePicker
        startDate={null}
        endDate={null}
        onDatesChange={handleDatesChange}
        enableSameDay={false}
      />,
    )

    const dateCells = getAllByRole('gridcell')
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
    expect(handleDatesChange).toBeCalledTimes(1)
  })
})
