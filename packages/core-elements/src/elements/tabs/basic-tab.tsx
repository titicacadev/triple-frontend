import React from 'react'
import styled, { css } from 'styled-components'

import TabContainer from './tab-container'
import TabLabel from './tab-label'
import { TabProps } from './types'

const BasicContainer = styled(TabContainer)`
  background-color: #efefef;
  border-radius: 4px;
  padding: 2px;
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

export default function BasicTab({
  options,
  value: currentValue,
  onChange,
}: TabProps) {
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
