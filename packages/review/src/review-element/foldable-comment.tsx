import { MouseEventHandler } from 'react'
import styled from 'styled-components'
import { findFoldedPosition } from '@titicaca/view-utilities'

import Comment from './comment'

const MAX_COMMENT_WITH_IMAGE_LINES = 3
const MAX_COMMENT_LINES = 6

const Unfold = styled.button`
  display: inline-block;
  color: #2987f0;
  background-color: transparent;
  border: 0;
  outline: 0;
  font-size: inherit;
  text-decoration: none;
  cursor: pointer;
`

export default function FoldableComment({
  comment,
  hasImage,
  onUnfoldButtonClick,
}: {
  comment: string
  hasImage: boolean
  onUnfoldButtonClick: MouseEventHandler<HTMLButtonElement>
}) {
  const foldedPosition = findFoldedPosition(
    hasImage ? MAX_COMMENT_WITH_IMAGE_LINES : MAX_COMMENT_LINES,
    comment,
  )

  return foldedPosition ? (
    <FoldedComment
      comment={comment.slice(0, foldedPosition)}
      onUnfoldButtonClick={onUnfoldButtonClick}
    />
  ) : (
    <Comment>{comment}</Comment>
  )
}

function FoldedComment({
  comment,
  onUnfoldButtonClick,
}: {
  comment: string
  onUnfoldButtonClick: MouseEventHandler<HTMLButtonElement>
}) {
  return (
    <Comment>
      {`${comment} …`}
      <Unfold onClick={onUnfoldButtonClick}>더보기</Unfold>
    </Comment>
  )
}
