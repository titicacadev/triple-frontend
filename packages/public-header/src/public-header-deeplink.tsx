import { useTranslation } from '@titicaca/next-i18next'
import { useEventTrackerWithMetadata } from '@titicaca/react-contexts'

import { ExtraActionItem } from './extra-action-item'
import { ExtraActionSeperator } from './extra-action-seperator'
import { DeeplinkComponent } from './types'
import { useDeeplinkHref } from './use-deeplink-href'

interface Props {
  deeplinkPath: string
  deeplinkComponent?: DeeplinkComponent
}

export function PublicHeaderDeeplink({
  deeplinkPath,
  deeplinkComponent,
}: Props) {
  const { t } = useTranslation('common-web')

  const trackEventWithMetadata = useEventTrackerWithMetadata()
  const deeplinkHref = useDeeplinkHref(deeplinkPath)

  return deeplinkComponent ? (
    deeplinkComponent({ deeplinkHref })
  ) : (
    <>
      <ExtraActionSeperator />
      <ExtraActionItem
        href={deeplinkHref}
        onClick={() =>
          trackEventWithMetadata({
            ga: ['헤더_설치유도_선택', '앱에서 보기'],
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
