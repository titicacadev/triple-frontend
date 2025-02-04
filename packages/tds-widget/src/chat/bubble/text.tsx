import { styled, css } from 'styled-components'
import { Button } from '@titicaca/tds-ui'

import useATagNavigator from '../utils/a-tag-navigator'
import { ArrowRight } from '../icons/arrow-right-icon'

import { TextItem } from './item'
import Bubble from './bubble'
import { TextBubbleProp } from './type'
import { FullTextMessageView } from './full-text-message-view'

const MAX_VIEWABLE_TEXT_LENGTH = 300

const FullTextViewButton = styled(Button)<{ my: boolean }>`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-top: 10px;
  padding: 0 0 0 5px;
  background-color: unset;
  font-size: 13px;
  font-weight: 500;
  color: ${({ my }) => (my ? 'white' : 'var(--color-gray500)')};
`

export function TextBubble({
  id,
  message,
  my,
  created,
  onOpenMenu,
  fullTextViewAvailable,
  openFullTextView,
  closeFullTextView,
  isFullTextViewOpen,
  ...props
}: TextBubbleProp) {
  const aTagNavigator = useATagNavigator()
  const isEllipsis =
    fullTextViewAvailable && message.length > MAX_VIEWABLE_TEXT_LENGTH

  return (
    <>
      <Bubble
        id={id}
        css={css`
          a {
            color: ${my ? '#B5FFFB' : 'var(--color-blue)'};
            text-decoration: underline;
          }
        `}
        my={my}
        {...props}
      >
        <TextItem
          text={
            isEllipsis
              ? `${message.substring(0, MAX_VIEWABLE_TEXT_LENGTH)}...`
              : message
          }
          onClick={(e) => aTagNavigator(e)}
        />
        {isEllipsis ? (
          <FullTextViewButton my={my} onClick={openFullTextView}>
            전체보기
            <ArrowRight
              color={my ? 'var(--color-white900)' : 'var(--color-gray500)'}
              style={{ width: 4, height: 8 }}
            />
          </FullTextViewButton>
        ) : null}
      </Bubble>

      {isFullTextViewOpen && closeFullTextView ? (
        <FullTextMessageView
          open
          onClose={closeFullTextView}
          text={message}
          openMenu={onOpenMenu}
          onClick={(e) => aTagNavigator(e)}
          disableMenu={!created}
        />
      ) : null}
    </>
  )
}
