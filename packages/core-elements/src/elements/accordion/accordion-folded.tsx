import { PropsWithChildren } from 'react'

import Container from '../container'

import { useAccordion } from './context'

export type AccordionFoldedProps = PropsWithChildren

export const AccordionFolded = ({
  children,
  ...props
}: AccordionFoldedProps) => {
  const { active, foldedId } = useAccordion()

  if (active) {
    return null
  }

  return (
    <Container
      id={foldedId}
      css={{
        margin: '5px 0 0',
      }}
      {...props}
    >
      {children}
    </Container>
  )
}
