import { ReactNode } from 'react'
import styled from 'styled-components'

interface FlickingLabelProps {
  labelElement: ReactNode
}

const TopRightControl = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
`

export function FlickingPageLabel({ labelElement }: FlickingLabelProps) {
  return <TopRightControl>{labelElement}</TopRightControl>
}
