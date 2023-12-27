import { useTranslation } from 'react-i18next'
import { useTrackEventWithMetadata } from '@titicaca/triple-web'

import { ExtraActionItem } from './extra-action-item'
import { ExtraActionSeperator } from './extra-action-seperator'
import { DeeplinkComponent } from './types'
import { useDeeplinkHref } from './use-deeplink-href'

interface Props {
  deeplinkPath: string
  DeeplinkComponent?: DeeplinkComponent
}

export function PublicHeaderDeeplink({
  deeplinkPath,
  DeeplinkComponent,
}: Props) {
  const { t } = useTranslation('triple-frontend')

  const trackEventWithMetadata = useTrackEventWithMetadata()
  const deeplinkHref = useDeeplinkHref(deeplinkPath)

  return DeeplinkComponent ? (
    DeeplinkComponent({ deeplinkHref })
  ) : (
    <>
      <ExtraActionSeperator />
      <ExtraActionItem
        href={deeplinkHref}
        onClick={() =>
          trackEventWithMetadata({
            ga: ['헤더_설치유도_선택', '앱에서 보기'],
            fa: {
              action: '헤더_설치유도_선택',
            },
            facebookPixel: {
              action: '헤더_설치유도_선택',
            },
          })
        }
      >
        {t('앱에서 보기')}
      </ExtraActionItem>
    </>
  )
}
