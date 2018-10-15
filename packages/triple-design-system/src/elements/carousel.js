import styled, { css } from 'styled-components'

const Carousel = styled.ul`
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

const CarouselItem = styled.li`
  display: inline-block;
  position: relative;
  width: ${({ size }) =>
    ({ small: '140px', medium: '153px', large: '270px' }[size || 'small'])};
  font-family: sans-serif;
  vertical-align: top;
  white-space: normal;

  margin-left: ${({ size }) =>
    ({ small: '10px', medium: '10px', large: '15px' }[size || 'small'])};
`

Carousel.Item = CarouselItem

export default Carousel
