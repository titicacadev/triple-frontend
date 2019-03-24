import React, { Children } from 'react'
import styled, { css } from 'styled-components'
import Text from './text'

const COLORS_SET = {
  header: '234, 234, 234',
  body: '245, 245, 245',
}

const Container = styled.div`
  overflow: hidden;
  box-sizing: border-box;

  ${({ borderRadius }) =>
    borderRadius &&
    css`
      border-radius: ${borderRadius}px;
    `};

  ${({ borderLine }) =>
    borderLine &&
    css`
      & > div:not(:last-child) {
        border-bottom: 1px solid rgb(${COLORS_SET.header});
      }
    `};
`

const Row = styled.div`
  width: 100%;
  display: table;

  ${({ borderRadius }) =>
    borderRadius &&
    css`
      border-radius: ${borderRadius}px;
      overflow: hidden;
    `};

  ${({ verticalGap, children }) =>
    verticalGap
      ? css`
          &:not(:last-child) {
            margin-bottom: ${verticalGap}px;
          }
        `
      : css`
          & > div {
            width: ${100 / Children.count(children)}%;
          }
        `};
`

const Column = styled.div`
  width: ${({ width }) => width || '100'}%;
  display: table-cell;
  vertical-align: middle;
  text-align: ${({ textAlign }) => textAlign || 'center'};

  ${({ color }) =>
    color &&
    css`
      background-color: rgb(${COLORS_SET[color || 'body']});
    `};

  ${({ padding }) =>
    padding &&
    css`
      padding-top: ${padding.top || 0}px;
      padding-bottom: ${padding.bottom || 0}px;
      padding-left: ${padding.left || 0}px;
      padding-right: ${padding.right || 0}px;
    `};
`

function HorizontalTable({ head, body }) {
  return (
    <Container borderLine borderRadius={6}>
      <Row>
        {head.map((text, idx) => (
          <Column key={idx} color="header" padding={{ top: 12, bottom: 12 }}>
            <Text bold size="small">
              {text}
            </Text>
          </Column>
        ))}
      </Row>

      {body.map((texts, idx) => (
        <Row key={idx}>
          {texts.map((text, idx) => (
            <Column key={idx} color="body" padding={{ top: 12, bottom: 12 }}>
              <Text size="small">{text}</Text>
            </Column>
          ))}
        </Row>
      ))}
    </Container>
  )
}

function VerticalTable({ head, body }) {
  return (
    <Container>
      {head.map((text, idx) => (
        <Row key={idx} verticalGap={10} borderRadius={6}>
          <Column
            width="20"
            color="header"
            padding={{
              top: 13,
              bottom: 13,
              left: 15,
              right: 15,
            }}
            textAlign="left"
          >
            <Text size="small" bold>
              {text}
            </Text>
          </Column>
          <Column
            width="80"
            color="body"
            padding={{
              top: 13,
              bottom: 13,
              left: 15,
              right: 15,
            }}
            textAlign="left"
          >
            <Text size="small">{body[idx]}</Text>
          </Column>
        </Row>
      ))}
    </Container>
  )
}

export default function Table({ type, ...props }) {
  const Container = type === 'vertical' ? VerticalTable : HorizontalTable
  return <Container {...props} />
}
