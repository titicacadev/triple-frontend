import { get, HttpResponse, RequestOptions } from '@titicaca/fetcher'

export interface ABExperimentMeta {
  testId: number
  group: string
}

export async function getABExperiment(
  slug: string,
  options?: RequestOptions,
): Promise<HttpResponse<ABExperimentMeta>> {
  return get(`/api/abtest/${slug}`, options)
}
