import styled, { css } from 'styled-components'

import { TabListBase, TabListBaseProps } from './tab-list-base'
import { useTabs } from './tabs-context'

interface StyledTabListBaseProps {
  scroll: boolean
}

const StyledTabListBase = styled(TabListBase)<StyledTabListBaseProps>`
  display: flex;
  gap: 5px;
  padding: 10px 30px;

  ${({ scroll }) =>
    scroll &&
    css`
      overflow-x: scroll;
      -webkit-overflow-scrolling: touch;

      ::-webkit-scrollbar {
        display: none;
      }
    `}
`

export const RoundedTabList = <Value,>({
  children,
  ...props
}: TabListBaseProps) => {
  const tabs = useTabs<Value>()

  return (
    <StyledTabListBase {...props} scroll={tabs.scroll}>
      {children}
    </StyledTabListBase>
  )
}
