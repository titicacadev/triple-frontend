import { useEffect } from 'react'
import {
  FloatingFocusManager,
  FloatingList,
  FloatingPortal,
} from '@floating-ui/react'
import { FlexBox } from '@titicaca/kint5-core-elements'

import { useActionSheetSelect } from './action-sheet-select-context'
import { ActionSheetOverlay } from './action-sheet-overlay'
import { ActionSheetBody, ActionSheetBodyProps } from './action-sheet-body'

export type ActionSheetSelectOptions = Pick<
  ActionSheetBodyProps,
  | 'children'
  | 'borderRadius'
  | 'bottomSpacing'
  | 'from'
  | 'maxContentHeight'
  | 'title'
>

export const ActionSheetSelectOptions = ({
  children,
  borderRadius,
  bottomSpacing,
  from,
  maxContentHeight,
  title,
  ...props
}: ActionSheetSelectOptions) => {
  const { floating, interactions, transitionStatus, labelId, listRef } =
    useActionSheetSelect()

  const { context, refs } = floating
  const { getFloatingProps } = interactions
  const { isMounted, status } = transitionStatus

  useEffect(() => {
    const bodyStyle = document.body.style
    const isRendered = !!document.getElementById(context.floatingId)

    if (!isRendered) {
      return
    }

    if (status === 'open') {
      bodyStyle.overflow = 'hidden'
    }

    if (status === 'close') {
      bodyStyle.overflow = ''
    }

    return () => {
      bodyStyle.overflow = ''
    }
  }, [status, context])

  if (!isMounted) {
    return null
  }

  return (
    <FloatingPortal>
      <ActionSheetOverlay transitionStatus={status} />
      <FlexBox
        flex
        justifyContent="center"
        css={{
          position: 'fixed',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          zIndex: 9999,
        }}
      >
        <FloatingFocusManager context={context}>
          <FloatingList elementsRef={listRef}>
            <ActionSheetBody
              ref={refs.setFloating}
              borderRadius={borderRadius}
              bottomSpacing={bottomSpacing}
              maxContentHeight={maxContentHeight}
              from={from}
              title={title}
              labelId={labelId}
              transitionStatus={status}
              {...getFloatingProps(props)}
            >
              {children}
            </ActionSheetBody>
          </FloatingList>
        </FloatingFocusManager>
      </FlexBox>
    </FloatingPortal>
  )
}
