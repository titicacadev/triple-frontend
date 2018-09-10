import React, { Component } from 'react'
import styled from 'styled-components'

const ICON_BUTTON_NAMES = {
  save: 'btn-end-save-off@2x.png',
  star: 'btn-end-review@2x.png',
  map: 'btn-end-search-place@2x.png',
  share: 'btn-com-share@2x.png',
}

const IconButton = styled.a`
  display: inline-block;
  font-family: sans-serif;
  font-size: 13px;
  font-weight: 500;
  text-align: center;
  color: rgba(58, 58, 58, 0.5);

  &:before {
    display: block;
    height: 30px;
    background-image: url(${({ name }) =>
      `http://triple-web-assets-dev.s3-website-ap-northeast-1.amazonaws.com/images/${
        ICON_BUTTON_NAMES[name]
      }`});
    background-size: 30px 30px;
    background-position: center center;
    background-repeat: no-repeat;
    content: '';
  }
`

const SimpleButton = styled.a`
  display: inline-block;
  padding: ${({ compact }) => (compact ? '9px 15px' : '13px 25px')};
  font-family: sans-serif;
  font-size: 13px;
  line-height: 13px;
  font-weight: bold;
  text-align: center;
  color: #ffffff;
  border-radius: 21px;
  background-color: #368fff;
  text-decoration: none;
`

class Button extends Component {
  render() {
    const {
      props: { icon, children, ...props },
    } = this

    if (icon) {
      return (
        <IconButton name={icon} {...props}>
          {children}
        </IconButton>
      )
    }

    return <SimpleButton {...props}>{children}</SimpleButton>
  }
}

const ButtonContainer = styled.div`
  text-align: center;

  a {
    float: ${({ floated }) => floated || 'none'};
    display: inline-block;
    margin: 0 5px;
  }
`

const ButtonGroup = styled.div`
  width: 100%;

  a {
    width: ${({ children }) => 100 / children.length}%;
  }
`

Button.Container = ButtonContainer
Button.Group = ButtonGroup

export default Button
