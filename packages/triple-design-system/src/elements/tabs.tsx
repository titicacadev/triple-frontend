import * as React from 'react'
import styled from 'styled-components'

const TabsContainer = styled.div`
  background-color: #efefef;
  border-radius: 4px;
  padding: 2px;
  white-space: nowrap;
`

const Tab = styled.div<{ widthPercent?: number; active?: boolean }>`
  display: inline-block;
  box-sizing: border-box;
  width: ${({ widthPercent }) => widthPercent}%;
  height: 36px;
  line-height: 36px;
  text-align: center;
  color: ${({ active }) => (active ? '#3a3a3a' : 'rgba(46, 46, 46, 0.3)')};
  background-color: ${({ active }) => (active ? '#ffffff' : 'transparent')};
  border-radius: 2px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
`

export default function Tabs({
  value: currentValue,
  options,
  onChange,
}: {
  value?: any
  options?: [{ label: string; value: any }]
  onChange?: (e?: React.SyntheticEvent, value?: any) => any
}) {
  return (
    <TabsContainer>
      {options.map(({ label, value }, i) => (
        <Tab
          active={currentValue === value}
          widthPercent={options.length > 0 ? 100 / options.length : 100}
          key={i}
          onClick={(e) => onChange(e, value)}
        >
          {label}
        </Tab>
      ))}
    </TabsContainer>
  )
}
