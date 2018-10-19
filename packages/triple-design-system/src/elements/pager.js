import React from 'react'
import styled from 'styled-components'
import PagerCarousel from 'nuka-carousel'
import Container from './container'

const CurrentPageContent = styled.div`
  font-size: 12px;
  font-weight: bold;
  font-family: sans-serif;
`

const CurrentPageContainer = styled.div`
  margin: 10px;
  padding: 5px 7px;
  color: #ffffff;
  border-radius: 12px;
  background-color: rgba(0, 0, 0, 0.2);
`

function CurrentPage({ children }) {
  return (
    <CurrentPageContainer>
      <CurrentPageContent>{children}</CurrentPageContent>
    </CurrentPageContainer>
  )
}

const Pager = ({ margin, borderRadius, children }) => (
  <Container margin={margin} borderRadius={borderRadius}>
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
