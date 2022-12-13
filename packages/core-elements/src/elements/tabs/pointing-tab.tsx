import styled, { css } from 'styled-components'

import { usePointingTab } from './pointing-tab-context'
import { TabBase, TabBaseProps } from './tab-base'
import { useTabs } from './tabs-context'

interface StyledTabBaseProps {
  $scroll: boolean
}

const StyledTabBase = styled(TabBase)<StyledTabBaseProps>`
  flex: 1;
  font-size: 15px;
  font-weight: bold;
  color: var(--color-gray300);
  padding: 11px 0;

  &[aria-selected='true'] {
    color: var(--color-gray);
  }

  ${({ $scroll }) =>
    $scroll &&
    css`
      flex: none;

      padding: 11px 18px;
    `}
`

export const PointingTab = <Value,>({ children, ...props }: TabBaseProps) => {
  const tabs = useTabs<Value>()
  const { tabsRef } = usePointingTab()

  return (
    <StyledTabBase
      ref={(node) => (tabsRef.current[props.value] = node)}
      $scroll={tabs.scroll}
      {...props}
    >
      {children}
    </StyledTabBase>
  )
}
