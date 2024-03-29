import { PropsWithChildren } from 'react'
import { MarginPadding, Carousel } from '@titicaca/kint5-core-elements'

export default function DocumentCarousel({
  margin,
  children,
  ...props
}: PropsWithChildren<{
  margin?: MarginPadding
}>) {
  return (
    <Carousel margin={margin} {...props}>
      {children}
    </Carousel>
  )
}
