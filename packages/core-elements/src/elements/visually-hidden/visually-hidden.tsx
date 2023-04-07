import { PropsWithChildren } from 'react'
import styled from 'styled-components'

const StyledDiv = styled.div`
  border: 0;
  clip: rect(0, 0, 0, 0);
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  white-space: nowrap;
  position: absolute;
`

export type VisuallyHiddenProps = PropsWithChildren

export const VisuallyHidden = ({ children, ...props }: VisuallyHiddenProps) => {
  return <StyledDiv {...props}>{children}</StyledDiv>
}
