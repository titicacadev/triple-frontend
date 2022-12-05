import { useEffect, useRef, useState } from 'react'
import styled, { css } from 'styled-components'

import { PointingTabContext } from './pointing-tab-context'
import { TabListBase, TabListBaseProps } from './tab-list-base'
import { useTabs } from './tabs-context'

interface PointValue {
  left: number
  width: number
}

interface StyledTabListBaseProps extends PointValue {
  scroll: boolean
}

const StyledTabListBase = styled(TabListBase)<StyledTabListBaseProps>`
  position: relative;
  display: flex;
  border-bottom: 1px solid var(--color-gray50);

  ${({ scroll }) =>
    scroll &&
    css`
      overflow-x: scroll;
      -webkit-overflow-scrolling: touch;

      ::-webkit-scrollbar {
        display: none;
      }
    `}

  &::after {
    content: '';
    display: inline-block;
    position: absolute;
    bottom: 0;
    width: ${({ width }) => `${width}px`};
    left: ${({ left }) => `${left}px`};
    height: 2px;
    background: var(--color-blue);
    transition: all 0.2s;
  }
`

export const PointingTabList = <Value extends string>({
  children,
  ...props
}: TabListBaseProps) => {
  const tabs = useTabs<Value>()
  const tabsRef = useRef<Record<string, HTMLButtonElement | null>>({})
  const [pointValue, setPointValue] = useState<PointValue>({
    left: 0,
    width: 0,
  })

  useEffect(() => {
    if (Object.keys(tabsRef.current).length === 0) {
      return
    }

    const currentTab = tabsRef.current[tabs.value]

    if (currentTab) {
      setPointValue({
        left: currentTab.offsetLeft,
        width: currentTab.clientWidth,
      })
    }
  }, [tabs.value])

  return (
    <StyledTabListBase
      {...props}
      scroll={tabs.scroll}
      left={pointValue.left}
      width={pointValue.width}
    >
      <PointingTabContext.Provider
        value={{
          tabsRef,
          left: pointValue.left,
          width: pointValue.width,
        }}
      >
        {children}
      </PointingTabContext.Provider>
    </StyledTabListBase>
  )
}
