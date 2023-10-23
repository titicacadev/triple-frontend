import { Children, ReactNode } from 'react'
import styled, { css } from 'styled-components'
import * as CSS from 'csstype'

import { Text } from '../text/text'
import { MarginPadding } from '../../commons'
import { paddingMixin } from '../../mixins'

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
  header: 'var(--color-kint5-gray60)',
  body: 'var(--color-kint5-gray10)',
}

const Container = styled.div<{ borderRadius?: number }>`
  overflow: hidden;

  ${({ borderRadius }) =>
    borderRadius &&
    css`
      border-radius: ${borderRadius}px;
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
      background-color: ${BACKGROUND_COLORS[type || 'body']};
    `};

  ${paddingMixin}
`

function HorizontalTable({ head, body }: TableBodyProps) {
  const bodyRowCount = body.length
  const bodyColumnCount = body[0].length

  return (
    <Container borderRadius={6}>
      <Row>
        {head.map(({ text }, idx) => (
          <Column
            key={idx}
            type="header"
            padding={{ top: 16, bottom: 16, left: 15, right: 15 }}
          >
            <Text
              css={{
                fontSize: 13,
                fontWeight: 700,
                color: 'var(--color-kint5-gray0)',
              }}
            >
              {text}
            </Text>
          </Column>
        ))}
      </Row>

      {body.map((columns, idx) => (
        <Row
          key={idx}
          css={{
            ...(idx < bodyRowCount - 1 && {
              borderBottom: '1px solid var(--color-kint5-gray30)',
            }),
          }}
        >
          {columns.map(({ text }, idx) => (
            <Column
              key={idx}
              type="body"
              css={{
                padding: '16px 15px',
                ...(idx < bodyColumnCount - 1 && {
                  borderRight: '1px solid var(--color-kint5-gray30)',
                }),
              }}
            >
              <Text css={{ fontSize: 13, fontWeight: 400 }}>{text}</Text>
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
              top: 16,
              bottom: 16,
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
                top: 16,
                bottom: 16,
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

export function Table({ head, body, type }: TableProps) {
  const Container = type === 'vertical' ? VerticalTable : HorizontalTable
  return <Container head={head} body={body} />
}
