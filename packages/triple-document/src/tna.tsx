import * as React from 'react'
import {
  List,
  Text,
  Tag,
  TagColors,
  Button,
  Container,
  SquareImage,
  MarginPadding,
} from '@titicaca/core-elements'
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
  slotId?: number
  onTNAProductsFetch?: (slotId?: number) => Promise<Response>
  onProductClick?: (e?: React.SyntheticEvent, product?: TnaProductData) => void
  margin?: MarginPadding
  title?: string
}

interface TnaProductsListState {
  products: TnaProductData[]
  showMore: boolean
  title: string
}

function insertCommas(price?: Price) {
  if (price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  return ''
}

function Price({ price }: { price?: Price }) {
  return (
    <Text bold size="large" color="gray" margin={{ top: 13, left: 150 }}>
      {`${insertCommas(price)}원`}
    </Text>
  )
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
      <Price price={salePrice} />
    </>
  )
}

export class TnaProductsList extends React.PureComponent<
  TnaProductsListProps,
  TnaProductsListState
> {
  readonly state: Readonly<TnaProductsListState> = {
    products: [],
    showMore: false,
    title: '',
  }

  componentDidMount() {
    this.fetchProducts()
  }

  fetchProducts = async () => {
    const {
      props: { slotId, onTNAProductsFetch },
    } = this

    if (!onTNAProductsFetch || !slotId) return

    const response = await onTNAProductsFetch(slotId)

    if (response.ok) {
      const {
        title,
        products,
      }: { title: string; products?: TnaProductData[] } = await response.json()

      this.setState({ title, products: products || [] })
    }
  }

  render() {
    const {
      props: { onProductClick, margin },
      state: { title, products, showMore },
    } = this

    return products.length > 0 ? (
      <Container margin={margin}>
        <H1 margin={{ bottom: 20 }}>{title}</H1>

        <List clearing verticalGap={20}>
          {(showMore ? products : products.slice(0, 3)).map((product, i) => (
            <List.Item
              key={i}
              onClick={onProductClick && ((e) => onProductClick(e, product))}
            >
              <TnaProduct {...product} />
            </List.Item>
          ))}
          {!showMore && products.length > 3 && (
            <Button
              basic
              fluid
              compact
              margin={{ top: 10 }}
              onClick={() => this.setState({ showMore: true })}
            >
              더보기
            </Button>
          )}
        </List>
      </Container>
    ) : null
  }
}
