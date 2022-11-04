import { useRef, useState, useEffect } from 'react'
import styled, { css } from 'styled-components'

import { MarginPadding } from '../../commons'

import TabContainer from './tab-container'
import TabLabel from './tab-label'
import { TabProps } from './types'

const PointingContainer = styled(TabContainer)<{
  size?: number
  left?: number
}>`
  border-bottom: 1px solid var(--color-gray50);

  &::after {
    content: '';
    display: inline-block;
    position: absolute;
    bottom: 0;
    width: ${({ size }) => `${size}px`};
    left: ${({ left }) => `${left}px`};
    height: 2px;
    background: var(--color-blue);
    transition: all 0.2s;
  }
`

const PointingRow = styled.div`
  display: table-row;
`

const PointingLabel = styled(TabLabel)`
  font-weight: bold;

  ${({ active }) => css`
    font-size: 15px;
    color: ${active ? `var(--color-gray) ` : `var(--color-gray300) `};
  `}

  ${({ scroll }) =>
    scroll &&
    css`
      display: inline-block;
      padding: 11px 18px;
    `};
`

interface RefValuesProps {
  refSize: number | undefined
  refLeft: number | undefined
}

export default function PointingTab<Value>({
  options,
  value: currentValue,
  onChange,
  scroll,
  labelPadding,
}: TabProps<Value> & {
  labelPadding?: MarginPadding
}) {
  const pointingRef = useRef<(HTMLDivElement | null)[]>([])

  const [refValues, setRefValues] = useState<RefValuesProps>({
    refSize: 0,
    refLeft: 0,
  })

  const activeIdx = options.findIndex(({ value }) => value === currentValue)

  useEffect(() => {
    if (pointingRef.current.length === 0) {
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
            padding={labelPadding}
          >
            {label}
          </PointingLabel>
        ))}
      </PointingRow>
    </PointingContainer>
  )
}
