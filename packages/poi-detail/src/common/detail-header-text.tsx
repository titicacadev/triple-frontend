import React from 'react'
import { Text, Rating, Icon } from '@titicaca/core-elements'
import { formatNumber } from '@titicaca/view-utilities'

import { PoiVersion } from './types'
import { ArrowButton } from './arrow-button'

export function DetailHeaderTitle({ title }: { title: string | null }) {
  return <Text.Title>{title}</Text.Title>
}

export function DetailHeaderLocalText({ text }: { text: string | null }) {
  return (
    <Text size="tiny" alpha={0.5}>
      {text}
    </Text>
  )
}

export function DetailHeadterReviewCount({
  version = PoiVersion.V1,
  count,
  rating,
  onClick,
}: {
  version?: PoiVersion
  rating: number
  count: number
  onClick?: () => void
}) {
  return (
    <Text
      inline
      bold
      size="mini"
      alpha={1}
      margin={{ right: 10 }}
      onClick={version === PoiVersion.V1 ? onClick : undefined}
    >
      <Rating score={rating} />
      {` ${formatNumber(count)}`}
      {version === PoiVersion.V2 ? (
        <ArrowButton onClick={onClick}>리뷰보기</ArrowButton>
      ) : null}
    </Text>
  )
}

export function DetailHeaderScrapCount({ count }: { count: number }) {
  return (
    <Text inline bold size="mini" alpha={1}>
      <Icon name="save" size="tiny" />
      {` ${formatNumber(count)}`}
    </Text>
  )
}
