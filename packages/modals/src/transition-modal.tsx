import React, { ComponentType, FC, useMemo } from 'react'
import styled from 'styled-components'
import { Text } from '@titicaca/core-elements'
import {
  useEventTrackingContext,
  useURIHash,
  useHistoryFunctions,
} from '@titicaca/react-contexts'
import { DeepPartial } from 'utility-types'

import Actions from './actions'
import Modal from './modal-base'

type ShowTransitionModal = (type: TransitionType) => void

const IconImage = styled.img`
  display: block;
  width: 66px;
  height: 66px;
  margin: 40px auto 10px auto;
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
  [type in TransitionType]: {
    icon?: string
    title?: string
    description?: string
    eventLabel?: string
  }
} = {
  [TransitionType.General]: {
    icon: 'https://assets.triple.guide/images/ico-popup-app@4x.png',
    description: '더 많은 정보를 보려면\n트리플에 방문해보세요!',
  },
  [TransitionType.Gallery]: {
    icon: 'https://assets.triple.guide/images/ico-popup-gallery@4x.png',
    description: '사진은 앱에서 더 편리하게\n확인할 수 있어요.',
    eventLabel: '대표사진_선택',
  },
  [TransitionType.Scrap]: {
    icon: 'https://assets.triple.guide/images/ico-popup-scrap@4x.png',
    title: '저장은 앱에서만 가능해요',
    description: '가고 싶은 장소를 저장하고, 여행할 때 실시간으로 꺼내 보세요.',
  },
  [TransitionType.Review]: {
    icon: 'https://assets.triple.guide/images/ico-popup-review@4x.png',
    description: '리뷰는 앱에서 더 편리하게\n확인할 수 있어요.',
    eventLabel: '리뷰_리뷰글더보기',
  },
  [TransitionType.ReviewWrite]: {
    icon: 'https://assets.triple.guide/images/ico-popup-review@4x.png',
    description: '리뷰는 앱에서 작성할 수 있어요.',
    eventLabel: '리뷰_리뷰쓰기',
  },
  [TransitionType.ReviewThumbnail]: {
    icon: 'https://assets.triple.guide/images/ico-popup-gallery@4x.png',
    description: '사진은 앱에서 더 편리하게\n확인할 수 있어요.',
    eventLabel: '리뷰_리뷰사진썸네일',
  },
  [TransitionType.Article]: {
    icon: 'https://assets.triple.guide/images/ico-popup-guidebook@4x.png',
    description:
      '여행의 핵심 정보만 쏙쏙! 여행에 꼭 필요한 정보를 무료로 확인하세요.',
    eventLabel: '추천가이드_더보기',
  },
  [TransitionType.Tna]: {
    icon: 'https://assets.triple.guide/images/ico-popup-tna@4x.png',
    description: '투어티켓 예약은\n앱에서 더 편리하게 할 수 있어요',
    eventLabel: '투어티켓_상품선택',
  },
  [TransitionType.Hotel]: {
    icon: 'https://assets.triple.guide/images/ico-popup-hotel@4x.png',
    description: '호텔 예약은\n앱에서 더 편리하게 할 수 있어요.',
    eventLabel: '호텔_선택',
  },
  [TransitionType.View]: {
    icon: 'https://assets.triple.guide/images/ico-popup-app@4x.png',
    description:
      '일정 짜기부터 호텔, 투어・티켓 예약까지!\n트리플로 한 번에 여행 준비하세요.',
    eventLabel: '컨텐츠_연속보기',
  },
}

export function TransitionModal({ deepLink }: { deepLink: string }) {
  const uriHash = useURIHash()
  const { back } = useHistoryFunctions()
  const { trackEvent } = useEventTrackingContext()
  const matchData = (uriHash || '').match(/^transition\.(.+)$/)

  if (matchData && Object.keys(MODAL_CONTENT).includes(matchData[1])) {
    const { icon, title, description, eventLabel } =
      MODAL_CONTENT[matchData[1] as TransitionType] || {}

    return (
      <Modal open onClose={back}>
        <IconImage src={icon} />
        {title ? (
          <Text bold center size="big" color="gray" padding={{ bottom: 10 }}>
            {title}
          </Text>
        ) : null}
        {description ? (
          <Text
            center
            alpha={0.7}
            size="small"
            margin={{ bottom: 30, left: 30, right: 30 }}
          >
            {description}
          </Text>
        ) : null}

        <Actions
          negative={{
            text: '취소',
            onClick: back,
          }}
          positive={{
            text: '트리플 가기',
            onClick: () => {
              trackEvent({
                ga: [
                  '설치유도팝업',
                  ['선택_트리플가기', eventLabel].filter((v) => v).join('_'),
                ],
              })

              window.location.href = deepLink
            },
          }}
        />
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
  P extends DeepPartial<WithTransitionModalBaseProps>
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
