import { MarginPadding, Carousel } from '@titicaca/core-elements'

export default function DocumentCarousel({
  margin,
  children,
}: React.PropsWithChildren<{ margin?: MarginPadding }>) {
  return (
    <Carousel margin={margin} containerPadding={{ left: 30, right: 30 }}>
      {children}
    </Carousel>
  )
}
