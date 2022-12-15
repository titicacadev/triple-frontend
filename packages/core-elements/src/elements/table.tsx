import { Children, ReactNode } from 'react'
import styled, { css } from 'styled-components'
import * as CSS from 'csstype'

import { MarginPadding } from '../commons'
import { paddingMixin } from '../mixins'

import Text from './text'

type TableType = 'vertical' | 'horizontal'

interface TableEntity {
  text: string
}
type TableRow = TableEntity[]

interface TableBodyProps {
  head: TableRow
  body: TableRow[]
}

export interface TableProps extends TableBodyProps {
  type: TableType
}

const BACKGROUND_COLORS: { [key: string]: string } = {
  header: '234, 234, 234',
  body: '245, 245, 245',
}

const Container = styled.div<{ borderRadius?: number; borderLine?: boolean }>`
  overflow: hidden;

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

const Row = styled.div<{
  borderRadius?: number
  verticalGap?: number
  children?: ReactNode
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
            width: ${100 / Children.count(children)}%;
          }
        `};
`

const Column = styled.div<{
  /** 퍼센트 width */
  width?: number
  textAlign?: CSS.Property.TextAlign
  type?: 'header' | 'body'
  padding?: MarginPadding
}>`
  width: ${({ width }) => width || '100'}%;
  display: table-cell;
  vertical-align: middle;
  text-align: ${({ textAlign }) => textAlign || 'center'};

  ${({ type }) =>
    type &&
    css`
      background-color: rgb(${BACKGROUND_COLORS[type || 'body']});
    `};

  ${paddingMixin}
`

function HorizontalTable({ head, body }: TableBodyProps) {
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

function VerticalTable({ head, body }: TableBodyProps) {
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

export default function Table({ head, body, type }: TableProps) {
  const Container = type === 'vertical' ? VerticalTable : HorizontalTable
  return <Container head={head} body={body} />
}
