import React, { useCallback } from 'react'
import { Text, Tag, Container, SquareImage } from '@titicaca/core-elements'
import { formatNumber } from '@titicaca/view-utilities'
import IntersectionObserver from '@titicaca/intersection-observer'

import { TNAProductData } from './types'

export function TnaProduct({
  index,
  product,
  product: { heroImage, title, tags, salePrice },
  onClick,
  onIntersect,
}: {
  index: number
  product: TNAProductData
  onClick: (
    e: React.SyntheticEvent,
    product: TNAProductData,
    index: number,
  ) => void
  onIntersect: (product: TNAProductData, index: number) => void
}) {
  const handleClick = useCallback(
    (e: React.SyntheticEvent) => onClick(e, product, index),
    [product, onClick, index],
  )

  const handleIntersectionChange = useCallback(
    ({ isIntersecting }: { isIntersecting: boolean }) => {
      if (isIntersecting) {
        onIntersect(product, index)
      }
    },
    [product, onIntersect, index],
  )

  return (
    <IntersectionObserver safe onChange={handleIntersectionChange}>
      <Container onClick={handleClick}>
        <SquareImage size="medium" floated="left" src={heroImage} alt={title} />
        <Text bold size="large" color="gray" margin={{ left: 150 }}>
          {title}
        </Text>

        {tags && tags.length > 0 && (
          <Container margin={{ top: 3, left: 150 }}>
            {tags.map(({ text, type, style }, i) => (
              <Tag
                key={i}
                type={type}
                style={style}
                margin={{ top: 4, right: i < tags.length - 1 ? 4 : 0 }}
              >
                {text}
              </Tag>
            ))}
          </Container>
        )}
        <Text bold size="large" color="gray" margin={{ top: 13, left: 150 }}>
          {`${formatNumber(salePrice)}원`}
        </Text>
      </Container>
    </IntersectionObserver>
  )
}
