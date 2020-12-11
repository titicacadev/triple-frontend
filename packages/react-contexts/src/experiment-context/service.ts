import { get, HttpResponse, RequestOptions } from '@titicaca/fetcher'

export interface ExperimentMeta {
  testId: number
  group: string
}

export async function getExperiment(
  slug: string,
  options?: RequestOptions,
): Promise<HttpResponse<ExperimentMeta>> {
  return get(`/api/abtest/${slug}`, options)
}
