import { useTranslation } from '@titicaca/next-i18next'
import { useEventTrackerWithMetadata } from '@titicaca/react-contexts'
import styled from 'styled-components'

import { ExtraActionItem } from './extra-action-item'
import { ExtraActionSeperator } from './extra-action-seperator'
import { DeeplinkType } from './types'
import { useDeeplinkHref } from './use-deeplink-href'

interface Props {
  deeplinkPath: string
  deeplinkType?: DeeplinkType
  deeplinkEventLabel?: string
}

const ExtraActionLoungeHomeItem = styled.a`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 42px;
  height: 24px;
  padding: 5px 9px;
  border: 1px solid var(--color-mint);
  border-radius: 100px;
  margin-left: 6px;
  font-size: 12px;
  font-weight: bold;
  text-decoration: none;
  color: var(--color-mint);
`

export function PublicHeaderDeeplink({
  deeplinkType = 'default',
  deeplinkPath,
  deeplinkEventLabel,
}: Props) {
  const { t } = useTranslation('common-web')

  const trackEventWithMetadata = useEventTrackerWithMetadata()
  const deeplinkHref = useDeeplinkHref(deeplinkPath)

  return (
    <>
      {deeplinkType === 'default' ? (
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
      ) : (
        <ExtraActionLoungeHomeItem
          href={deeplinkHref}
          onClick={() =>
            trackEventWithMetadata({
              ga: ['헤더_라운지홈_선택', deeplinkEventLabel],
              pixel: {
                action: '헤더_라운지홈_선택',
              },
            })
          }
        >
          APP
        </ExtraActionLoungeHomeItem>
      )}
    </>
  )
}
