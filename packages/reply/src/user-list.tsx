import React from 'react'
import { Container, FlexBox, Text } from '@titicaca/core-elements'
import styled, { css } from 'styled-components'

import { Reaction } from './types'

const ReactionUserPhoto = styled.img<{ index: number }>`
  ${({ index }) => css`
    margin-left: ${index !== 0 ? '-3px' : ''};
  `}

  width: 24px;
  height: 24px;
  border-radius: 20px;
  cursor: pointer;
`

const ThanksIcon = styled.img`
  margin-left: -4px;
  cursor: pointer;
`

export default function ReplyUserList({
  reactions: initialReactions,
  totalCount = 0,
  onClick,
}: {
  reactions: Reaction
  totalCount: number
  onClick: () => void
}) {
  const { reactions } = initialReactions

  return (
    <Container padding={{ left: 30, right: 30 }}>
      <FlexBox
        padding={{ top: 22 }}
        flex
        justifyContent="space-between"
        alignItems="center"
      >
        <FlexBox flex alignItems="center" cursor="pointer" onClick={onClick}>
          {reactions.slice(0, 3)?.map(({ user: { photo } }, idx) => (
            <ReactionUserPhoto key={idx} index={idx} src={photo} />
          ))}
          <ThanksIcon
            src="https://assets.triple.guide/images/img-lounge-thanks-list@3x.png"
            width={24}
            height={24}
          />
        </FlexBox>
        <FlexBox
          flex
          alignItems="center"
          cursor="pointer"
          padding={{ left: 12 }}
          onClick={onClick}
        >
          <Text inline size={14} bold>
            {reactions?.[0].user?.name}님
            {totalCount > 1 ? (
              <>
                <Text inline size={14} padding={{ left: 3, right: 3 }}>
                  외
                </Text>
                <Text inline size={14} color="blue" bold>
                  {totalCount}명
                </Text>
              </>
            ) : null}
          </Text>
          <img
            width={14}
            height={14}
            src="https://assets.triple.guide/images/ico-arrow-right-black@3x.png"
          />
        </FlexBox>
      </FlexBox>
    </Container>
  )
}
