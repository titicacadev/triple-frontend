import { PropsWithChildren, useEffect } from 'react'
import styled, { css } from 'styled-components'

import { MarginPadding } from '../../commons'
import { paddingMixin, layeringMixin, LayeringMixinProps } from '../../mixins'

import { useImageState } from './context'

type OverlayType = 'gradient' | 'dark'

const OverlayStyle: { [key in OverlayType]: ReturnType<typeof css> } = {
  dark: css`
    background-color: rgba(0, 0, 0, 0.8);
  `,
  gradient: css`
    background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.6),
      rgba(0, 0, 0, 0)
    );
  `,
}

const OverlayContainer = styled.div<
  {
    borderRadius: number
    padding?: MarginPadding
    overlayType?: OverlayType
  } & LayeringMixinProps
>`
  box-sizing: border-box;
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;

  border-radius: ${({ borderRadius }) => borderRadius}px;

  ${({ overlayType = 'gradient' }) => OverlayStyle[overlayType]}

  ${paddingMixin}
  ${layeringMixin(0)}
`

export default function ImageOverlay({
  overlayType = 'gradient',
  padding,
  zTier,
  zIndex,
  children,
}: PropsWithChildren<
  {
    overlayType?: OverlayType
    padding?: MarginPadding
  } & LayeringMixinProps
>) {
  const { borderRadius, setOverlayMounted } = useImageState()

  useEffect(() => {
    setOverlayMounted(true)

    return () => {
      setOverlayMounted(false)
    }
  }, [setOverlayMounted])

  return (
    <OverlayContainer
      overlayType={overlayType}
      padding={padding}
      borderRadius={borderRadius}
      zTier={zTier}
      zIndex={zIndex}
    >
      {children}
    </OverlayContainer>
  )
}
