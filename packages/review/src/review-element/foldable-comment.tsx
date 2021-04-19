import React, { MouseEventHandler } from 'react'
import styled from 'styled-components'

import Comment from './comment'

const MAX_COMMENT_WITH_IMAGE_LINES = 3
const MAX_COMMENT_LINES = 6
const CHARACTERS_PER_LINE = 25

const Unfold = styled.button`
  display: inline-block;
  color: #2987f0;
  background-color: transparent;
  border: 0;
  outline: 0;
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

function findFoldedPosition(maxLines: number, comment?: string | null) {
  const lines = (comment || '').split('\n')

  let linesCount = 0
  let foldedIndex = 0
  for (const line of lines) {
    const rest = (maxLines - linesCount) * CHARACTERS_PER_LINE

    if (line.length > rest) {
      return foldedIndex + rest
    }

    foldedIndex = foldedIndex + line.length
    linesCount = linesCount + 1 + Math.floor(line.length / CHARACTERS_PER_LINE)
  }

  return null
}
