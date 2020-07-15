import React, { useEffect, useRef, useState } from 'react'
import styled, { css } from 'styled-components'
import { getColor } from '@titicaca/color-palette'

type TabType = 'basic' | 'pointing'

interface Option {
  label: string
  value: any
}

interface TabProps {
  value: any
  options: Option[]
  onChange: (e?: React.SyntheticEvent, value?: any) => any
  type: TabType
  scroll?: boolean
}

interface RefValuesProps {
  refSize: number | undefined
  refLeft: number | undefined
}

// eslint-disable-next-line no-unexpected-multiline
const TabContainer = styled.div<{
  active?: boolean
  scroll?: boolean
}>`
  position: relative;
  white-space: nowrap;
  ${({ scroll }) =>
    scroll
      ? css`
          overflow-x: scroll;
          -webkit-overflow-scrolling: touch;
          cursor: pointer;

          ::-webkit-scrollbar {
            display: none;
          }
        `
      : css`
          display: table;
          width: 100%;
          table-layout: fixed;
        `};
`

const TabLabel = styled.div<{ active?: boolean; scroll?: boolean }>`
  box-sizing: border-box;
  text-align: center;
  cursor: pointer;

  ${({ scroll }) =>
    !scroll &&
    css`
      display: table-cell;
      padding: 11px 0;
    `};
`

const BasicContainer = styled(TabContainer)`
  background-color: #efefef;
  border-radius: 4px;
  padding: 2px;
`

const PointingContainer = styled(TabContainer)<{
  size?: number
  left?: number
}>`
  border-bottom: 1px solid rgba(${getColor('gray50')});
  &:after {
    content: '';
    display: inline-block;
    position: absolute;
    bottom: 0;
    width: ${({ size }) => `${size}px`};
    left: ${({ left }) => `${left}px`};
    height: 2px;
    background: rgba(${getColor('blue')});
    transition: all 0.2s;
  }
`
const PointingRow = styled.div`
  display: table-row;
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
  font-weight: bold;

  ${({ active }) => css`
    font-size: 15px;
    color: ${active
      ? `rgba(${getColor('gray')})`
      : `rgba(${getColor('gray200')})`};
  `}

  ${({ scroll }) =>
    scroll &&
    css`
      display: inline-block;
      padding: 11px 18px;
    `};
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

function PointingTab({
  options,
  value: currentValue,
  onChange,
  scroll,
}: TabProps) {
  const pointingRef = useRef<(HTMLDivElement | null)[]>([])

  const [refValues, setRefValues] = useState<RefValuesProps>({
    refSize: 0,
    refLeft: 0,
  })

  const activeIdx = options.findIndex(({ value }) => value === currentValue)

  useEffect(() => {
    if (!pointingRef || !pointingRef.current) {
      return
    }

    setRefValues({
      refSize: pointingRef.current[activeIdx]?.clientWidth,
      refLeft: pointingRef.current[activeIdx]?.offsetLeft,
    })
  }, [activeIdx]) // eslint-disable-line react-hooks/exhaustive-deps

  const { refSize, refLeft } = refValues

  return (
    <PointingContainer size={refSize} left={refLeft} scroll={scroll}>
      <PointingRow>
        {options.map(({ label, value }, idx) => (
          <PointingLabel
            scroll={scroll}
            ref={(ref) => (pointingRef.current[idx] = ref)}
            key={idx}
            active={value === currentValue}
            onClick={(e) => {
              onChange(e, value)
            }}
          >
            {label}
          </PointingLabel>
        ))}
      </PointingRow>
    </PointingContainer>
  )
}

export default function Tabs({
  value: currentValue,
  options,
  onChange,
  type,
  scroll,
}: TabProps) {
  if (type || (type === 'pointing' && scroll)) {
    return (
      <PointingTab
        scroll={scroll}
        onChange={onChange}
        options={options}
        value={currentValue}
        type="pointing"
      />
    )
  }

  return (
    <BasicTab
      onChange={onChange}
      options={options}
      value={currentValue}
      type="basic"
    />
  )
}
