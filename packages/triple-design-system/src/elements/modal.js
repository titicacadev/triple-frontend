import React, { PureComponent } from 'react'
import styled, { css } from 'styled-components'

const Overlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(58, 58, 58, 0.5);
  z-index: 10;
`

const Box = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 295px;
  transform: translate(-50%, -50%);
  z-index: 11;
  border-radius: 6px;
  background-color: #fff;
  margin: 0;
`

const Actions = styled.div`
  display: block;
  width: 100%;
  height: 50px;
  border-top-style: solid;
  border-width: 1px;
  border-color: #f5f5f5;

  a {
    ${({ children }) =>
      css`
        width: calc(
          (100% - ${(children.length - 1) * 1}px) / ${children.length}
        );
      `};

    padding-left: 0;
    padding-right: 0;
  }

  a:not(:first-child) {
    border-width: 1px;
    border-left-style: solid;
    border-color: #f5f5f5;
  }
`

const ACTION_COLORS = {
  gray: 'rgba(58, 58, 58, 0.5)',
  blue: '#368fff',
}

const Action = styled.a`
  display: inline-block;
  height: 50px;
  line-height: 50px;
  font-size: 14px;
  font-family: sans-serif;
  font-weight: bold;
  text-align: center;
  color: ${({ color }) => ACTION_COLORS[color || 'gray']};
`

export default class Modal extends PureComponent {
  componentDidMount() {
    this.updateBodyStyle()
  }

  componentWillUnmount() {
    document.body.removeEventListener('touchmove', this.preventDefault, {
      passive: false,
    })
  }

  componentDidUpdate({ open: prevOpen }) {
    const {
      props: { open },
    } = this

    if (prevOpen !== open) {
      this.updateBodyStyle()
    }
  }

  updateBodyStyle = () => {
    const {
      props: { open },
    } = this

    const bodyScrollDisabled = [...document.body.classList].includes(
      'scroll-disabled',
    )

    if (open && !bodyScrollDisabled) {
      document.body.classList.add('scroll-disabled')
      document.body.addEventListener('touchmove', this.preventDefault, {
        passive: false,
      })
    } else if (!open && bodyScrollDisabled) {
      document.body.classList.remove('scroll-disabled')
      document.body.removeEventListener('touchmove', this.preventDefault, {
        passive: false,
      })
    }
  }

  preventDefault = (e) => e.preventDefault()

  render() {
    const {
      props: { open, onClose, children },
    } = this

    return open ? (
      <Overlay onClick={onClose}>
        <Box onClick={silenceEvent}>{children}</Box>
      </Overlay>
    ) : null
  }
}

function silenceEvent(e) {
  return e.stopPropagation()
}

Modal.Actions = Actions
Modal.Action = Action
