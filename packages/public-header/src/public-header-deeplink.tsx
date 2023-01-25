import { useTranslation } from '@titicaca/next-i18next'
import { useEventTrackerWithMetadata } from '@titicaca/react-contexts'
import { PropsWithChildren } from 'react'

import { ExtraActionItem } from './extra-action-item'
import { ExtraActionSeperator } from './extra-action-seperator'
import { useDeeplinkHref } from './use-deeplink-href'

interface Props {
  deeplinkPath: string
  isLoungeHome?: boolean
}

export function PublicHeaderDeeplink({
  deeplinkPath,
  isLoungeHome,
  children,
}: PropsWithChildren<Props>) {
  const { t } = useTranslation('common-web')

  const trackEventWithMetadata = useEventTrackerWithMetadata()
  const deeplinkHref = useDeeplinkHref(deeplinkPath)

  return (
    <>
      {isLoungeHome ? (
        { children }
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
      )}
    </>
  )
}
