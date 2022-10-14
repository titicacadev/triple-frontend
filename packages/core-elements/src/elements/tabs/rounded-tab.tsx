import styled, { css } from 'styled-components'

import { MarginPadding } from '../../commons'
import { paddingMixin } from '../../mixins'

import TabContainer from './tab-container'
import TabLabel from './tab-label'
import { TabProps } from './types'

const RoundedContainer = styled(TabContainer)<{ padding?: MarginPadding }>`
  display: flex;
  gap: 5px;
  padding: 10px 30px;
  ${paddingMixin}
`

const RoundedLabel = styled(TabLabel)`
  padding: 8px 14px;
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
  containerPadding,
}: TabProps<Value> & {
  containerPadding?: MarginPadding
}) {
  return (
    <RoundedContainer scroll={scroll} padding={containerPadding}>
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
