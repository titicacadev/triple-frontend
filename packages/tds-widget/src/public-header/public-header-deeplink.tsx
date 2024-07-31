import { useTranslation } from 'react-i18next'
import { useTrackEventWithMetadata } from '@titicaca/triple-web'

import { ExtraActionItem } from './extra-action-item'
import { ExtraActionSeparator } from './extra-action-separator'
import { useDeeplinkHref } from './use-deeplink-href'

interface Props {
  deeplinkPath: string
}

export function PublicHeaderDeeplink({ deeplinkPath }: Props) {
  const { t } = useTranslation('triple-frontend')

  const trackEventWithMetadata = useTrackEventWithMetadata()
  const deeplinkHref = useDeeplinkHref(deeplinkPath)

  return (
    <>
      <ExtraActionSeparator />
      <ExtraActionItem
        href={deeplinkHref}
        onClick={() =>
          trackEventWithMetadata({
            ga: ['헤더_설치유도_선택', '앱에서 보기'],
            fa: {
              action: '헤더_설치유도_선택',
            },
            metaPixel: {
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
