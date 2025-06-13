import { useMemo, useEffect, useState } from 'react'
import moment from 'moment'
import { NEED_LOGIN_IDENTIFIER } from '@titicaca/fetcher'

import { fetchPublicHolidays, Holiday } from './service'

const EMPTY_ARRAY: Holiday[] = []

export function usePublicHolidays({
  numberOfMonths,
  skip = false,
}: {
  numberOfMonths: number
  skip?: boolean
}) {
  const [publicHolidays, setPublicHolidays] = useState<Holiday[]>()

  const from = moment().startOf('month').format('YYYY-MM-DD')
  const to = moment()
    .add(numberOfMonths, 'month')
    .endOf('month')
    .format('YYYY-MM-DD')

  useEffect(() => {
    if (skip) {
      return
    }

    if (from && to) {
      const fetchData = async () => {
        const response = await fetchPublicHolidays({ from, to }, {})

        if (response !== NEED_LOGIN_IDENTIFIER && response.ok === true) {
          const { parsedBody } = response

          setPublicHolidays(parsedBody)
        }
      }

      fetchData()
    }
  }, [from, to, skip])

  return useMemo(
    () => (publicHolidays || EMPTY_ARRAY).map(({ date }) => new Date(date)),
    [publicHolidays],
  )
}
