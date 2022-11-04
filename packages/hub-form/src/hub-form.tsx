import { PropsWithChildren } from 'react'
import styled from 'styled-components'
import { CardFrame } from '@titicaca/core-elements'

const HubFormFrame = styled(CardFrame)`
  > div:not(:last-child) {
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      right: 0;
      left: 35px;
      background: rgba(239, 239, 239, 0.5);
      height: 1px;
    }
  }
`

function HubForm({
  children,
  shadow,
  ...props
}: PropsWithChildren<Parameters<typeof HubFormFrame>['0']>) {
  return (
    <HubFormFrame
      margin={{ top: 10, bottom: 10 }}
      padding={{ top: 4, bottom: 4, right: 18, left: 22 }}
      borderRadius={6}
      shadow={shadow || 'medium'}
      {...props}
    >
      {children}
    </HubFormFrame>
  )
}

export default HubForm
