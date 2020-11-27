import { useMemo, useEffect, useState } from 'react'
import moment from 'moment'

import { fetchPublicHolidays, Holiday } from './service'

const EMPTY_ARRAY: Holiday[] = []

export function usePublicHolidays({
  numberOfMonths,
}: {
  numberOfMonths: number
}) {
  const [publicHolidays, setPublicHolidays] = useState<Holiday[]>()

  const from = moment().startOf('month').format('YYYY-MM-DD')
  const to = moment()
    .add(numberOfMonths, 'month')
    .endOf('month')
    .format('YYYY-MM-DD')

  useEffect(() => {
    if (from && to) {
      const fetchData = async () => {
        const { result } = await fetchPublicHolidays({ from, to }, {})

        if (result) {
          setPublicHolidays(result)
        }
      }
      fetchData()
    }
  }, [from, to])

  return useMemo(
    () => (publicHolidays || EMPTY_ARRAY).map(({ date }) => new Date(date)),
    [publicHolidays],
  )
}
