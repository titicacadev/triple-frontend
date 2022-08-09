import styled from 'styled-components'

import { RendererParams } from './types'

const PageLabelText = styled.div`
  font-size: 12px;
  font-weight: bold;
`

const PageLabelContainer = styled.div`
  margin: 10px;
  padding: 5px 7px;
  color: #ffffff;
  border-radius: 12px;
  background-color: rgba(0, 0, 0, 0.2);
`

export function PageLabel({ currentIndex, totalCount }: RendererParams) {
  return (
    <PageLabelContainer>
      <PageLabelText>{`${currentIndex + 1} / ${totalCount}`}</PageLabelText>
    </PageLabelContainer>
  )
}
