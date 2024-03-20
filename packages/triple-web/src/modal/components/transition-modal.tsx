import { Modal, Text } from '@titicaca/tds-ui'
import styled from 'styled-components'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { ParseKeys } from 'i18next'

import { TransitionType } from '../constants'
import { useModal } from '../context'
import { useHashRouter } from '../../hash-router/use-hash-router'
import { trackEvent } from '../../event-tracking/utils/track-event'

const IconImage = styled.img`
  display: block;
  width: 66px;
  height: 66px;
  margin: 0 auto 10px;
`

const MODAL_CONTENT: {
  [key: string]: {
    description: ParseKeys<'triple-frontend'>
    eventLabel: string
  }
} = {
  [TransitionType.General]: {
    description:
      '일정 짜기부터 호텔, 투어・티켓 예약까지! 트리플로 한 번에 여행 준비하세요.',
    eventLabel: '',
  },
  [TransitionType.Gallery]: {
    description:
      '일정 짜기부터 호텔, 투어・티켓 예약까지! 트리플로 한 번에 여행 준비하세요.',
    eventLabel: '대표사진_선택',
  },
  [TransitionType.Scrap]: {
    description:
      '일정 짜기부터 호텔, 투어・티켓 예약까지! 트리플로 한 번에 여행 준비하세요.',
    eventLabel: 'POI저장',
  },
  [TransitionType.Review]: {
    description:
      '일정 짜기부터 호텔, 투어・티켓 예약까지! 트리플로 한 번에 여행 준비하세요.',
    eventLabel: '리뷰_리뷰글더보기_선택',
  },
  [TransitionType.ReviewWrite]: {
    description:
      '일정 짜기부터 호텔, 투어・티켓 예약까지! 트리플로 한 번에 여행 준비하세요.',
    eventLabel: '리뷰_리뷰쓰기',
  },
  [TransitionType.ReviewThumbnail]: {
    description:
      '일정 짜기부터 호텔, 투어・티켓 예약까지! 트리플로 한 번에 여행 준비하세요.',
    eventLabel: '리뷰_리뷰썸네일_클릭',
  },
  [TransitionType.ReviewSelect]: {
    description:
      '일정 짜기부터 호텔, 투어・티켓 예약까지! 트리플로 한 번에 여행 준비하세요.',
    eventLabel: '리뷰_리뷰내용_선택',
  },
  [TransitionType.ReviewCommentSelect]: {
    description:
      '일정 짜기부터 호텔, 투어・티켓 예약까지! 트리플로 한 번에 여행 준비하세요.',
    eventLabel: '리뷰_댓글_선택',
  },
  [TransitionType.OpenReviewList]: {
    description:
      '일정 짜기부터 호텔, 투어・티켓 예약까지! 트리플로 한 번에 여행 준비하세요.',
    eventLabel: '리뷰_리스트더보기_선택',
  },
  [TransitionType.Article]: {
    description:
      '일정 짜기부터 호텔, 투어・티켓 예약까지! 트리플로 한 번에 여행 준비하세요.',
    eventLabel: '추천가이드_더보기',
  },
  [TransitionType.Tna]: {
    description:
      '일정 짜기부터 호텔, 투어・티켓 예약까지! 트리플로 한 번에 여행 준비하세요.',
    eventLabel: '투어티켓_상품선택',
  },
  [TransitionType.Hotel]: {
    description:
      '일정 짜기부터 호텔, 투어・티켓 예약까지! 트리플로 한 번에 여행 준비하세요.',
    eventLabel: '호텔_선택',
  },
  [TransitionType.View]: {
    description:
      '일정 짜기부터 호텔, 투어・티켓 예약까지! 트리플로 한 번에 여행 준비하세요.',
    eventLabel: '컨텐츠_연속보기',
  },
  [TransitionType.AddPoisToTripSelect]: {
    description:
      '일정 짜기부터 호텔, 투어・티켓 예약까지! 트리플로 한 번에 여행 준비하세요.',
    eventLabel: '내일정으로담기_선택',
  },
  [TransitionType.Link]: {
    description:
      '일정 짜기부터 호텔, 투어・티켓 예약까지! 트리플로 한 번에 여행 준비하세요.',
    eventLabel: '링크선택',
  },
  [TransitionType.LoungeHome]: {
    description:
      '일정 짜기부터 호텔, 투어・티켓 예약까지! 트리플로 한 번에 여행 준비하세요.',
    eventLabel: '라운지홈',
  },
  [TransitionType.Community]: {
    description:
      '일정 짜기부터 호텔, 투어・티켓 예약까지! 트리플로 한 번에 여행 준비하세요.',
    eventLabel: '커뮤니티',
  },
}

export function TransitionModal() {
  const { t } = useTranslation('triple-frontend')
  const { transitionModalRef, eventTrackingContextForkRef } = useModal()
  const { removeUriHash, uriHash } = useHashRouter()

  let open = false
  let content:
    | {
        description: ParseKeys<'triple-frontend'>
        eventLabel: string
      }
    | undefined

  const matchData = uriHash.match(/^transition\.(.+)$/)

  if (matchData) {
    const transitionType = matchData[1]
    content = MODAL_CONTENT[transitionType]
    open = !!content
  }

  const handleCancelOrClose = () => removeUriHash()

  const handleClick = () => {
    transitionModalRef.current.onActionClick?.()

    trackEvent(
      {
        ga: [
          '설치유도팝업_선택',
          ['선택_트리플가기', content?.eventLabel].filter((v) => v).join('_'),
        ],
        fa: {
          action: '설치유도팝업_선택',
          referrer_event: content?.eventLabel,
        },
      },
      eventTrackingContextForkRef.current,
    )

    if (transitionModalRef.current.deepLink) {
      // TODO: default deepLink를 app home으로 정의하기?
      window.location.href = transitionModalRef.current.deepLink
    }
  }

  useEffect(() => {
    if (content) {
      const triggeredEventLabel = content.eventLabel

      trackEvent(
        {
          ga: ['설치유도팝업_노출', triggeredEventLabel],
          fa: {
            action: '설치유도팝업_노출',
            referrer_event: triggeredEventLabel,
          },
        },
        eventTrackingContextForkRef.current,
      )
    }
  }, [content, eventTrackingContextForkRef])

  return (
    <Modal open={open} onClose={handleCancelOrClose}>
      <Modal.Body>
        <IconImage src="https://assets.triple.guide/images/ico-popup-app@4x.png" />
        <Modal.Title>{t('여기는 트리플 앱이 필요해요')}</Modal.Title>
        {content?.description ? (
          <Text center alpha={0.7} size="small">
            {t(content.description)}
          </Text>
        ) : null}
      </Modal.Body>
      <Modal.Actions>
        <Modal.Action color="gray" onClick={handleCancelOrClose}>
          {t('취소')}
        </Modal.Action>
        <Modal.Action color="blue" onClick={handleClick}>
          {t('트리플 가기')}
        </Modal.Action>
      </Modal.Actions>
    </Modal>
  )
}
