import { MouseEventHandler } from 'react'
import { useTranslation } from '@titicaca/next-i18next'
import styled from 'styled-components'
import { findFoldedPosition } from '@titicaca/view-utilities'

import Comment from './comment'

const MAX_COMMENT_WITH_IMAGE_LINES = 3
const MAX_COMMENT_LINES = 6

const Unfold = styled.button`
  display: inline-block;
  color: #2987f0;
  outline: 0;
`

export default function FoldableComment({
  comment,
  hasImage,
  onUnfoldButtonClick,
  maxCommentLines: maxCommentLinesProp,
}: {
  comment: string
  hasImage: boolean
  onUnfoldButtonClick: MouseEventHandler<HTMLButtonElement>
  maxCommentLines?: number
}) {
  const maxCommentLines =
    maxCommentLinesProp || hasImage
      ? MAX_COMMENT_WITH_IMAGE_LINES
      : MAX_COMMENT_LINES

  const foldedPosition = findFoldedPosition(maxCommentLines, comment)

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
  const { t } = useTranslation('common-web')

  return (
    <Comment>
      {`${comment} …`}
      <Unfold onClick={onUnfoldButtonClick}>{t(['deobogi', '더보기'])}</Unfold>
    </Comment>
  )
}
