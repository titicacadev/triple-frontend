import styled, { css } from 'styled-components'
import { MarginPadding, GlobalSizes } from '../commons'
import * as React from 'react'

interface CarouselBaseProps {
  margin?: MarginPadding
  containerPadding?: { left: number; right: number }
  className?: string
}

const CarouselBase = styled.ul<CarouselBaseProps>`
  margin: 0;
  padding: 0;

  padding-bottom: 10px;

  ${({ margin }) =>
    margin &&
    css`
      margin-top: ${margin.top || 0}px;
      margin-bottom: ${margin.bottom || 0}px;
      margin-left: ${margin.left || 0}px;
      margin-right: ${margin.right || 0}px;
    `};

  white-space: nowrap;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
  overflow-y: hidden;

  ::-webkit-scrollbar {
    display: none;
  }

  ${({ containerPadding }) =>
    containerPadding &&
    css`
      li:first-child {
        margin-left: ${containerPadding.left || 0}px;
      }
      li:last-child {
        margin-right: ${containerPadding.right || 0}px;
      }
    `};
`

const CarouselItem = styled.li<{ size?: GlobalSizes }>`
  display: inline-block;
  position: relative;
  width: ${({ size }) =>
    ({ small: '140px', medium: '153px', large: '270px' }[size || 'small'])};
  vertical-align: top;
  white-space: normal;
  cursor: pointer;

  margin-left: ${({ size }) =>
    ({ small: '10px', medium: '10px', large: '15px' }[size || 'small'])};
`

export default class Carousel extends React.PureComponent<CarouselBaseProps> {
  static Item = CarouselItem

  render() {
    const {
      props: { margin, containerPadding, children, className },
    } = this

    return (
      <CarouselBase
        className={className}
        margin={margin}
        containerPadding={containerPadding}
      >
        {children}
      </CarouselBase>
    )
  }
}
