import React from 'react'
import { Container, Text, Button } from '@titicaca/core-elements'
import { useHistoryContext } from '@titicaca/react-contexts'
import styled from 'styled-components'

interface BookingCompletionProps {
  detailUrl?: string
  listUrl?: string
  descriptions?: string[]
}

const DescriptionText = styled(Text)`
  &::before {
    display: inline-block;
    content: '';
    width: 10px;
    height: 10px;
    background-image: url(https://assets.triple.guide/images/img-bullet-check-b@3x.png);
    background-size: 10px;
    background-repeat: no-repeat;
    margin-right: 5px;
  }
`

function BookingCompletion({
  detailUrl,
  listUrl,
  descriptions,
}: BookingCompletionProps) {
  const { navigate } = useHistoryContext()

  const moveToUrl = (url: string) => {
    navigate(url)
  }

  return (
    <Container>
      <Container padding={{ top: 120 }} margin={{ bottom: 12 }}>
        <Text size={28} bold>{`예약이 \n 접수되었습니다.`}</Text>
      </Container>
      {(descriptions || []).map((description, idx) => (
        <DescriptionText
          key={idx}
          size="small"
          color="blue"
          bold
          margin={{ bottom: 12 }}
        >
          {description}
        </DescriptionText>
      ))}
      <Text color="gray" size="mini" alpha={0.5}>
        자세한 사항은 내 예약에서 확인해주세요.
      </Text>
      {listUrl || detailUrl ? (
        <Container margin={{ top: 30 }}>
          <Button.Group horizontalGap={7}>
            {detailUrl ? (
              <Button
                basic
                inverted
                color="blue"
                size="small"
                onClick={() => moveToUrl(detailUrl)}
              >
                내 예약에서 확인
              </Button>
            ) : null}
            {listUrl ? (
              <Button
                basic
                inverted
                color="gray"
                size="small"
                onClick={() => moveToUrl(listUrl)}
              >
                다른 상품 더보기
              </Button>
            ) : null}
          </Button.Group>
        </Container>
      ) : null}
    </Container>
  )
}

export default BookingCompletion
