import { FlexBox, Text, Container } from '@titicaca/core-elements'
import styled from 'styled-components'
import { useState } from 'react'

export interface RecentCheckboxProps {
  isRecentReview: boolean
  onRecentReviewChange: () => void
}

const CheckBox = styled.input`
  appearance: none;
  box-sizing: border-box;
  width: 22px;
  height: 22px;
  margin-right: 8px;
  border: 1px solid var(--color-gray200);
  border-radius: 5px;
  cursor: pointer;

  &:after {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    background-image: url('https://assets.triple.guide/images/ico-check@3x.png');
    background-size: 100% 100%;
  }

  &:checked {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--color-blue);
    border: none;
  }
`

const TooltipInfo = styled(Text)`
  position: absolute;
  top: 101px;
  right: 0;
  bottom: 0;
  z-index: 1;
  background: var(--color-white);
  min-width: 200px;
  min-height: 60px;
  border: 1px solid var(--color-brightGray);
  border-radius: 8px;
  transform: translateY(calc(-100% - 10px));
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.05);
`

const OpenIcon = styled.img`
  margin-top: 3px;
  margin-left: 6px;
`

const CloseIcon = styled.img`
  position: absolute;
  top: 17px;
  right: 15px;
`

export default function RecentCheckBox({
  isRecentReview,
  onRecentReviewChange,
}: RecentCheckboxProps) {
  return (
    <FlexBox flex alignItems="center" position="relative" cursor="pointer">
      <FlexBox flex alignItems="center" onClick={onRecentReviewChange}>
        <CheckBox type="checkbox" checked={isRecentReview} />
        <Text size={14}>최근 여행</Text>
      </FlexBox>
      <ToolTip />
    </FlexBox>
  )
}

function ToolTip() {
  const [isVisible, setIsVisible] = useState(false)
  return (
    <Container>
      <OpenIcon
        width={14}
        height={14}
        src="https://assets.triple.guide/images/ico_tooltip_info.png"
        onClick={() => setIsVisible(true)}
      />
      {isVisible ? (
        <TooltipInfo
          size={12}
          lineHeight="16px"
          color="gray800"
          padding={{ top: 15, left: 15, bottom: 15, right: 37 }}
        >
          최근 6개월 내에 방문한 여행의 리뷰만 모아 볼 수 있습니다.
          <CloseIcon
            width={10}
            height={10}
            src="https://assets.triple.guide/images/ico_tooltip_delete.png"
            onClick={() => setIsVisible(false)}
          />
        </TooltipInfo>
      ) : null}
    </Container>
  )
}
