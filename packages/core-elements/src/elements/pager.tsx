import * as React from 'react'
import PagerCarousel from 'nuka-carousel'
import Container from './container'
import { MarginPadding } from '../commons'

const Pager = ({
  margin,
  borderRadius,
  currentPage,
  onPageChange,
  pageLabelComponent,
  children,
}: {
  margin?: MarginPadding
  borderRadius?: number
  currentPage?: number
  onPageChange?: (slideIndex: number) => void
  pageLabelComponent?: PagerCarousel['props']['renderTopRightControls']
  children?: React.ReactNode
}) => (
  <Container margin={margin} borderRadius={borderRadius}>
    <PagerCarousel
      slideIndex={currentPage}
      afterSlide={onPageChange}
      speed={100}
      renderTopRightControls={pageLabelComponent}
      renderBottomCenterControls={() => null}
      renderCenterLeftControls={() => null}
      renderCenterRightControls={() => null}
    >
      {children}
    </PagerCarousel>
  </Container>
)

export default Pager
