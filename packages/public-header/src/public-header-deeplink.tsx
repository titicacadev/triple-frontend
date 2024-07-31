import { useTranslation } from '@titicaca/next-i18next'
import { useEventTrackerWithMetadata } from '@titicaca/react-contexts'

import { ExtraActionItem } from './extra-action-item'
import { ExtraActionSeparator } from './extra-action-separator'
import { useDeeplinkHref } from './use-deeplink-href'

interface Props {
  deeplinkPath: string
}

export function PublicHeaderDeeplink({ deeplinkPath }: Props) {
  const { t } = useTranslation('common-web')

  const trackEventWithMetadata = useEventTrackerWithMetadata()
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
            pixel: {
              action: '헤더_설치유도_선택',
            },
          })
        }
      >
        {t(['aebeseo-bogi', '앱에서 보기'])}
      </ExtraActionItem>
    </>
  )
}
