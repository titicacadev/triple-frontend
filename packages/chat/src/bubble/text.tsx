import styled, { css } from 'styled-components'
import { useHistoryFunctions, useUriHash } from '@titicaca/react-contexts'
import { Button } from '@titicaca/core-elements'

import useATagNavigator from '../utils/a-tag-navigator'
import { ArrowRight } from '../icons/arrow-right-icon'

import { TextItem } from './item'
import Bubble from './bubble'
import { TextBubbleProp } from './type'
import { FullTextMessageView } from './full-text-message-view'

const MAX_VIEWABLE_TEXT_LENGTH = 300
const SHOW_FULL_TEXT_VIEW = 'SHOW.FULL_TEXT_VIEW'

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
  message,
  my,
  created,
  onOpenMenu,
  fullTextViewAvailable,
  ...props
}: TextBubbleProp) {
  const { back, push } = useHistoryFunctions()
  const uriHash = useUriHash()
  const isFullTextViewOpen = uriHash === SHOW_FULL_TEXT_VIEW

  const aTagNavigator = useATagNavigator()
  const isEllipsis =
    fullTextViewAvailable && message.length > MAX_VIEWABLE_TEXT_LENGTH

  return (
    <>
      <Bubble
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
          <FullTextViewButton my={my} onClick={() => push(SHOW_FULL_TEXT_VIEW)}>
            전체보기
            <ArrowRight
              color={my ? 'var(--color-white900)' : 'var(--color-gray500)'}
              style={{ width: 4, height: 8 }}
            />
          </FullTextViewButton>
        ) : null}
      </Bubble>

      {isFullTextViewOpen ? (
        <FullTextMessageView
          open
          onClose={back}
          text={message}
          openMenu={onOpenMenu}
          onClick={(e) => aTagNavigator(e)}
          disableMenu={!created}
        />
      ) : null}
    </>
  )
}
