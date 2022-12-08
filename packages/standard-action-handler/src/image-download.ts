import qs from 'qs'
import { UrlElements } from '@titicaca/view-utilities'

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

    const downloadAnchor = document.createElement('a')
    downloadAnchor.setAttribute('href', imageToDomString)
    downloadAnchor.setAttribute('download', 'image.jpeg')
    downloadAnchor.click()
    downloadAnchor.remove()

    // URL 더이상 사용되지 않아 메모리 누수를 방지
    windowUrl.revokeObjectURL(imageToDomString)

    return true
  }

  return false
}
