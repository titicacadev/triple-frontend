import styled from 'styled-components'

import Container, { ContainerProps } from './container'

export interface FlexBoxProps extends ContainerProps {
  flex?: boolean
}

const FlexBox = styled(Container)<FlexBoxProps>(
  (props) => ({
    display: props.flex ? 'flex' : undefined,
  }),
  (props) => props.css,
)

export default FlexBox
