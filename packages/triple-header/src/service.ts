import { get } from '@titicaca/fetcher'

export const ARTICLE_ANIMATION_STORAGE_TYPE = 'lottie-animation-v1'

export async function getStorage({
  type = ARTICLE_ANIMATION_STORAGE_TYPE,
  id,
}: {
  type?: string
  id?: string
}) {
  if (!id) {
    throw new Error('Id가 없습니다.')
  }

  const response = await get<{ data: string }>(
    `/api/storage/storages/${type}/${id}`,
  )

  if (!response.ok) {
    throw new Error('Request failed')
  }

  const {
    parsedBody: { data },
  } = response

  return data
}
