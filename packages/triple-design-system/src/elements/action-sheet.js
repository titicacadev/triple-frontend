import React from 'react'
import styled from 'styled-components'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

const Overlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(58, 58, 58, 0.5);
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
  padding: 30px 30px 22px 30px;
  margin: 0;
  font-family: sans-serif;
`

const Title = styled.div`
  height: 16px;
  line-height: 16px;
  font-size: 13px;
  font-weight: bold;
  color: rgba(73, 73, 73, 0.7);
  margin: 0 0 10px 0;
`

const ActionItem = styled.a`
  display: block;
  height: 54px;
  line-height: 54px;
  font-size: 16px;
  color: #3a3a3a;
  margin: 0;
`

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
          <Sheet onClick={silenceEvent}>{children}</Sheet>
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
