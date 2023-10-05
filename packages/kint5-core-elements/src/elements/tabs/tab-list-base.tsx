import { PropsWithChildren } from 'react'
import { RovingTabIndexProvider } from 'react-roving-tabindex'

export type TabListBaseProps = PropsWithChildren

export const TabListBase = ({ children, ...props }: TabListBaseProps) => {
  return (
    <RovingTabIndexProvider
      options={{
        direction: 'horizontal',
        focusOnClick: true,
        loopAround: true,
      }}
    >
      <div role="tablist" aria-orientation="horizontal" {...props}>
        {children}
      </div>
    </RovingTabIndexProvider>
  )
}
