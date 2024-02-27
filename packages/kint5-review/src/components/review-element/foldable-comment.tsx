import { MouseEventHandler } from 'react'
import { useTranslation } from '@titicaca/next-i18next'
import { CSSObject } from 'styled-components'
import { findFoldedPosition } from '@titicaca/view-utilities'

import Comment from './comment'

const MAX_COMMENT_WITH_IMAGE_LINES = 3
const MAX_COMMENT_LINES = 3

export default function FoldableComment({
  comment,
  hasImage,
  onUnfoldButtonClick,
  maxCommentLines: maxCommentLinesProp,
  unfoldTextCss,
}: {
  comment: string
  hasImage: boolean
  onUnfoldButtonClick: MouseEventHandler<HTMLButtonElement>
  maxCommentLines?: number
  unfoldTextCss?: CSSObject
}) {
  const maxCommentLines =
    maxCommentLinesProp || hasImage
      ? MAX_COMMENT_WITH_IMAGE_LINES
      : MAX_COMMENT_LINES

  const foldedPosition = findFoldedPosition(maxCommentLines, comment)

  return foldedPosition ? (
    <FoldedComment
      comment={comment.slice(0, foldedPosition)}
      unfoldTextCss={unfoldTextCss}
      onUnfoldButtonClick={onUnfoldButtonClick}
    />
  ) : (
    <Comment>{comment}</Comment>
  )
}

function FoldedComment({
  comment,
  onUnfoldButtonClick,
  unfoldTextCss,
}: {
  comment: string
  onUnfoldButtonClick: MouseEventHandler<HTMLButtonElement>
  unfoldTextCss?: CSSObject
}) {
  const { t } = useTranslation('common-web')

  return (
    <Comment>
      {`${comment} …`}
      <button
        onClick={onUnfoldButtonClick}
        css={{
          display: 'inline-block',
          color: '#2987f0',
          outline: '',
          ...unfoldTextCss,
        }}
      >
        {t(['deobogi', '더보기'])}
      </button>
    </Comment>
  )
}
