import { useEffect, useId } from 'react'
import {
  FloatingFocusManager,
  FloatingPortal,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
  useTransitionStatus,
} from '@floating-ui/react'

import { FlexBox } from '../flex-box'

import { ActionSheetBody, ActionSheetBodyProps } from './action-sheet-body'
import { ActionSheetContext } from './action-sheet-context'
import { ActionSheetOverlay } from './action-sheet-overlay'
import { TRANSITION_DURATION } from './constants'

export interface ActionSheetProps
  extends Pick<
    Partial<ActionSheetBodyProps>,
    | 'children'
    | 'borderRadius'
    | 'bottomSpacing'
    | 'from'
    | 'maxContentHeight'
    | 'title'
  > {
  open?: boolean
  lockScroll?: boolean
  onClose?: () => void
  onEnter?: () => void
  onEntered?: () => void
  onExit?: () => void
  onExited?: () => void
}

export const ActionSheet = ({
  children,
  open = false,
  lockScroll = true,
  title,
  borderRadius = 12,
  bottomSpacing = 13,
  from = 'bottom',
  maxContentHeight = 'calc(100vh - 256px)',
  onClose,
  onEnter,
  onEntered,
  onExit,
  onExited,
  ...props
}: ActionSheetProps) => {
  const portalId = useId()
  const labelId = useId()

  const { context, refs } = useFloating({
    open,
    onOpenChange: (open) => (open ? undefined : onClose?.()),
  })

  if (open) {
    // eslint-disable-next-line no-console
    console.log('ActionSheet render', context, 'portalId', portalId)
  }

  const dismiss = useDismiss(context, {
    outsidePress: (event) => {
      return !!(event.target as HTMLElement).closest?.(
        `#${CSS.escape(portalId)}`,
      )
    },
  })
  const role = useRole(context, { role: 'dialog' })

  const { getFloatingProps } = useInteractions([dismiss, role])

  const { isMounted, status } = useTransitionStatus(context, {
    duration: TRANSITION_DURATION,
  })

  useEffect(() => {
    if (status === 'open') {
      onEnter?.()
      const timeout = setTimeout(() => onEntered?.(), TRANSITION_DURATION)
      return () => clearTimeout(timeout)
    } else if (status === 'close') {
      onExit?.()
      const timeout = setTimeout(() => onExited?.(), TRANSITION_DURATION)
      return () => clearTimeout(timeout)
    }
  }, [onEnter, onEntered, onExit, onExited, status])

  return (
    <ActionSheetContext.Provider value={{ open, onClose }}>
      {isMounted ? (
        <FloatingPortal id={portalId}>
          {lockScroll && (
            <ActionSheetOverlay
              transitionStatus={status}
              lockScroll={lockScroll}
            />
          )}
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
              ...(!lockScroll && { pointerEvents: 'none' }),
            }}
          >
            <FloatingFocusManager
              context={context}
              initialFocus={refs.floating}
            >
              <ActionSheetBody
                ref={refs.setFloating}
                borderRadius={borderRadius}
                bottomSpacing={bottomSpacing}
                maxContentHeight={maxContentHeight}
                from={from}
                title={title}
                labelId={labelId}
                transitionStatus={status}
                aria-modal
                css={{ pointerEvents: 'auto' }}
                {...getFloatingProps(props)}
              >
                {children}
              </ActionSheetBody>
            </FloatingFocusManager>
          </FlexBox>
        </FloatingPortal>
      ) : null}
    </ActionSheetContext.Provider>
  )
}
