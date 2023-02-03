import { ComponentType, FC, useMemo } from 'react'
import { useTranslation } from '@titicaca/next-i18next'
import styled from 'styled-components'
import { Text } from '@titicaca/core-elements'
import {
  useEventTrackingContext,
  useHistoryFunctions,
  useUriHash,
} from '@titicaca/react-contexts'
import { DeepPartial } from 'utility-types'
import { I18nCommonWebKeys } from '@titicaca/i18n'

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
  Article = 'article',
  Tna = 'tna',
  Hotel = 'hotel',
  View = 'view',
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
  [TransitionType.Scrap]: {},
  [TransitionType.Review]: {
    eventLabel: '리뷰_리뷰글더보기',
  },
  [TransitionType.ReviewWrite]: {
    eventLabel: '리뷰_리뷰쓰기',
  },
  [TransitionType.ReviewThumbnail]: {
    eventLabel: '리뷰_리뷰사진썸네일',
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
    description: [
      'iljeong-jjagibuteo-hotel-tueotikes-yeyagggaji-teuripeulro-han-beone-yeohaeng-junbihaseyo.',
      '일정 짜기부터 호텔, 투어・티켓 예약까지!\n트리플로 한 번에 여행 준비하세요.',
    ],
    eventLabel: '컨텐츠_연속보기',
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
    const {
      description = [
        'soljighan-ribyu-110mangaewa-coesin-yeohaeng-sosigdeulggaji-aebeseo-pyeonhage-hwaginhaseyo',
        '솔직한 리뷰 110만개와 최신 여행 소식들까지 앱에서 편하게 확인하세요!',
      ],
      eventLabel = '',
    } = MODAL_CONTENT[matchData[1]] || {}

    const icon = 'https://assets.triple.guide/images/ico-popup-app@4x.png'

    return (
      <Modal open onClose={back}>
        <Modal.Body>
          <IconImage src={icon} />
          <Modal.Title>
            {t([
              'yeogineun-teuripeul-aebi-pilyohaeyo',
              '여기는 트리플 앱이 필요해요',
            ])}
          </Modal.Title>
          {description ? (
            <Text center alpha={0.7} size="small">
              {t(description)}
            </Text>
          ) : null}
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
                  '설치유도팝업',
                  ['선택_트리플가기', eventLabel].filter((v) => v).join('_'),
                ],
              })

              window.location.href = deepLink
            }}
          >
            {t(['teuripeul-gagi', '트리플 가기'])}
          </Modal.Action>
        </Modal.Actions>
      </Modal>
    )
  }

  return null
}

export function useTransitionModal(): { show: ShowTransitionModal } {
  const { push } = useHistoryFunctions()

  return useMemo(() => ({ show: (type) => push(`transition.${type}`) }), [push])
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
