import { get, RequestOptions, HttpResponse } from '@titicaca/fetcher'

export interface Holiday {
  name: string
  date: string
  type: string
  country: string
}

export async function fetchPublicHolidays(
  { from, to }: { from: string; to: string },
  options: RequestOptions,
): Promise<HttpResponse<Holiday[]>> {
  return get(`/api/calendar/holidays/KR/${from}/${to}`, options)
}
