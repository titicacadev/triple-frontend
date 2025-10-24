import { PropsWithChildren } from 'react'
import { styled } from 'styled-components'
import { CardFrame, CardProps } from '@titicaca/tds-ui'

const HubFormFrame = styled(CardFrame)`
  & > div:not(:last-child) {
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

export function HubForm({
  children,
  shadow,
  ...props
}: PropsWithChildren<CardProps>) {
  return (
    <HubFormFrame
      shadow={shadow || 'medium'}
      css={{
        marginTop: 10,
        marginBottom: 10,
        paddingTop: 4,
        paddingBottom: 4,
        paddingRight: 18,
        paddingLeft: 22,
      }}
      {...props}
    >
      {children}
    </HubFormFrame>
  )
}
