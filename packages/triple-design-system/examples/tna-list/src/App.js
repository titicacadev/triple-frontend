import React, { PureComponent } from 'react'
import {
  Image,
  Rating,
  Container,
  Text,
  Navbar,
  Icon,
  Button,
} from '@titicaca/triple-design-system/src'
import sample from './sample.json'
import styled from 'styled-components'

/* 가로스크롤을 만들 Container 가 필요 */
const ButtonScrollGroup = styled(Container)`
  overflow-x: scroll;
  white-space: nowrap;
`
/* TODO */
/* Nav 필터부분 overflow hidden 이 필요 */
/* 가로스크롤을 만들수 있는 Container 가 필요 */
/* Text vertical 조절 */
/* Navi 영역 icon -> navi item 으로 변경  */

export default class App extends PureComponent {
  render() {
    const {
      title,
      display: { image, pricing, subtitle },
    } = sample

    return (
      <Container>
        <Navbar height="100%">
          <Container>
            <Navbar.Item floated="left">
              <Icon src="/images/btn-com-back@3x.png" size="big" />
            </Navbar.Item>
            <Navbar.Item floated="right">
              <Icon src="/images/ico-search-place@3x.png" size="big" />
            </Navbar.Item>
            <Navbar.Item floated="right">
              <Icon src="/images/btn-com-search@3x.png" size="big" />
            </Navbar.Item>
            <Text padding={{ top: 10, left: 30 }}> 도쿄 투어, 패스</Text>
          </Container>
          <ButtonScrollGroup padding={{ top: 14, bottom: 5, left: 7 }}>
            <Button basic margin={{ right: 6 }}>
              <Icon src="/images/ico-category-toursight@3x.png" />
              <Text inline size="tiny">
                어트랙션
              </Text>
            </Button>
            <Button basic margin={{ right: 6 }}>
              <Icon src="/images/ico-category-toursight@3x.png" />
              <Text inline size="tiny">
                어트랙션
              </Text>
            </Button>
            <Button basic margin={{ right: 6 }}>
              <Icon src="/images/ico-category-toursight@3x.png" />
              <Text inline size="tiny">
                어트랙션
              </Text>
            </Button>
            <Button basic margin={{ right: 6 }}>
              <Icon src="/images/ico-category-toursight@3x.png" />
              <Text inline size="tiny">
                어트랙션
              </Text>
            </Button>
          </ButtonScrollGroup>
        </Navbar>
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
