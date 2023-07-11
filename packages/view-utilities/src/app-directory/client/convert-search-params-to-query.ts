import { ReadonlyURLSearchParams } from 'next/navigation'

export function convertSearchParamsToQuery(
  searchParams: ReadonlyURLSearchParams,
) {
  return Array.from(searchParams.entries()).reduce(
    (query, [key, value]) => ({ ...query, [key]: value }),
    {},
  )
}
