import { FlexBox } from '@titicaca/core-elements'
import { useCallback, useState } from 'react'
import styled from 'styled-components'

const RepresentativePurchaseName = styled.span<{ overflow: boolean }>`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
`

const ExtraInfo = styled.span`
  white-space: nowrap;
  flex-shrink: 0;
`

const ShowMoreButton = styled.button`
  margin-left: 5px;
  background: url('https://assets.triple-dev.titicaca-corp.com/images/ico_arrow_down_gray30.svg')
    center center no-repeat;
  width: 18px;
  height: 18px;
  flex-shrink: 0;
`

export default function PurchaseInfo({
  displayName,
  purchaseCount,
}: {
  displayName: string
  purchaseCount: number
}) {
  const [isEllipsis, setIsEllipsis] = useState(false)
  const [showFullName, setShowFullName] = useState(false)

  const ref = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      setIsEllipsis(node.scrollWidth > node.clientWidth)
    }
  }, [])

  return (
    <FlexBox
      flex
      css={{
        width: '100%',
        marginBottom: 6,
        color: 'var(--color-gray500)',
        fontSize: 14,
      }}
    >
      {!showFullName ? (
        <>
          <RepresentativePurchaseName ref={ref} overflow>
            {displayName}
          </RepresentativePurchaseName>
          {purchaseCount > 0 ? (
            <ExtraInfo>&nbsp;{`외 ${purchaseCount}건`}</ExtraInfo>
          ) : null}
          {isEllipsis ? (
            <ShowMoreButton onClick={() => setShowFullName(true)} />
          ) : null}
        </>
      ) : (
        <>
          {displayName}
          {purchaseCount > 0 ? ` 외 ${purchaseCount}건` : null}
        </>
      )}
    </FlexBox>
  )
}
