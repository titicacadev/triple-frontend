import React, { useState, useEffect, useCallback } from 'react'
import {
  List,
  Text,
  Tag,
  TagColors,
  Button,
  Container,
  SquareImage,
  HR2,
} from '@titicaca/core-elements'
import { formatNumber } from '@titicaca/view-utilities'
import { useEventTrackingContext } from '@titicaca/react-contexts'
import IntersectionObserver from '@titicaca/intersection-observer'

import { H1 } from './text'

type Price = string | number

interface TnaProductProps {
  id: number
  heroImage?: string
  title?: string
  tags?: { text: string; type: TagColors; style: React.CSSProperties }[]
  salePrice?: Price
}

export type TnaProductData = TnaProductProps

interface TnaProductsListProps {
  value: {
    slotId?: number
  }
  onTNAProductsFetch?: (slotId?: number) => Promise<Response>
  onTNAProductClick?: (
    e: React.SyntheticEvent,
    product: TnaProductData,
    slotId?: number,
    index?: number,
  ) => void
}

interface TnaProductsListState {
  products: TnaProductData[]
  showMore: boolean
  title: string
}

export function TnaProduct({
  index,
  product,
  product: { heroImage, title, tags, salePrice },
  onClick,
  onIntersect,
}: {
  index: number
  product: TnaProductData
  onClick: (
    e: React.SyntheticEvent,
    product: TnaProductData,
    index: number,
  ) => void
  onIntersect: (product: TnaProductData, index: number) => void
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

export function TnaProductsList({
  onTNAProductsFetch,
  onTNAProductClick,
  value: { slotId },
}: TnaProductsListProps) {
  const [{ products, showMore, title }, setProductsList] = useState<
    TnaProductsListState
  >({
    products: [],
    showMore: false,
    title: '',
  })

  const { trackEvent, trackSimpleEvent } = useEventTrackingContext()

  useEffect(() => {
    async function fetchAndSetProductsList() {
      if (!onTNAProductsFetch || !slotId) {
        return
      }

      const response = await onTNAProductsFetch(slotId)

      if (response.ok) {
        const {
          title,
          products,
        }: {
          title: string
          products?: TnaProductData[]
        } = await response.json()

        setProductsList({ title, products: products || [], showMore: false })
      }
    }

    fetchAndSetProductsList()
  }, [onTNAProductsFetch, slotId, setProductsList])

  const handleClick = useCallback(
    (e: React.SyntheticEvent, product: TnaProductData, index: number) => {
      if (onTNAProductClick) {
        onTNAProductClick(e, product, slotId, index)
      }
    },
    [onTNAProductClick, slotId],
  )

  const handleIntersect = useCallback(
    (product: TnaProductData, index: number) => {
      trackEvent({
        fa: {
          action: '투어티켓_노출',
          /* eslint-disable-next-line @typescript-eslint/camelcase */
          slot_id: slotId,
          /* eslint-disable-next-line @typescript-eslint/camelcase */
          tna_id: product.id,
          position: index,
        },
      })
    },
    [trackEvent, slotId],
  )

  const handleShowMoreClick = useCallback(() => {
    trackSimpleEvent({
      action: '투어티켓_더보기',
      /* eslint-disable-next-line @typescript-eslint/camelcase */
      slot_id: slotId,
    })

    setProductsList((prevValues) => ({
      ...prevValues,
      showMore: true,
    }))
  }, [trackSimpleEvent, setProductsList, slotId])

  return products.length > 0 ? (
    <>
      <HR2 />
      <Container
        margin={{ top: 30, left: 30, right: 30 }}
        id={`tna-slot-${slotId}`}
      >
        <H1 margin={{ bottom: 20 }}>{title}</H1>

        <List clearing verticalGap={20}>
          {(showMore ? products : products.slice(0, 3)).map((product, i) => (
            <List.Item key={i}>
              <TnaProduct
                index={i}
                product={product}
                onClick={handleClick}
                onIntersect={handleIntersect}
              />
            </List.Item>
          ))}
          {!showMore && products.length > 3 ? (
            <Button
              basic
              fluid
              compact
              size="small"
              margin={{ top: 10 }}
              onClick={handleShowMoreClick}
            >
              더보기
            </Button>
          ) : null}
        </List>
      </Container>
    </>
  ) : null
}
