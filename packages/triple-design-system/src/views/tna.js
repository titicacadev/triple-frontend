import React, { PureComponent } from 'react'
import List from '../elements/list'
import Text from '../elements/text'
import Tag from '../elements/tag'
import Button from '../elements/button'
import Container from '../elements/container'
import { H1 } from './text'
import { SquareImage } from '../elements/content-elements'

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

export function TnaProduct({ heroImage, title, tags, salePrice }) {
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

export class TnaProductsList extends PureComponent {
  state = { products: [], showMore: false }

  componentDidMount() {
    this.fetchProducts()
  }

  fetchProducts = async () => {
    const {
      props: { slotId, onTNAProductsFetch },
    } = this

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
          {!showMore &&
            products.length > 3 && (
              <Button
                basic
                fluid
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
