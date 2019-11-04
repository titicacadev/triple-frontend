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

function insertCommas(price) {
  if (price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  return ''
}

function Price({ children }) {
  return (
    <Text bold size="large" color="gray" margin={{ top: 13, left: 150 }}>
      {`${insertCommas(children)}원`}
    </Text>
  )
}

export function TnaProduct({
  heroImage,
  title,
  tags,
  salePrice,
}: {
  heroImage?: string
  title?: string
  tags?: [{ text: string; type: TagColors; style: React.CSSProperties }]
  salePrice?: string | number
}) {
  return (
    <>
      <SquareImage size="medium" floated="left" src={heroImage} />
      <Text bold size="large" color="gray" margin={{ left: 150 }}>
        {title}
      </Text>
      {(tags || []).length > 0 && (
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
      <Price>{salePrice}</Price>
    </>
  )
}

export class TnaProductsList extends React.PureComponent<{
  slotId?: number
  onTNAProductsFetch?: (slotId?: number) => any
  onProductClick?: (e?: React.SyntheticEvent, product?: any) => any
  margin?: MarginPadding
  title?: string
}> {
  state = { products: [], showMore: false, title: '' }

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
      const { title, products } = await response.json()

      this.setState({ title, products })
    }
  }

  render() {
    const {
      props: { onProductClick, margin },
      state: { title, products, showMore },
    } = this

    return (products || []).length > 0 ? (
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
