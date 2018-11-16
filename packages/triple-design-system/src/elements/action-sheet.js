import React, { createContext } from 'react'
import styled from 'styled-components'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

const { Provider, Consumer } = createContext()

const Overlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(58, 58, 58, 0.7);
  z-index: 10;

  &.fade-enter {
    opacity: 0.01;

    & > div {
      margin-bottom: -100px;
    }
  }

  &.fade-enter.fade-enter-active {
    opacity: 1;
    transition: opacity 300ms ease-in;

    & > div {
      margin-bottom: 0;
      transition: margin-bottom 250ms ease-in;
    }
  }

  &.fade-leave {
    opacity: 1;

    & > div {
      margin-bottom: 0;
    }
  }

  &.fade-leave.fade-leave-active {
    opacity: 0.01;
    transition: opacity 300ms ease-in;

    & > div {
      margin-bottom: -100px;
      transition: margin-bottom 250ms ease-in;
    }
  }
`

const Sheet = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 11;
  border-radius: 12px 12px 0 0;
  background-color: #fff;
  box-sizing: border-box;
  padding: 30px 25px 13px 25px;
  margin: 0;
  font-family: sans-serif;
`

const Title = styled.div`
  height: 16px;
  font-size: 13px;
  font-weight: bold;
  color: rgba(73, 73, 73, 0.7);
  margin: 0 0 10px 2px;
`

const ActionItemContainer = styled.div`
  width: 100%;
  height: 54px;

  &:after {
    content: '';
    display: block;
    clear: both;
  }
`

const ItemText = styled.div`
  display: inline-block;
  width: ${({ width }) => width || '100%'};
  height: 54px;
  line-height: 54px;
  font-size: 16px;
  font-weight: 500;
  color: #3a3a3a;
  font-family: sans-serif;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

const ItemButton = styled.a`
  float: right;
  height: 30px;
  line-height: 30px;
  margin-top: 11px;
  padding: 0 17px;
  text-align: center;
  border-radius: 15px;
  background-color: #fafafa;
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  font-family: sans-serif;
  color: #3a3a3a;
`

const URL_BY_NAMES = {
  save:
    'http://triple-web-assets-dev.s3-website-ap-northeast-1.amazonaws.com/images/img-action-save@2x.png',
  schedule:
    'http://triple-web-assets-dev.s3-website-ap-northeast-1.amazonaws.com/images/img-action-schedule@2x.png',
  share:
    'http://triple-web-assets-dev.s3-website-ap-northeast-1.amazonaws.com/images/img-action-share@2x.png',
  suggest:
    'http://triple-web-assets-dev.s3-website-ap-northeast-1.amazonaws.com/images/img-action-suggest@2x.png',
  review:
    'http://triple-web-assets-dev.s3-website-ap-northeast-1.amazonaws.com/images/img-action-review@2x.png',
  report:
    'http://triple-web-assets-dev.s3-website-ap-northeast-1.amazonaws.com/images/img-action-report@2x.png',
  delete:
    'http://triple-web-assets-dev.s3-website-ap-northeast-1.amazonaws.com/images/img-action-delete@2x.png',
}

const ItemIcon = styled.img`
  float: left;
  margin-top: 11px;
  width: 30px;
  height: 30px;
  margin-right: 9px;
`

function ActionItem({ buttonLabel, icon, onClick, children }) {
  let textWidth = '100%'
  if (buttonLabel && icon) {
    textWidth = 'calc(100% - 100px)'
  } else if (buttonLabel) {
    textWidth = 'calc(100% - 60px)'
  } else if (icon) {
    textWidth = 'calc(100% - 40px)'
  }

  return (
    <Consumer>
      {({ onClose }) => (
        <ActionItemContainer>
          {icon ? <ItemIcon src={URL_BY_NAMES[icon]} /> : null}
          <ItemText
            width={textWidth}
            onClick={
              buttonLabel
                ? null
                : () => {
                    onClick && onClick()
                    onClose && onClose()
                  }
            }
          >
            {children}
          </ItemText>
          {buttonLabel ? (
            <ItemButton
              onClick={() => {
                onClick && onClick()
                onClose && onClose()
              }}
            >
              {buttonLabel}
            </ItemButton>
          ) : null}
        </ActionItemContainer>
      )}
    </Consumer>
  )
}

export default function ActionSheet({ open, onClose, children }) {
  return (
    <ReactCSSTransitionGroup
      transitionName="fade"
      transitionEnter={true}
      transitionEnterTimeout={500}
      transitionLeave={true}
      transitionLeaveTimeout={500}
    >
      {open ? (
        <Overlay onClick={onClose}>
          <Sheet onClick={silenceEvent}>
            <Provider value={{ onClose }}>{children}</Provider>
          </Sheet>
        </Overlay>
      ) : null}
    </ReactCSSTransitionGroup>
  )
}

function silenceEvent(e) {
  return e.stopPropagation()
}

ActionSheet.Title = Title
ActionSheet.Item = ActionItem
