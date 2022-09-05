import styled from 'styled-components'

const GridContainer = styled.div`
  display: grid;
  grid-auto-columns: 100%;
  & > div {
    grid-template-columns: repeat(auto-fit, 1fr);
  }
`

export default GridContainer
