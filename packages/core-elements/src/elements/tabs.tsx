import * as React from 'react'
import styled, { css } from 'styled-components'
import Container from './container'
import { GetGlobalColor } from '../commons'

interface TabProps {
  value?: any
  options?: [{ label: string; value: any }]
  onChange?: (e?: React.SyntheticEvent, value?: any) => any
  line?: boolean
}

const TabContainer = styled.div<{ line?: boolean }>`
  white-space: nowrap;
  display: table;
  width: 100%;
  table-layout: fixed;

  ${({ line }) =>
    line
      ? css`
          border-bottom: 1px solid rgba(${GetGlobalColor('gray')}, 0.05);
        `
      : css`
          background-color: #efefef;
          border-radius: 4px;
          padding: 2px;
        `}
`

const TabLabel = styled.div<{ line?: boolean; active?: boolean }>`
  display: table-cell;
  box-sizing: border-box;
  text-align: center;
  padding: 11px 0;
  cursor: pointer;

  ${({ line, active }) =>
    line
      ? css`
          font-size: 15px;
          color: ${active
            ? `rgba(${GetGlobalColor('gray')}, 1)`
            : `rgba(${GetGlobalColor('gray')}, 0.3)`};
        `
      : css`
          color: ${active ? '#3a3a3a' : 'rgba(46, 46, 46, 0.3)'};
          background-color: ${active ? '#ffffff' : 'transparent'};
          border-radius: 2px;
          font-size: 14px;
          font-weight: bold;
        `}
`

const Line = styled.div<{ size: number; position: number }>`
  position: absolute;
  bottom: 0;
  width: ${({ size }) => size}%;
  left: ${({ position }) => position}%;
  height: 2px;
  background: rgba(${GetGlobalColor('blue')}, 1);
  transition: all 0.2s;
`

function BasicTab({ options, value: currentValue, onChange }: TabProps) {
  return (
    <TabContainer>
      {options.map(({ label, value }, i) => (
        <TabLabel
          active={currentValue === value}
          key={i}
          onClick={(e) => onChange(e, value)}
        >
          {label}
        </TabLabel>
      ))}
    </TabContainer>
  )
}

function LineTab({ options, value: currentValue, onChange, line }: TabProps) {
  const size = 100 / options.length
  const activeIdx = options.findIndex(({ value }) => value === currentValue)
  const linePosition = activeIdx > -1 ? activeIdx * size : -100

  return (
    <Container position="relative">
      <TabContainer line={line}>
        {options.map(({ label, value }, idx) => (
          <TabLabel
            key={idx}
            active={value === currentValue}
            onClick={(e) => onChange(e, value)}
            line={line}
          >
            {label}
          </TabLabel>
        ))}
      </TabContainer>
      <Line size={size} position={linePosition} />
    </Container>
  )
}

export default function Tabs({
  value: currentValue,
  options,
  onChange,
  line,
}: TabProps) {
  const Component = line ? LineTab : BasicTab

  return (
    <Component
      line={line}
      onChange={onChange}
      options={options}
      value={currentValue}
    />
  )
}
