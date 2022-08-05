import { Container, FlexBox } from '@titicaca/core-elements'
import styled from 'styled-components'

export const GridWrapper = styled(Container)`
  display: grid;
  grid-gap: 5px;
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

export const Dimmer = styled(FlexBox)`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  color: var(--color-white900);
`
