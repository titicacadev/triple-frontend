import { PropsWithChildren } from 'react'
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
  CustomFullTextViewController,
  onOpenMenu,
  fullTextViewAvailable,
  openFullTextView,
  closeFullTextView,
  isFullTextViewOpen,
  onParentMessageClick,
  onLinkClick,
  ...props
}: TextBubbleProp) {
  const aTagNavigator = useATagNavigator(onLinkClick)
  const isEllipsis =
    !CustomFullTextViewController &&
    fullTextViewAvailable &&
    openFullTextView &&
    closeFullTextView &&
    isFullTextViewOpen &&
    message.length > MAX_VIEWABLE_TEXT_LENGTH

  return (
    <Bubble
      id={id}
      css={css`
        a {
          color: ${my ? '#B5FFFB' : 'var(--color-blue)'};
          text-decoration: underline;
        }
      `}
      my={my}
      onParentMessageClick={onParentMessageClick}
      {...props}
    >
      {CustomFullTextViewController ? (
        <CustomFullTextViewController my={my}>
          <TextItem text={message} onClick={(e) => aTagNavigator(e)} />
        </CustomFullTextViewController>
      ) : (
        <>
          <TextItem
            text={
              isEllipsis
                ? `${message.substring(0, MAX_VIEWABLE_TEXT_LENGTH)}...`
                : message
            }
            onClick={(e) => aTagNavigator(e)}
          />
          {isEllipsis ? (
            <TextBubbleWithFullTextView
              id={id}
              my={my}
              openFullTextView={openFullTextView}
              closeFullTextView={closeFullTextView}
              isFullTextViewOpen={isFullTextViewOpen}
              created={created}
              onOpenMenu={onOpenMenu}
            >
              <TextItem text={message} onClick={(e) => aTagNavigator(e)} />
            </TextBubbleWithFullTextView>
          ) : null}
        </>
      )}
    </Bubble>
  )
}

function TextBubbleWithFullTextView({
  openFullTextView,
  closeFullTextView,
  onOpenMenu,
  created,
  isFullTextViewOpen,
  my,
  id,
  children,
}: PropsWithChildren<
  Required<
    Pick<
      TextBubbleProp,
      | 'my'
      | 'id'
      | 'openFullTextView'
      | 'closeFullTextView'
      | 'isFullTextViewOpen'
    >
  > &
    Pick<TextBubbleProp, 'onOpenMenu' | 'created'>
>) {
  return (
    <>
      <FullTextViewButton my={my} onClick={() => openFullTextView(id)}>
        전체보기
        <ArrowRight
          color={my ? 'var(--color-white900)' : 'var(--color-gray500)'}
          style={{ width: 4, height: 8 }}
        />
      </FullTextViewButton>
      {isFullTextViewOpen(id) && (
        <FullTextMessageView
          open
          onClose={closeFullTextView}
          openMenu={onOpenMenu}
          disableMenu={!created}
        >
          {children}
        </FullTextMessageView>
      )}
    </>
  )
}
