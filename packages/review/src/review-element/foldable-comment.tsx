import React from 'react'
import styled from 'styled-components'
import Comment from './comment'

const MAX_COMMENT_LINES = 6
const CHARACTERS_PER_LINE = 25

const Unfold = styled.a`
  display: inline-block;
  color: #2987f0;
  text-decoration: none;
  cursor: pointer;
`

export default function FoldableComment({ comment }: { comment: string }) {
  const foldedPosition = findFoldedPosition(comment)

  return foldedPosition ? (
    <FoldedComment comment={comment.slice(0, foldedPosition)} />
  ) : (
    <Comment>{comment}</Comment>
  )
}

function FoldedComment({ comment }: { comment: string }) {
  return (
    <Comment>
      {`${comment} …`}
      <Unfold>더보기</Unfold>
    </Comment>
  )
}

function findFoldedPosition(comment?: string | null) {
  const lines = (comment || '').split('\n')

  let linesCount = 0
  let foldedIndex = 0
  for (const line of lines) {
    const rest = (MAX_COMMENT_LINES - linesCount) * CHARACTERS_PER_LINE

    if (line.length > rest) {
      return foldedIndex + rest
    }

    foldedIndex = foldedIndex + line.length
    linesCount = linesCount + 1 + Math.floor(line.length / CHARACTERS_PER_LINE)
  }

  return null
}
