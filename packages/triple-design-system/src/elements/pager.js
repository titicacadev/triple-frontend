import React from 'react'
import styled from 'styled-components'
import PagerCarousel from 'nuka-carousel'
import Container from './container'

const CurrentPage = styled.div`
  margin: 10px;
  padding: 5px 7px;
  font-size: 11px;
  line-height: 11px;
  font-weight: bold;
  color: #ffffff;
  border-radius: 11px;
  background-color: rgba(0, 0, 0, 0.2);
`

const Pager = ({ margin, children }) => (
  <Container margin={margin}>
    <PagerCarousel
      renderTopRightControls={({ currentSlide }) => (
        <CurrentPage>{`${currentSlide + 1} / ${children.length}`}</CurrentPage>
      )}
      renderBottomCenterControls={null}
      renderCenterLeftControls={null}
      renderCenterRightControls={null}
    >
      {children}
    </PagerCarousel>
  </Container>
)

export default Pager
