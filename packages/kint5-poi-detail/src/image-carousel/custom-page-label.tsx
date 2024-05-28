import styled from 'styled-components'
import { RendererParams } from '@titicaca/kint5-image-carousel'
import { FlexBox } from '@titicaca/kint5-core-elements'

const PageLabelText = styled.span`
  font-size: 12px;
  color: #fff;
  line-height: normal;
`

const PageLabelContainer = styled.div`
  margin: 12px;
  padding: 5px 11px;
  color: #fff;
  border-radius: 12px;
  background-color: rgba(0, 0, 0, 0.5);
  line-height: normal;
`

export function CustomPageLabel({ currentIndex, totalCount }: RendererParams) {
  return (
    <PageLabelContainer>
      <FlexBox flex alignItems="center" gap="4px">
        <PageLabelText css={{ fontWeight: 700 }}>
          {currentIndex + 1}
        </PageLabelText>
        <PageLabelText> / </PageLabelText>
        <PageLabelText>{totalCount}</PageLabelText>
      </FlexBox>
    </PageLabelContainer>
  )
}
