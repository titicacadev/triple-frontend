import React, { Children } from 'react'
import styled, { css } from 'styled-components'
import Text from './text'

const BACKGROUND_COLORS = {
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
        border-bottom: 1px solid rgb(${BACKGROUND_COLORS.header});
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

  ${({ verticalGap, children = [] }) =>
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
  box-sizing: border-box;

  ${({ type }) =>
    type &&
    css`
      background-color: rgb(${BACKGROUND_COLORS[type || 'body']});
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
        {head.map(({ text }, idx) => (
          <Column
            key={idx}
            type="header"
            padding={{ top: 12, bottom: 12, left: 15, right: 15 }}
          >
            <Text bold size="small">
              {text}
            </Text>
          </Column>
        ))}
      </Row>

      {body.map((columns, idx) => (
        <Row key={idx}>
          {columns.map(({ text }, idx) => (
            <Column
              key={idx}
              type="body"
              padding={{ top: 12, bottom: 12, left: 15, right: 15 }}
            >
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
      {head.map(({ text }, idx) => (
        <Row key={idx} verticalGap={10} borderRadius={6}>
          <Column
            width="25"
            type="header"
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
          {(body[idx] || []).map(({ text: columnText }, idx) => (
            <Column
              key={idx}
              width="75"
              type="body"
              padding={{
                top: 13,
                bottom: 13,
                left: 15,
                right: 15,
              }}
              textAlign="left"
            >
              <Text size="small">{columnText}</Text>
            </Column>
          ))}
        </Row>
      ))}
    </Container>
  )
}

export default function Table({ type, ...props }) {
  const Container = type === 'vertical' ? VerticalTable : HorizontalTable
  return <Container {...props} />
}
