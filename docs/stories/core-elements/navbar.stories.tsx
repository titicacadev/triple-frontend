import React from 'react'
import { action } from '@storybook/addon-actions'
import {
  Navbar,
  Text,
  SearchNavbar,
  NavbarWrapper,
} from '@titicaca/core-elements'
import ListingFilter from '@titicaca/listing-filter'
import { text, boolean, select } from '@storybook/addon-knobs'
import styled from 'styled-components'

const TOC = styled.div`
  position: absolute;
  left: 52px;
`

const ICON_LIST = [
  'more',
  'map',
  'write',
  'scraped',
  'unscraped',
  'share',
  'route',
  'search',
  'list',
  'hamburger',
] as const

export default {
  title: 'Core-Elements / Navbar',
}

export function twoButtons() {
  return (
    <Navbar
      title={text('제목', '도쿄 관광지')}
      borderless={boolean('Border 생략', true)}
      backgroundColor={select('배경 색', ['gray', 'blue'], 'white')}
    >
      <Navbar.Item
        className="boxer gg"
        icon={select('좌측 아이콘', ['back', 'close'], 'back')}
      />
      <Navbar.Item
        floated="right"
        className="boxer gg"
        icon={select('우측 아이콘', ICON_LIST, 'more')}
      />
    </Navbar>
  )
}
twoButtons.storyName = '버튼 2개 (좌1+우1)'

export function threeButtons() {
  return (
    <Navbar
      title={text('제목', '도쿄 관광지')}
      borderless={boolean('Border 생략', true)}
    >
      <Navbar.Item icon={select('좌측 아이콘', ['back', 'close'], 'back')} />
      <Navbar.Item
        floated="right"
        icon={select('우측 아이콘 1', ICON_LIST, 'more')}
      />
      <Navbar.Item
        floated="right"
        icon={select('우측 아이콘 2', ICON_LIST, 'route')}
      />
    </Navbar>
  )
}
threeButtons.storyName = '버튼 3개 (좌1+우2)'

export function fourButtons() {
  return (
    <Navbar
      title={text('제목', '도쿄 관광지')}
      borderless={boolean('Border 생략', true)}
    >
      <Navbar.Item icon={select('좌측 아이콘', ['back', 'close'], 'back')} />
      <Navbar.Item
        floated="right"
        icon={select('우측 아이콘 1', ICON_LIST, 'more')}
      />
      <Navbar.Item
        floated="right"
        icon={select('우측 아이콘 2', ICON_LIST, 'route')}
      />
      <Navbar.Item
        floated="right"
        icon={select('우측 아이콘 3', ICON_LIST, 'list')}
      />
    </Navbar>
  )
}
fourButtons.storyName = '버튼 4개 (좌1+우3)'

export function secondaryNavbar() {
  return (
    <>
      <Navbar title={text('제목', '도쿄 관광지')} borderless>
        <Navbar.Item icon={'back'} />
        <Navbar.Item floated="right" icon="more" />
      </Navbar>
      <Navbar.Secondary>
        <ListingFilter>
          <ListingFilter.FilterEntry active>전 지역</ListingFilter.FilterEntry>
        </ListingFilter>
      </Navbar.Secondary>
    </>
  )
}
secondaryNavbar.storyName = '보조 Navbar (리스트 필터링)'

export function wrappedNavbar() {
  return (
    <NavbarWrapper>
      <Navbar title={text('제목', '도쿄 관광지')} borderless>
        <Navbar.Item icon={'back'} />
        <Navbar.Item floated="right" icon="more" />
      </Navbar>
      <Navbar.Secondary>
        <ListingFilter>
          <ListingFilter.FilterEntry active>전 지역</ListingFilter.FilterEntry>
        </ListingFilter>
      </Navbar.Secondary>
    </NavbarWrapper>
  )
}
wrappedNavbar.storyName = 'wrapper로 감싼 Navbar'

export function toc() {
  return (
    <Navbar
      renderTitle={() => (
        <TOC>
          <Text size="small" bold alpha={1}>
            도쿄에서 반드시 먹어봐야 할 음식
          </Text>

          <Text size="mini" alpha={0.5} margin={{ top: 1 }}>
            라멘
          </Text>
        </TOC>
      )}
    >
      <Navbar.Item icon={'back'} />
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
        <Navbar.Item floated="right" icon={'more'} />
      </Navbar>
      <Navbar borderless backgroundColor="teal" title="컬러가 적용된 Navbar">
        <Navbar.Item icon="back" />
        <Navbar.Item floated="right" icon={'more'} />
      </Navbar>
    </>
  )
}
backgroundExample.storyName = 'backgroundColor'

export function searchExample() {
  return (
    <SearchNavbar
      placeholder="“호텔예약” 도시이름으로 검색"
      borderless={boolean('borderless', false)}
      onBackClick={action('onBackClick')}
      onDeleteClick={action('onDeleteClick')}
      onInputChange={action('onInputChange')}
      onKeyUp={action('onKeyUp')}
      onBlur={action('onBlur')}
      onFocus={action('onFocus')}
      onSearch={action('onSearch')}
    />
  )
}

searchExample.storyName = '검색'
