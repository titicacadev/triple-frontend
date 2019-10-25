interface ContentSource {
  regionId: string
  type: 'article' | 'restaurant' | 'hotel' | 'attraction'
  id: string
}

interface UTMContext {
  source: string
  medium: string
  campaign: string
  term?: string
  content?: string
}

/**
 * 콘텐츠 데이터를 generator parameter 값으로 변환합니다.
 *
 * @param source regionId, type, id를 가진 콘텐츠 데이터
 */
export function injectContentSource({ regionId, type, id }: ContentSource) {
  return { path: `/regions/${regionId}/${type}s/${id}` }
}

/**
 * utm 콘텍스트를 generator parameter 값으로 변환합니다.
 * @param utmContext
 */
export function injectUTMContext({
  source,
  medium,
  campaign,
  term,
}: Partial<UTMContext> = {}) {
  const adProvider = source && medium ? `${source}_${medium}` : undefined

  return {
    ...(campaign ? { campaign } : {}),
    ...(adProvider ? { adSet: adProvider, channel: adProvider } : {}),
    ...(term ? { ad: term } : {}),
  }
}
