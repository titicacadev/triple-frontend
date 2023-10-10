import { PropsWithChildren } from 'react'
import { MarginPadding } from '@titicaca/tds-ui'
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
