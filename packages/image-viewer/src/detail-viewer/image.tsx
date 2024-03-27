import { ComponentProps } from 'react'
import styled from 'styled-components'
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'

const StyledImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  margin: auto;
`

export default function Image(props: ComponentProps<typeof StyledImage>) {
  return (
    <TransformWrapper wheel={{ wheelDisabled: true }}>
      <TransformComponent
        wrapperStyle={{ width: '100%', height: '100%', margin: 'auto' }}
        contentStyle={{ width: '100%', height: '100%', margin: 'auto' }}
      >
        <StyledImage {...props} />
      </TransformComponent>
    </TransformWrapper>
  )
}
