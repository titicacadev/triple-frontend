import { Container } from '@titicaca/kint5-core-elements'
import styled from 'styled-components'

export const GridWrapper = styled(Container)`
  display: grid;
  grid-gap: 1px;
`

export const MediumWrapper = styled(Container)`
  position: relative;
  padding-top: 100%;
  width: 100%;
  height: 0;

  & > * {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  @media (min-width: 500px) {
    padding-top: 0;
    height: 100%;
  }
`
