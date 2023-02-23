import { forwardRef } from 'react'
import styled from 'styled-components'

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100vw;
  background-color: rgba(58, 58, 58, 0.7);
  z-index: 9999;
`

export interface ActionSheetOverlayProps {
  duration: number
}

export const ActionSheetOverlay = forwardRef<
  HTMLDivElement,
  ActionSheetOverlayProps
>((props, ref) => {
  return (
    <Overlay
      ref={ref}
      // style={{
      //   transition: `opacity ${duration}ms ease-in`,
      //   opacity: state === 'entering' || state === 'entered' ? 1 : 0,
      // }}
    />
  )
})
ActionSheetOverlay.displayName = 'ActionSheetOverlay'
