import * as React from 'react'
import styled, { css } from 'styled-components'
import Text from './text'
import * as CSS from 'csstype'
import { MarginPadding } from '../commons'

const BACKGROUND_COLORS: { [key: string]: string } = {
  header: '234, 234, 234',
  body: '245, 245, 245',
}

const Container = styled.div<{ borderRadius?: number; borderLine?: boolean }>`
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

// eslint-disable-next-line no-unexpected-multiline
const Row = styled.div<{
  borderRadius?: number
  verticalGap?: number
  children?: React.ReactNode
}>`
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
            width: ${100 / React.Children.count(children)}%;
          }
        `};
`

// eslint-disable-next-line no-unexpected-multiline
const Column = styled.div<{
  width?: number
  textAlign?: CSS.TextAlignProperty
  type?: 'header' | 'body'
  padding?: MarginPadding
}>`
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
            width={25}
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
              width={75}
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

export default function Table({ head, body, type, ...props }) {
  const Container = type === 'vertical' ? VerticalTable : HorizontalTable
  return <Container head={head} body={body} {...props} />
}
