import React from 'react'
import { Image, FlexBox, Text } from '@titicaca/core-elements'
import styled, { css } from 'styled-components'
import { formatTimestamp } from '@titicaca/view-utilities'

import { Itinerary } from './types'
import { ImageIcon } from './reply'

const ReactionDataText = styled(Text)<{ index: number }>`
  ${({ index }) =>
    index !== 2 &&
    css`
      :after {
        padding: 0 7px;
        font-size: 14px;
        content: '·';
      `}
`

export default function Reactions({
  itinerary: {
    createdAt,
    applicationCount,
    reactions: { thanks },
    replyBoard,
  },
  onClick,
}: {
  itinerary: Pick<
    Itinerary,
    'applicationCount' | 'createdAt' | 'replyBoard' | 'reactions'
  >
  onClick: () => void
}) {
  const reactionData = [
    {
      value: thanks?.count || 0,
      url: 'https://assets.triple.guide/images/btn-lounge-thanks-off@3x.png',
    },
    {
      value: replyBoard
        ? replyBoard?.rootMessagesCount + replyBoard?.childMessagesCount
        : 0,
      url: 'https://assets.triple.guide/images/btn-lounge-comment-off@3x.png',
    },
    {
      value: applicationCount,
      url: 'https://assets.triple.guide/images/ico_lounge_download_gray@3x.png',
    },
  ]

  return (
    <FlexBox
      padding={{ left: 30, right: 30 }}
      flex
      justifyContent="space-between"
      alignItems="center"
    >
      <FlexBox flex cursor="pointer" alignItems="center">
        {reactionData.map(({ url, value }, idx) => (
          <FlexBox
            key={idx}
            flex
            alignItems="center"
            onClick={idx !== 2 ? onClick : undefined}
          >
            <Image>
              <ImageIcon src={url} cursor="pointer" />
            </Image>
            <ReactionDataText inline size={14} color="gray300" index={idx} bold>
              {value}
            </ReactionDataText>
          </FlexBox>
        ))}
      </FlexBox>
      <FlexBox flex alignItems="center">
        <Text padding={{ right: 11 }} size={12} color="gray300" bold>
          {formatTimestamp(createdAt)}
        </Text>
        <Image>
          <ImageIcon
            isMoreIcon
            cursor="pointer"
            src="https://assets.triple.guide/images/btn-review-more@4x.png"
            onClick={onClick}
          />
        </Image>
      </FlexBox>
    </FlexBox>
  )
}
