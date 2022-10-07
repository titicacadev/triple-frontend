import styled, { css } from 'styled-components'

import { MarginPadding } from '../../commons'

import TabContainer from './tab-container'
import TabLabel from './tab-label'
import { TabProps } from './types'

const RoundedContainer = styled(TabContainer)`
  display: flex;
  gap: 6px;
  padding: 14px 30px;
`

const RoundedLabel = styled(TabLabel)`
  padding: 9px 16px;
  border: 1px solid var(--color-gray100);
  border-radius: 100px;
  background: var(--color-white);
  font-size: 13px;
  font-weight: bold;
  line-height: 16px;
  color: var(--color-gray300);

  ${({ active }) =>
    active &&
    css`
      color: var(--color-white);
      background: var(--color-blue);
      border: 1px solid var(--color-blue);
    `}

  ${({ scroll }) =>
    scroll &&
    css`
      display: inline-block;
    `};
`

export default function RoundedTab<Value>({
  options,
  value: currentValue,
  onChange,
  scroll,
}: TabProps<Value> & {
  labelPadding?: MarginPadding
}) {
  return (
    <RoundedContainer scroll={scroll}>
      {options.map(({ label, value }, idx) => (
        <RoundedLabel
          scroll={scroll}
          key={idx}
          active={value === currentValue}
          onClick={(e) => {
            onChange(e, value)
          }}
        >
          {label}
        </RoundedLabel>
      ))}
    </RoundedContainer>
  )
}
