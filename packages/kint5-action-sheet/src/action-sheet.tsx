import { useEffect, useId } from 'react'
import { FlexBox } from '@titicaca/kint5-core-elements'
import {
  FloatingFocusManager,
  FloatingPortal,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
  useTransitionStatus,
} from '@floating-ui/react'

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
    | 'bodyContainerCss'
  > {
  open?: boolean
  onClose?: () => void
  onEnter?: () => void
  onEntered?: () => void
  onExit?: () => void
  onExited?: () => void
}

/**
 * ActionSheet
 */
export const ActionSheet = ({
  children,
  open = false,
  title,
  borderRadius = 12,
  bottomSpacing = 13,
  from = 'bottom',
  maxContentHeight = 'calc(100vh - 256px)',
  bodyContainerCss,
  onClose,
  onEnter,
  onEntered,
  onExit,
  onExited,
  ...props
}: ActionSheetProps) => {
  const labelId = useId()

  const { context, elements, refs } = useFloating({
    open,
  })

  const dismiss = useDismiss(context)
  const role = useRole(context, { role: 'dialog' })
  const click = useClick(context)

  const { getFloatingProps, getReferenceProps } = useInteractions([
    dismiss,
    role,
    click,
  ])

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
      // 액션시트가 열린 상태에서 unmount되는 경우를 처리합니다.
      // (e.g. 액션시트가 열린 상태에서 다른 페이지로 이동)
      if (status === 'open') {
        bodyStyle.overflow = ''
      }
    }
  }, [status, context])

  return (
    <ActionSheetContext.Provider value={{ open, onClose }}>
      {isMounted ? (
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
            ref={refs.setReference}
            {...getReferenceProps({
              onClick: (e) => {
                if (elements.floating?.contains(e.target as Node)) {
                  return
                }

                onClose?.()
              },
            })}
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
                bodyContainerCss={bodyContainerCss}
                aria-modal
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
