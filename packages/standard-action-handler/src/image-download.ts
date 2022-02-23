import qs from 'qs'
import { UrlElements } from '@titicaca/view-utilities'
import fetch from 'isomorphic-fetch'

export default async function imageDownload({ path, query }: UrlElements) {
  if (path === '/web-action/image-download' && query) {
    const { imageId } = qs.parse(query, { ignoreQueryPrefix: true })

    const response = await fetch(`/api/images/media?ids=${imageId}`, {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    })

    const {
      media: [
        {
          sizes: {
            large: { url: imageUrl },
          },
        },
      ],
    } = await response.json()

    const image = await fetch(imageUrl)
    const blobImage = await image.blob()

    const windowUrl = window.URL || window.webkitURL
    const imageToDomString = windowUrl.createObjectURL(blobImage)

    // ie에서는 Blob 저장이 정상적으로 이루어지지 않으므로 해당 케이스 추가
    if (window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(imageToDomString, 'image')
    } else {
      const downloadAnchor = document.createElement('a')
      downloadAnchor.setAttribute('href', imageToDomString)
      downloadAnchor.setAttribute('download', 'image')
      downloadAnchor.click()
      downloadAnchor.remove()

      // URL 더이상 사용되지 않아 메모리 누수를 위해 제거
      setTimeout(() => windowUrl.revokeObjectURL(imageToDomString), 60)
    }
    return true
  }

  return false
}
