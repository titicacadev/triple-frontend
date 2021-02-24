import React, { useEffect, useState } from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { text, select, boolean } from '@storybook/addon-knobs'
import { ImageCarousel } from '@titicaca/poi-detail'
import {
  ImagesProvider,
  UserAgentProvider,
  generateUserAgentValues,
} from '@titicaca/react-contexts'
import { ImageMeta } from '@titicaca/type-definitions'

storiesOf('poi-detail / ImageCarousel', module)
  .add('Attraction / Restaurant', () => {
    const resourceId = text('POI ID', 'e889ae22-0336-4cf9-8fbb-742b95fd09d0')
    const resourceType = select(
      'POI Type',
      ['attraction', 'restaurant', 'hotel'],
      'attraction',
    )
    const userAgentValues = generateUserAgentValues(
      text(
        'User-Agent',
        'Mozilla/5.0 (iPhone; CPU iPhone OS 12_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;Triple-Android/4.2.0',
      ),
    )
    const hasBusinessHours = boolean('운영시간 있음', false)
    const onBusinessHoursClick = hasBusinessHours
      ? action('onBusinessHoursClick')
      : undefined
    const todayBusinessHours = boolean('휴무일', false)
      ? undefined
      : '10:00 - 12:00 / 15:00 - 19:00'
    const currentBusinessHours = boolean('현재 영업 중', false)
      ? '10:00 - 12:00'
      : undefined
    const permanentlyClosed = boolean('운영종료', false)

    return (
      <UserAgentProvider value={userAgentValues}>
        <ImagesProvider
          source={{
            id: resourceId,
            type: resourceType,
          }}
        >
          <ImageCarousel
            onImageClick={action('onImageClick')}
            onCTAClick={action('onCTAClick')}
            onPlaceholderClick={action('onPlaceholderClick')}
            onBusinessHoursClick={onBusinessHoursClick}
            todayBusinessHours={
              hasBusinessHours ? todayBusinessHours : undefined
            }
            currentBusinessHours={
              hasBusinessHours ? currentBusinessHours : undefined
            }
            permanentlyClosed={permanentlyClosed}
          />
        </ImagesProvider>
      </UserAgentProvider>
    )
  })
  .add('Hotel', () => {
    const [initialImages, setInitialImages] = useState<{
      images: ImageMeta[]
      total: number
    } | null>(null)
    const resourceId = text('Hotel ID', '1ff98b6f-ca34-4961-ae29-fa52c8ca2e21')
    const resourceType = 'hotel'
    const userAgentValues = generateUserAgentValues(
      text(
        'User-Agent',
        'Mozilla/5.0 (iPhone; CPU iPhone OS 12_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;Triple-Android/4.2.0',
      ),
    )
    const permanentlyClosed = boolean('운영종료', false)

    useEffect(() => {
      async function fetchAndSetImages() {
        const response = await fetch(
          `/api/content/images?resourceId=${resourceId}&resourceType=${resourceType}&from=0&size=10`,
        )

        const { data, total } = await response.json()

        setInitialImages({ images: data, total })
      }
      fetchAndSetImages()
    }, [resourceId, resourceType])

    return initialImages ? (
      <UserAgentProvider value={userAgentValues}>
        <ImagesProvider
          images={initialImages.images}
          total={initialImages.total}
          source={{
            id: resourceId,
            type: resourceType,
          }}
        >
          <ImageCarousel
            onImageClick={action('onImageClick')}
            onCTAClick={action('onCTAClick')}
            onPlaceholderClick={action('onPlaceholderClick')}
            permanentlyClosed={permanentlyClosed}
          />
        </ImagesProvider>
      </UserAgentProvider>
    ) : (
      <div>Loading</div>
    )
  })
