import { PropsWithChildren, useId } from 'react'

import { AccordionContent } from './accordion-content'
import { AccordionFolded } from './accordion-folded'
import { AccordionTitle } from './accordion-title'
import { AccordionContext } from './context'

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

/**
 * 콘텐츠를 확장하고 축소할 수 있는 영역입니다.
 */
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

Accordion.Content = AccordionContent
Accordion.Folded = AccordionFolded
Accordion.Title = AccordionTitle
