import * as React from 'react'
import styled, { css } from 'styled-components'
import Container from './container'
import { GetGlobalColor } from '../commons'

type TabType = 'basic' | 'pointing'

interface Option {
  label: string
  value: any
}

interface TabProps {
  value?: any
  options?: Option[]
  onChange?: (e?: React.SyntheticEvent, value?: any) => any
  type?: TabType
}

const TAB_TYPE: { [key in TabType]: React.ElementType } = {
  basic: BasicTab,
  pointing: PointingTab,
}

const TabContainer = styled.div`
  white-space: nowrap;
  display: table;
  width: 100%;
  table-layout: fixed;
`

const TabLabel = styled.div<{ active?: boolean }>`
  display: table-cell;
  box-sizing: border-box;
  text-align: center;
  padding: 11px 0;
  cursor: pointer;
`

const BasicContainer = styled(TabContainer)`
  background-color: #efefef;
  border-radius: 4px;
  padding: 2px;
`

const PointingContainer = styled(TabContainer)`
  border-bottom: 1px solid rgba(${GetGlobalColor('gray')}, 0.05);
`

const BasicLabel = styled(TabLabel)`
  ${({ active }) => css`
    color: ${active ? '#3a3a3a' : 'rgba(46, 46, 46, 0.3)'};
    background-color: ${active ? '#ffffff' : 'transparent'};
    border-radius: 2px;
    font-size: 14px;
    font-weight: bold;
  `}
`

const PointingLabel = styled(TabLabel)`
  ${({ active }) => css`
    font-size: 15px;
    color: ${active
      ? `rgba(${GetGlobalColor('gray')}, 1)`
      : `rgba(${GetGlobalColor('gray')}, 0.3)`};
  `}
`

const Line = styled.div<{ size: number; left: number }>`
  position: absolute;
  bottom: 0;
  width: ${({ size }) => size}%;
  left: ${({ left }) => left}%;
  height: 2px;
  background: rgba(${GetGlobalColor('blue')}, 1);
  transition: all 0.2s;
`

function BasicTab({ options, value: currentValue, onChange }: TabProps) {
  return (
    <BasicContainer>
      {options.map(({ label, value }, i) => (
        <BasicLabel
          active={currentValue === value}
          key={i}
          onClick={(e) => onChange(e, value)}
        >
          {label}
        </BasicLabel>
      ))}
    </BasicContainer>
  )
}

function PointingTab({ options, value: currentValue, onChange }: TabProps) {
  const size = 100 / options.length
  const activeIdx = options.findIndex(({ value }) => value === currentValue)
  const left = activeIdx > -1 ? activeIdx * size : -100

  return (
    <Container position="relative">
      <PointingContainer>
        {options.map(({ label, value }, idx) => (
          <PointingLabel
            key={idx}
            active={value === currentValue}
            onClick={(e) => onChange(e, value)}
          >
            {label}
          </PointingLabel>
        ))}
      </PointingContainer>
      <Line size={size} left={left} />
    </Container>
  )
}

export default function Tabs({
  value: currentValue,
  options,
  onChange,
  type,
}: TabProps) {
  const Component = TAB_TYPE[type || 'basic']

  return (
    <Component onChange={onChange} options={options} value={currentValue} />
  )
}
