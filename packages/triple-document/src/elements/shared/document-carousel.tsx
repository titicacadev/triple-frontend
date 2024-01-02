import { PropsWithChildren } from 'react'
import { MarginPadding, Carousel } from '@titicaca/tds-ui'

export default function DocumentCarousel({
  margin,
  children,
}: PropsWithChildren<{ margin?: MarginPadding }>) {
  return (
    <Carousel
      css={{
        padding: '0 30px',
        marginLeft: margin?.left,
        marginRight: margin?.right,
        marginTop: margin?.top,
        marginBottom: margin?.bottom,
      }}
    >
      {children}
    </Carousel>
  )
}
