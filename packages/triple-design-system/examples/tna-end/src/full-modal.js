
import React, { createContext } from 'react'
import styled from 'styled-components'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

const { Provider, Consumer } = createContext()

const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  z-index: 10;

  &.fade-enter {
    & > div {
      margin-bottom: -100px;
    }
  }
  &.fade-enter.fade-enter-active {
    transition: opacity 300ms ease-in;
    & > div {
      margin-bottom: 0;
      transition: margin-bottom 250ms ease-in;
    }
  }
  &.fade-leave {
    & > div {
      margin-bottom: 0;
    }
  }
  &.fade-leave.fade-leave-active {
    transition: opacity 300ms ease-in;
    & > div {
      margin-bottom: -100px;
      transition: margin-bottom 250ms ease-in;
    }
  }
`


export default function FullModal({ open, onClose, title, children }) {
  return (
    <ReactCSSTransitionGroup
      transitionName="fade"
      transitionEnter={true}
      transitionEnterTimeout={500}
      transitionLeave={true}
      transitionLeaveTimeout={500}
    >
      {open ? (
      <Container>
        Hellod
      </Container>) : null}
    </ReactCSSTransitionGroup>
  )
}