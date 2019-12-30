import moment from 'moment'

export function formatMonthTitle(d: Date): string {
  return `${d.getFullYear()}년 ${[d.getMonth() + 1]}월`
}

export function isValidDate(d: unknown): boolean {
  return d instanceof Date && !isNaN(d.getTime())
}

export function generatePaddedRange(from: Date, to: Date): Date[] {
  if (from.getMonth() === to.getMonth()) {
    return []
  }

  const dates = []

  const currentDate = moment(from)
  const endDate = moment(to)

  while (currentDate.diff(endDate) < 0) {
    const firstDayOfNextMonth = currentDate
      .clone()
      .add(1, 'month')
      .startOf('month')

    if (firstDayOfNextMonth.diff(endDate) <= 0) {
      const currentWeekday = currentDate
        .clone()
        .endOf('month')
        .startOf('week')

      const endOfWeek = firstDayOfNextMonth.endOf('week')

      while (currentWeekday.diff(endOfWeek) < 0) {
        dates.push(currentWeekday.toDate())
        currentWeekday.add(1, 'day')
      }
    }

    currentDate.add(1, 'month')
  }

  return dates
}
