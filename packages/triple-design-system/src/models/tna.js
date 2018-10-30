import React, { PureComponent } from 'react'
import numeral from 'numeral'
import List from '../elements/list'
import Text from '../elements/text'
import Tag from '../elements/tag'
import Container from '../elements/container'
import { H1 } from './text'
import { SquareImage } from '../elements/content-elements'

function Product({ heroImage, title, tags, salePrice }) {
  return (
    <>
      <SquareImage size="medium" floated="left" src={heroImage} />
      <Text bold size="large" color="gray" margin={{ left: 150 }}>
        {title}
      </Text>
      {(tags || []).length > 0 && (
        <Container margin={{ top: 7, left: 150 }}>
          {tags.map(({ text, ...styles }, i) => (
            <Tag key={i} {...styles} margin={{ left: i === 0 ? 0 : 4 }}>
              {`#${text}`}
            </Tag>
          ))}
        </Container>
      )}
      <Text bold size="large" color="gray" margin={{ top: 13, left: 150 }}>
        {numeral(salePrice).format('0,0')}원
      </Text>
    </>
  )
}

export class TnaProductsList extends PureComponent {
  state = { products: [] }

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
      state: { title, products },
    } = this

    return (
      <Container margin={margin}>
        <H1 margin={{ bottom: 20 }}>{title}</H1>

        <List clearing verticalGap={20}>
          {(products || []).map((product, i) => (
            <List.Item
              key={i}
              onClick={onProductClick && ((e) => onProductClick(e, product))}
            >
              <Product {...product} />
            </List.Item>
          ))}
        </List>
      </Container>
    )
  }
}
