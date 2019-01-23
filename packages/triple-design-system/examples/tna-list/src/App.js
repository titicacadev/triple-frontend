import React, { PureComponent } from 'react'
import {
  Image,
  Rating,
  Container,
  Text,
  Navbar,
  ListingFilter,
} from '@titicaca/triple-design-system/src'
import sample from './sample.json'

export default class App extends PureComponent {
  render() {
    const {
      title,
      display: { image, pricing, subtitle },
    } = sample

    return (
      <Container>
        <Navbar title="도쿄 투어, 패스" borderless>
          <Navbar.Item floated="left" icon="back" />
          <Navbar.Item floated="right" icon="search" />
        </Navbar>

        <Navbar.Secondary>
          <ListingFilter>
            <ListingFilter.FilterEntry expanding active>
              전 지역
            </ListingFilter.FilterEntry>
            <ListingFilter.FilterEntry
              activeIconImage={'/images/ico-category-toursight@3x.png'}
              inactiveIconImage={'/images/ico-category-toursight@3x.png'}
            >
              투어·관광
            </ListingFilter.FilterEntry>
            <ListingFilter.FilterEntry
              activeIconImage={'/images/ico-category-toursight@3x.png'}
              inactiveIconImage={'/images/ico-category-toursight@3x.png'}
            >
              현지체험
            </ListingFilter.FilterEntry>
            <ListingFilter.FilterEntry
              activeIconImage={'/images/ico-category-toursight@3x.png'}
              inactiveIconImage={'/images/ico-category-toursight@3x.png'}
            >
              액티비티
            </ListingFilter.FilterEntry>
          </ListingFilter>
        </Navbar.Secondary>

        <Container padding={{ top: 20, bottom: 25, left: 20, right: 20 }}>
          <Image
            src={image.sizes.small.url}
            height={140}
            margin={{ bottom: 20 }}
          />
          <Text size="big" margin={{ bottom: 6 }}>
            {title}
          </Text>
          <Text size="small" margin={{ bottom: 5 }}>
            {subtitle}
          </Text>
          <Container margin={{ bottom: 13 }}>
            <Rating size="tiny" score={3} vertical="text-top" />
            <Text inline alpha={0.5} size="small">
              · 티켓
            </Text>
          </Container>
          <Text size="big" margin={{ right: 4 }} inline>
            {pricing.basePrice}원
          </Text>
          <Text size="tiny" alpha={0.3} inline strikethrough>
            {pricing.salePrice}원
          </Text>
        </Container>
      </Container>
    )
  }
}
