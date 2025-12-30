import styled, { CSSProp } from 'styled-components'
import { ComponentPropsWithoutRef } from 'react'
import { shouldForwardProp } from '@titicaca/core-elements'

const HandleContainer = styled.div.withConfig({
  shouldForwardProp,
})<{ css?: CSSProp }>`
  position: absolute;
  width: 70px;
  height: 90px;
  transform: translate(-50%, -50%);
  z-index: 1;
  ${(props) => props.css}
`

const HandlePeg = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 18px;
  height: 18px;
  border-radius: 18px;
  border: solid 3px #368fff;
  background-color: #fff;
  transform: translate(-50%, -50%);
  z-index: 1;
`

export default function Handle({
  percent,
  ...props
}: { percent: number } & ComponentPropsWithoutRef<'div'>) {
  return (
    <HandleContainer
      {...props}
      css={{
        left: `${percent}%`,
      }}
    >
      <HandlePeg />
    </HandleContainer>
  )
}
