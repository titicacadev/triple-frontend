import styled, { css } from 'styled-components'

const Container = styled.div`
  box-sizing: border-box;

  ${({ centered, margin }) =>
    (margin || centered) &&
    css`
      margin-top: ${(margin || {}).top || 0}px;
      margin-bottom: ${(margin || {}).bottom || 0}px;
      margin-left: ${centered
        ? 'auto'
        : margin.left
          ? `${margin.left}px`
          : '0px'};
      margin-right: ${centered
        ? 'auto'
        : margin.right
          ? `${margin.right}px`
          : '0px'};
    `};

  ${({ padding }) =>
    padding &&
    css`
      padding-top: ${padding.top || 0}px;
      padding-bottom: ${padding.bottom || 0}px;
      padding-left: ${padding.left || 0}px;
      padding-right: ${padding.right || 0}px;
    `};

  ${({ width }) =>
    width &&
    css`
      width: ${width}px;
    `};

  ${({ minWidth }) =>
    minWidth &&
    css`
      min-width: ${minWidth}px;
    `};

  ${({ maxWidth }) =>
    maxWidth &&
    css`
      max-width: ${maxWidth}px;
    `};

  float: ${({ floated }) => floated || 'none'};

  ${({ textAlign }) =>
    textAlign &&
    css`
      text-align: ${textAlign};
    `};

  ${({ clearing }) =>
    clearing &&
    css`
      &:after {
        content: '';
        display: block;
        clear: both;
      }
    `};
`

export default Container
