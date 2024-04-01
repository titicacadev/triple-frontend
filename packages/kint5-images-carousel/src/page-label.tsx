import styled from 'styled-components'

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

interface PageLabelProps {
  currentIndex: number
  totalCount: number
}

export function PageLabel({ currentIndex, totalCount }: PageLabelProps) {
  return (
    <PageLabelContainer>
      <PageLabelText>{`${currentIndex + 1} / ${totalCount}`}</PageLabelText>
    </PageLabelContainer>
  )
}
