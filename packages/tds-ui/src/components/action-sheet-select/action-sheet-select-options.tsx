import {
  FloatingFocusManager,
  FloatingList,
  FloatingPortal,
} from '@floating-ui/react'
import { useId } from 'react'

import { ActionSheetOverlay } from '../action-sheet/action-sheet-overlay'
import {
  ActionSheetBody,
  ActionSheetBodyProps,
} from '../action-sheet/action-sheet-body'
import { FlexBox } from '../flex-box'

import { useActionSheetSelect } from './action-sheet-select-context'

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
  const portalId = useId()
  const { floating, interactions, transitionStatus, labelId, listRef } =
    useActionSheetSelect()

  const { context, refs } = floating
  const { getFloatingProps } = interactions
  const { isMounted, status } = transitionStatus

  if (!isMounted) {
    return null
  }

  return (
    <FloatingPortal id={portalId}>
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
