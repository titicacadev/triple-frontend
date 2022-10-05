import styled from 'styled-components'

import Navbar, { NavbarWrapper } from './elements/navbar'
import SearchNavbar from './elements/search-navbar'
import Text from './elements/text'

const Toc = styled.div`
  position: absolute;
  left: 52px;
`

// const ICON_LIST = [
//   'more',
//   'map',
//   'write',
//   'scraped',
//   'unscraped',
//   'share',
//   'route',
//   'search',
//   'list',
//   'hamburger',
// ] as const

export default {
  title: 'Core-Elements / Navbar',
}

export function twoButtons() {
  return (
    <Navbar title="도쿄 관광지" borderless backgroundColor="white">
      <Navbar.Item className="boxer gg" icon="back" />
      <Navbar.Item floated="right" className="boxer gg" icon="more" />
    </Navbar>
  )
}
twoButtons.storyName = '버튼 2개 (좌1+우1)'

export function threeButtons() {
  return (
    <Navbar title="도쿄 관광지" borderless>
      <Navbar.Item icon="back" />
      <Navbar.Item floated="right" icon="more" />
      <Navbar.Item floated="right" icon="route" />
    </Navbar>
  )
}
threeButtons.storyName = '버튼 3개 (좌1+우2)'

export function fourButtons() {
  return (
    <Navbar title="도쿄 관광지" borderless>
      <Navbar.Item icon="back" />
      <Navbar.Item floated="right" icon="more" />
      <Navbar.Item floated="right" icon="route" />
      <Navbar.Item floated="right" icon="list" />
    </Navbar>
  )
}
fourButtons.storyName = '버튼 4개 (좌1+우3)'

export function secondaryNavbar() {
  return (
    <>
      <Navbar title="도쿄 관광지" borderless>
        <Navbar.Item icon="back" />
        <Navbar.Item floated="right" icon="more" />
      </Navbar>
      <Navbar.Secondary>
        {/* <ListingFilter>
          <ListingFilter.FilterEntry active>전 지역</ListingFilter.FilterEntry>
        </ListingFilter> */}
      </Navbar.Secondary>
    </>
  )
}
secondaryNavbar.storyName = '보조 Navbar (리스트 필터링)'

export function wrappedNavbar() {
  return (
    <NavbarWrapper>
      <Navbar title="도쿄 관광지" borderless>
        <Navbar.Item icon="back" />
        <Navbar.Item floated="right" icon="more" />
      </Navbar>
      <Navbar.Secondary>
        {/* <ListingFilter>
          <ListingFilter.FilterEntry active>전 지역</ListingFilter.FilterEntry>
        </ListingFilter> */}
      </Navbar.Secondary>
    </NavbarWrapper>
  )
}
wrappedNavbar.storyName = 'wrapper로 감싼 Navbar'

export function toc() {
  return (
    <Navbar
      renderTitle={() => (
        <Toc>
          <Text size="small" bold alpha={1}>
            도쿄에서 반드시 먹어봐야 할 음식
          </Text>

          <Text size="mini" alpha={0.5} margin={{ top: 1 }}>
            라멘
          </Text>
        </Toc>
      )}
    >
      <Navbar.Item icon="back" />
      <Navbar.Item floated="right" icon="more" />
    </Navbar>
  )
}
toc.storyName = '목차'

export function backgroundExample() {
  return (
    <>
      <Navbar borderless backgroundColor="azul" title="컬러가 적용된 Navbar">
        <Navbar.Item icon="back" />
        <Navbar.Item floated="right" icon="more" />
      </Navbar>
      <Navbar borderless backgroundColor="teal" title="컬러가 적용된 Navbar">
        <Navbar.Item icon="back" />
        <Navbar.Item floated="right" icon="more" />
      </Navbar>
    </>
  )
}
backgroundExample.storyName = 'backgroundColor'

export function searchExample() {
  return (
    <SearchNavbar
      placeholder="“호텔예약” 도시이름으로 검색"
      borderless={false}
      onBackClick={() => {}}
      onDeleteClick={() => {}}
      onInputChange={() => {}}
      onKeyUp={() => {}}
      onBlur={() => {}}
      onFocus={() => {}}
      onSearch={() => {}}
    />
  )
}

searchExample.storyName = '검색'
