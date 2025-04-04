import { authGuardedFetchers, RequestOptions } from '@titicaca/fetcher'

export interface TripleABExperimentMeta {
  testId: number
  group: string
}

export async function getTripleABExperiment(
  slug: string,
  options?: RequestOptions,
) {
  return authGuardedFetchers.get<TripleABExperimentMeta>(
    `/api/abtest/${slug}`,
    options,
  )
}
