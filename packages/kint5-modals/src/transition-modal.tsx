import { ComponentType, FC, useMemo } from 'react'
import { useTranslation } from '@titicaca/next-i18next'
import styled from 'styled-components'
import {
  useEventTrackingContext,
  useHistoryFunctions,
  useUriHash,
} from '@titicaca/react-contexts'
import { DeepPartial } from 'utility-types'
import { I18nCommonWebKeys } from '@titicaca/i18n'
import { Text } from '@titicaca/kint5-core-elements'

import { Modal } from './modal'

type ShowTransitionModal = (type: TransitionType) => void

const IconImage = styled.img`
  display: block;
  width: 66px;
  height: 66px;
  margin: 0 auto 10px;
`

export enum TransitionType {
  General = 'general',
  Gallery = 'gallery',
  Scrap = 'scrap',
  Review = 'review',
  ReviewWrite = 'reviewWrite',
  ReviewThumbnail = 'reviewThumbnail',
  ReviewSelect = 'reviewSelect',
  ReviewCommentSelect = 'reviewCommentSelect',
  OpenReviewList = 'openReviewList',
  Article = 'article',
  Tna = 'tna',
  Hotel = 'hotel',
  View = 'view',
  AddPoisToTripSelect = 'addPoisToTripSelect',
  Link = 'link',
  LoungeHome = 'loungeHome',
  Community = 'community',
}

const MODAL_CONTENT: {
  [type: string]: {
    description?: (keyof I18nCommonWebKeys)[]
    eventLabel?: string
  }
} = {
  [TransitionType.General]: {},
  [TransitionType.Gallery]: {
    eventLabel: '대표사진_선택',
  },
  [TransitionType.Scrap]: {
    eventLabel: 'POI저장',
  },
  [TransitionType.Review]: {
    eventLabel: '리뷰_리뷰글더보기_선택',
  },
  [TransitionType.ReviewWrite]: {
    eventLabel: '리뷰_리뷰쓰기',
  },
  [TransitionType.ReviewThumbnail]: {
    eventLabel: '리뷰_리뷰썸네일_클릭',
  },
  [TransitionType.ReviewSelect]: {
    eventLabel: '리뷰_리뷰내용_선택',
  },
  [TransitionType.ReviewCommentSelect]: {
    eventLabel: '리뷰_댓글_선택',
  },
  [TransitionType.OpenReviewList]: {
    eventLabel: '리뷰_리스트더보기_선택',
  },
  [TransitionType.Article]: {
    eventLabel: '추천가이드_더보기',
  },
  [TransitionType.Tna]: {
    eventLabel: '투어티켓_상품선택',
  },
  [TransitionType.Hotel]: {
    eventLabel: '호텔_선택',
  },
  [TransitionType.View]: {
    eventLabel: '컨텐츠_연속보기',
  },
  [TransitionType.AddPoisToTripSelect]: {
    eventLabel: '내일정으로담기_선택',
  },
  [TransitionType.Link]: {
    eventLabel: '링크선택',
  },
  [TransitionType.LoungeHome]: {
    eventLabel: '라운지홈',
  },
  [TransitionType.Community]: {
    eventLabel: '커뮤니티',
  },
}

export function TransitionModal({
  deepLink,
  onActionClick,
}: {
  deepLink: string
  onActionClick?: () => void
}) {
  const { t } = useTranslation('common-web')

  const uriHash = useUriHash()
  const { back } = useHistoryFunctions()
  const { trackEvent } = useEventTrackingContext()
  const matchData = (uriHash || '').match(/^transition\.(.+)$/)

  if (matchData && Object.keys(MODAL_CONTENT).includes(matchData[1])) {
    const { eventLabel = '' } = MODAL_CONTENT[matchData[1]] || {}

    const icon = 'https://assets.triple.guide/images/triple-korea-app-icon.png'

    return (
      <Modal open onClose={back}>
        <Modal.Body css={{ padding: '40px 30px 30px' }}>
          <IconImage src={icon} />
          <Text css={{ fontSize: 19, marginTop: 20, fontWeight: 700 }}>
            {t([
              'yeogineun-triple-korea-aebi-pilyohaeyo',
              '여기는 TRIPLE Korea 앱이 필요해요',
            ])}
          </Text>
        </Modal.Body>
        <Modal.Actions>
          <Modal.Action color="gray" onClick={back}>
            {t(['cwiso', '취소'])}
          </Modal.Action>
          <Modal.Action
            color="blue"
            onClick={() => {
              onActionClick?.()

              trackEvent({
                ga: [
                  '설치유도팝업_선택',
                  ['선택_트리플가기', eventLabel].filter((v) => v).join('_'),
                ],
                fa: {
                  action: '설치유도팝업_선택',
                  referrer_event: eventLabel,
                },
              })

              window.location.href = deepLink
            }}
          >
            {t(['triple-korea-gagi', 'TRIPLE Korea 가기'])}
          </Modal.Action>
        </Modal.Actions>
      </Modal>
    )
  }

  return null
}

export function useTransitionModal(): { show: ShowTransitionModal } {
  const { trackEvent } = useEventTrackingContext()
  const { push } = useHistoryFunctions()

  return useMemo(
    () => ({
      show: (type) => {
        const triggeredEventLabel = MODAL_CONTENT[type].eventLabel ?? ''

        trackEvent({
          ga: ['설치유도팝업_노출', triggeredEventLabel],
          fa: {
            action: '설치유도팝업_노출',
            referrer_event: triggeredEventLabel,
          },
        })
        push(`transition.${type}`)
      },
    }),
    [push, trackEvent],
  )
}

export interface WithTransitionModalBaseProps {
  showTransitionModal: ShowTransitionModal
}

export function withTransitionModal<
  P extends DeepPartial<WithTransitionModalBaseProps>,
>(Component: ComponentType<P>): FC<Omit<P, 'showTransitionModal'>> {
  return function TransitionModalComponent(props) {
    const { push } = useHistoryFunctions()

    return (
      <Component
        {...({
          ...props,
          showTransitionModal: (type) => push(`transition.${type}`),
        } as P)}
      />
    )
  }
}