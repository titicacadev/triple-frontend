import React from 'react'
import PagerCarousel from 'nuka-carousel'
import Container from './container'

const Pager = ({
  margin,
  borderRadius,
  currentPage,
  onPageChange,
  pageLabelComponent,
  children,
}) => (
  <Container margin={margin} borderRadius={borderRadius}>
    <PagerCarousel
      slideIndex={currentPage}
      afterSlide={onPageChange}
      speed={100}
      renderTopRightControls={pageLabelComponent}
      renderBottomCenterControls={null}
      renderCenterLeftControls={null}
      renderCenterRightControls={null}
    >
      {children}
    </PagerCarousel>
  </Container>
)

export default Pager
