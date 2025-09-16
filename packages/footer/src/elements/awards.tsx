import { Fragment } from 'react'
import styled from 'styled-components'
import { FlexBox } from '@titicaca/core-elements'

import { FooterAward } from '../utils/type'

const AwardImg = styled.img`
  width: 26px;
  height: 28px;
`

const Tooltip = styled.div`
  display: none;
  position: absolute;
  bottom: calc(100% + 4px);
  right: 0;
  border: 1px solid var(--color-brightGray);
  border-radius: 6px;
  padding: 8px 11px;
  background-color: var(--color-white);
  font-size: 10px;
  font-weight: 500;
  color: var(--color-gray800);
  line-height: 14px;
  white-space: pre;
`

const AwardFlexBox = styled(FlexBox).attrs({
  position: 'relative',
  flex: true,
  gap: 7,
  flexShrink: 0,
})`
  ${AwardImg}:hover + ${Tooltip} {
    display: block;
  }
`

export function AwardGroup({ awards }: { awards: FooterAward[] }) {
  return (
    <AwardFlexBox>
      {awards.map(({ imageUrl, alt, text }, index) => (
        <Fragment key={`award-${index}`}>
          <AwardImg src={imageUrl} alt={alt} />
          <Tooltip>{text}</Tooltip>
        </Fragment>
      ))}
    </AwardFlexBox>
  )
}
