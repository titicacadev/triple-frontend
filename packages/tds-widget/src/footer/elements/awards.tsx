import { Fragment } from 'react'
import { styled } from 'styled-components'
import { FlexBox } from '@titicaca/tds-ui'

import { FooterAward } from '../utils/type'
import { DESKTOP_MIN_WIDTH } from '../utils/constants'

const AwardImg = styled.img`
  width: 26px;
  height: 28px;
`

const Tooltip = styled.div`
  display: none;
  position: absolute;
  bottom: calc(100% + 11px);
  right: 0;
  border: 1px solid #dadbdf;
  border-radius: 8px;
  padding: 8px 11px;
  background-color: var(--color-white);
  font-size: 12px;
  font-weight: 400;
  color: #6e6f73;
  line-height: 14px;
  white-space: pre;
`

const AwardFlexBox = styled(FlexBox)`
  display: flex;
  position: relative;
  gap: 8px;
  flex-shrink: 0;

  ${AwardImg}:hover + ${Tooltip} {
    display: block;
  }

  @media (max-width: ${DESKTOP_MIN_WIDTH - 1}px) {
    display: none;
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
