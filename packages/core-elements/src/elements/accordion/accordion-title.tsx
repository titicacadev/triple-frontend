import { PropsWithChildren } from 'react'
import styled from 'styled-components'

import { useAccordion } from './context'

const folded =
  'https://assets.triple.guide/images/ico-accordion-expand-fold@4x.png'
const unfolded =
  'https://assets.triple.guide/images/ico-accordion-expand-more@4x.png'

const Title = styled.button<{ active: boolean }>`
  position: relative;
  display: block;
  width: 100%;
  text-align: start;

  &::after {
    position: absolute;
    top: 0;
    right: 0;
    width: 34px;
    height: 34px;
    background-image: ${({ active }) =>
      active ? `url(${folded}) ` : `url(${unfolded}) `};
    background-size: 34px 34px;
    background-position: 0 -7px;
    background-repeat: no-repeat;
    content: '';
    cursor: pointer;
  }
`

export type AccordionTitleProps = PropsWithChildren

export const AccordionTitle = ({ children, ...props }: AccordionTitleProps) => {
  const { active, contentId, foldedId, onActiveChange } = useAccordion()

  return (
    <Title
      active={active}
      aria-controls={`${contentId} ${foldedId}`}
      aria-expanded={active}
      onClick={onActiveChange}
      {...props}
    >
      {children}
    </Title>
  )
}
