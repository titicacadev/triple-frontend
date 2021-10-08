import { useEventTrackerWithMetadata } from '@titicaca/react-contexts'
import React from 'react'

import { ExtraActionItem } from './extra-action-item'
import { ExtraActionSeperator } from './extra-action-seperator'
import { useDeeplinkHref } from './useDeeplinkHref'

interface Props {
  deeplinkPath: string
}

export function PublicHeaderDeeplink({ deeplinkPath }: Props) {
  const trackEventWithMetadata = useEventTrackerWithMetadata()
  const deeplinkHref = useDeeplinkHref(deeplinkPath)

  return (
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
        앱에서 보기
      </ExtraActionItem>
    </>
  )
}
