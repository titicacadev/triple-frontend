import qs from 'qs'
import { UrlElements } from '@titicaca/view-utilities'

export default async function imageDownload({ path, query }: UrlElements) {
  if (path === '/web-action/image-download' && query) {
    const { imageId } = qs.parse(query, { ignoreQueryPrefix: true })
    const imagesApiHref = 'api/images/download/' + imageId

    const downloadAnchor = document.createElement('a')
    downloadAnchor.setAttribute('href', imagesApiHref)
    downloadAnchor.setAttribute('download', '')
    downloadAnchor.click()

    return true
  }

  return false
}
