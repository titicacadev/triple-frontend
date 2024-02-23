import styled from 'styled-components'

import { RendererParams } from './types'

const PageLabelText = styled.div`
  font-size: 12px;
  font-weight: bold;
`

const PageLabelContainer = styled.div`
  margin: 10px;
  padding: 5px 7px;
  color: #fff;
  border-radius: 12px;
  background-color: rgba(0, 0, 0, 0.5);
`

export function PageLabel({ currentIndex, totalCount }: RendererParams) {
  return (
    <PageLabelContainer>
      <PageLabelText>{`${currentIndex + 1} / ${
        totalCount < 0 ? '-' : totalCount
      }`}</PageLabelText>
    </PageLabelContainer>
  )
}
