import { PropsWithChildren } from 'react'

import Container from '../container'

import { useAccordion } from './accordion-context'

type AccordionContentProps = PropsWithChildren

export const AccordionContent = ({
  children,
  ...props
}: AccordionContentProps) => {
  const { active, contentId } = useAccordion()

  if (!active) {
    return null
  }

  return (
    <Container
      id={contentId}
      css={{
        margin: '5px 0 0',
      }}
      {...props}
    >
      {children}
    </Container>
  )
}
