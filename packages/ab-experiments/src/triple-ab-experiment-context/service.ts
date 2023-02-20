import { get, HttpResponse, RequestOptions } from '@titicaca/fetcher'

export interface TripleABExperimentMeta {
  testId: number
  group: string
}

export async function getTripleABExperiment(
  slug: string,
  options?: RequestOptions,
): Promise<HttpResponse<TripleABExperimentMeta>> {
  return get(`/api/abtest/${slug}`, options)
}
