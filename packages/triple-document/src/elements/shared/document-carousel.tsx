import { PropsWithChildren } from 'react'
import { MarginPadding } from '@titicaca/core-elements'
import { Carousel } from '@titicaca/carousel'

export default function DocumentCarousel({
  margin,
  children,
}: PropsWithChildren<{ margin?: MarginPadding }>) {
  return (
    <Carousel
      noFlicking
      margin={margin}
      containerPadding={{ left: 30, right: 30 }}
    >
      {children}
    </Carousel>
  )
}
