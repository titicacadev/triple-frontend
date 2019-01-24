import React, { PureComponent } from 'react'
import {
  Container,
  Navbar,
  ListingFilter,
  List,
  ProductListElement,
} from '@titicaca/triple-design-system/src'
import sample from './sample.json'

export default class App extends PureComponent {
  render() {
    return (
      <>
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

        <Container padding={{ left: 20, right: 20 }}>
          <List divided margin={{ top: 10 }}>
            <ProductListElement
              product={sample}
              scrapsCount={120}
              reviewsCount={10}
              reviewsRating={4.3}
            />
          </List>
        </Container>
      </>
    )
  }
}
