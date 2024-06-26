import { PropsWithChildren, useId } from 'react'

import { AccordionContext } from './accordion-context'

export interface AccordionProps extends PropsWithChildren {
  /**
   * true일 때는 Content, false일 때는 Folded가 보입니다.
   */
  active: boolean
  /**
   * active가 변경될 때 콜백
   */
  onActiveChange?: () => void
}

export const Accordion = ({
  children,
  active,
  onActiveChange,
}: AccordionProps) => {
  const contentId = useId()
  const foldedId = useId()

  return (
    <AccordionContext.Provider
      value={{
        active,
        contentId,
        foldedId,
        onActiveChange: () => onActiveChange?.(),
      }}
    >
      {children}
    </AccordionContext.Provider>
  )
}
