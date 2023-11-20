import { Modal, Text } from '@titicaca/tds-ui'
import styled from 'styled-components'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { ParseKeys } from 'i18next'

import { useModal } from '../contexts'
import { trackEvent } from '../utils'

const IconImage = styled.img`
  display: block;
  width: 66px;
  height: 66px;
  margin: 0 auto 10px;
`

// TODO: hash-router-context 사용
function removeUriHash() {}

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
  [key: string]: {
    description?: ParseKeys[]
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
    description: [
      'iljeong-jjagibuteo-hotel-tueotikes-yeyagggaji-teuripeulro-han-beone-yeohaeng-junbihaseyo.',
      '일정 짜기부터 호텔, 투어・티켓 예약까지!\n트리플로 한 번에 여행 준비하세요.',
    ],
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

export function TransitionModal() {
  const { t } = useTranslation()
  const { transitionModalRef, eventTrackingContextForkRef } = useModal()

  let open = false
  let content:
    | {
        description?: ParseKeys[]
        eventLabel?: string
      }
    | undefined

  // TODO: hash-router-context와 연결
  const uriHash = ''
  const matchData = uriHash.match(/^transition\.(.+)$/)

  if (matchData) {
    const transitionType = matchData[1]
    content = MODAL_CONTENT[transitionType]
    open = !!content
  }

  const handleClick = () => {
    transitionModalRef.current.onActionClick?.()

    // TODO: event-tracking context와 연결
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
      const triggeredEventLabel = content.eventLabel ?? ''

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
    <Modal open={open} onClose={removeUriHash}>
      <Modal.Body>
        <IconImage src="https://assets.triple.guide/images/ico-popup-app@4x.png" />
        <Modal.Title>
          {t([
            'yeogineun-teuripeul-aebi-pilyohaeyo',
            '여기는 트리플 앱이 필요해요',
          ])}
        </Modal.Title>
        {content?.description ? (
          <Text center alpha={0.7} size="small">
            {t(content.description)}
          </Text>
        ) : null}
      </Modal.Body>
      <Modal.Actions>
        <Modal.Action color="gray" onClick={removeUriHash}>
          {t(['cwiso', '취소'])}
        </Modal.Action>
        <Modal.Action color="blue" onClick={handleClick}>
          {t(['teuripeul-gagi', '트리플 가기'])}
        </Modal.Action>
      </Modal.Actions>
    </Modal>
  )
}
