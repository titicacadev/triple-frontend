import React, { useState, useEffect, useCallback } from 'react'
import fetch from 'isomorphic-fetch'
import { Image } from '@titicaca/core-elements'
import { useEventTrackingContext } from '@titicaca/react-contexts'
import { StaticIntersectionObserver } from '@titicaca/intersection-observer'

import { InventoryItem } from '../interfaces'

async function fetchInstallAppInventory({
  inventoryId,
}: {
  inventoryId?: string
}): Promise<any> {
  const response = await fetch(`/api/inventories/v1/${inventoryId}/items`, {
    credentials: 'same-origin',
  })
  const { items = [] } = await response.json()
  return items
}

export default function ArticleCardCTA({
  inventoryId,
  href,
  onCTAClick,
}: {
  inventoryId?: string
  href?: string
  onCTAClick: (e: React.SyntheticEvent) => void
}) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [inventories, setInventories] = useState<InventoryItem[]>([])
  const { trackEvent } = useEventTrackingContext()

  const handleCTAIntersect = useCallback(
    (cta: InventoryItem) => {
      trackEvent({
        ga: ['앱설치 유도 구좌_노출', cta.desc],
      })
    },
    [trackEvent],
  )

  const handleCTAClick = useCallback(
    (e: React.SyntheticEvent) => {
      trackEvent({
        ga: ['앱설치 유도 구좌_선택', inventories[0].desc],
      })
      onCTAClick(e)
    },
    [inventories, onCTAClick, trackEvent],
  )

  const handleIntersectionChange = ({
    isIntersecting,
  }: {
    isIntersecting: boolean
  }) => isIntersecting && setIsIntersecting(isIntersecting)

  useEffect(() => {
    async function fetchAndSetInventories() {
      const response = await fetchInstallAppInventory({ inventoryId })
      setInventories(response)
      handleCTAIntersect(response[0])
    }
    if (isIntersecting) {
      fetchAndSetInventories()
    }
  }, [isIntersecting, inventoryId, setInventories, handleCTAIntersect])

  return (
    <StaticIntersectionObserver
      threshold={0.7}
      onChange={handleIntersectionChange}
    >
      <a href={href}>
        <Image borderRadius={6}>
          <Image.FixedRatioFrame frame="huge" onClick={handleCTAClick}>
            <Image.Img src={inventories[0] && inventories[0].image} />
          </Image.FixedRatioFrame>
        </Image>
      </a>
    </StaticIntersectionObserver>
  )
}
