import { PropsWithChildren } from 'react'
import { FocusScope } from '@react-aria/focus'

export type TabListBaseProps = PropsWithChildren

export const TabListBase = ({ children, ...props }: TabListBaseProps) => {
  return (
    <FocusScope>
      <div role="tablist" aria-orientation="horizontal" {...props}>
        {children}
      </div>
    </FocusScope>
  )
}
