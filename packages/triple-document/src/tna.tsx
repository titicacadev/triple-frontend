import React, { useState, useEffect } from 'react'
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

import { H1 } from './text'

type Price = string | number

interface TnaProductProps {
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
    e?: React.SyntheticEvent,
    product?: TnaProductData,
  ) => void
}

interface TnaProductsListState {
  products: TnaProductData[]
  showMore: boolean
  title: string
}

export function TnaProduct({
  heroImage,
  title,
  tags,
  salePrice,
}: TnaProductProps) {
  return (
    <>
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
    </>
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
            <List.Item
              key={i}
              onClick={
                onTNAProductClick && ((e) => onTNAProductClick(e, product))
              }
            >
              <TnaProduct {...product} />
            </List.Item>
          ))}
          {!showMore && products.length > 3 && (
            <Button
              basic
              fluid
              compact
              size="small"
              margin={{ top: 10 }}
              onClick={() =>
                setProductsList((prevValues) => ({
                  ...prevValues,
                  showMore: true,
                }))
              }
            >
              더보기
            </Button>
          )}
        </List>
      </Container>
    </>
  ) : null
}
