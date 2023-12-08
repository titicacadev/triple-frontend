import { PropsWithChildren } from 'react'
import { CSSObject } from 'styled-components'

import { FlexBox } from '../flex-box'
import { CaretDownIcon, CaretUpIcon } from '../icon'

import { useAccordion } from './accordion-context'

export interface AccordionTitleProps {
  foldIconPosition?: 'left' | 'right'
  containerCss?: CSSObject
}

const CARET_ICON_SIZE_PX = 16

export const AccordionTitle = ({
  children,
  foldIconPosition = 'left',
  containerCss,
  ...props
}: PropsWithChildren<AccordionTitleProps>) => {
  const { active, contentId, foldedId, onActiveChange } = useAccordion()

  return (
    <FlexBox
      flex
      css={{
        alignItems: 'center',
        justifyContent:
          foldIconPosition === 'left' ? 'flex-start' : 'space-between',
        ...(foldIconPosition === 'left' && { gap: 4 }),
        ...containerCss,
      }}
    >
      <button
        aria-controls={`${contentId} ${foldedId}`}
        aria-expanded={active}
        onClick={onActiveChange}
        css={{ display: 'flex', textAlign: 'start' }}
        {...props}
      >
        {children}
      </button>
      {active ? (
        <CaretUpIcon width={CARET_ICON_SIZE_PX} height={CARET_ICON_SIZE_PX} />
      ) : (
        <CaretDownIcon width={CARET_ICON_SIZE_PX} height={CARET_ICON_SIZE_PX} />
      )}
    </FlexBox>
  )
}
