import styled, { css } from 'styled-components'

import { usePointingTab } from './pointing-tab-context'
import { TabBase, TabBaseProps } from './tab-base'
import { useTabs } from './tabs-context'

interface StyledTabBaseProps {
  $scroll: boolean
}

const StyledTabBase = styled(TabBase)<StyledTabBaseProps>`
  flex: 1;
  font-size: 14px;
  line-height: 17px;
  font-weight: bold;
  color: #747c86;
  padding: 15.5px 0;

  &[aria-selected='true'] {
    color: #000;
  }

  ${({ $scroll }) =>
    $scroll &&
    css`
      flex: none;
      padding: 11px 18px;
    `}
`

export const PointingTab = <Value extends number | string | symbol>({
  children,
  ...props
}: TabBaseProps<Value>) => {
  const tabs = useTabs<Value>()
  const { tabsRef } = usePointingTab<Value>()

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
