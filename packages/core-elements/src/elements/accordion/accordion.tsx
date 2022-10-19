import { PropsWithChildren, useId } from 'react'

import { AccordionContent } from './accordion-content'
import { AccordionFolded } from './accordion-folded'
import { AccordionTitle } from './accordion-title'
import { AccordionContext } from './context'

export interface AccordionProps extends PropsWithChildren {
  active: boolean
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

Accordion.Content = AccordionContent
Accordion.Folded = AccordionFolded
Accordion.Title = AccordionTitle
