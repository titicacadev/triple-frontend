import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Navbar, Text, SearchNavbar } from '@titicaca/core-elements'
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
]

storiesOf('Core-Elements | Navbar', module)
  .add('버튼 2개 (좌1+우1)', () => (
    <Navbar
      title={text('제목', '도쿄 관광지')}
      borderless={boolean('Border 생략', true)}
      backgroundColor={select(
        '배경 색',
        ['249, 250, 252(rgb코드)', 'gray', 'blue'],
        'white',
      )}
    >
      <Navbar.Item icon={select('좌측 아이콘', ['back', 'close'], 'back')} />
      <Navbar.Item
        floated="right"
        icon={select('우측 아이콘', ICON_LIST, 'more')}
      />
    </Navbar>
  ))
  .add('버튼 3개 (좌1+우2)', () => (
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
  ))
  .add('버튼 4개 (좌1+우3)', () => (
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
  ))
  .add('보조 Navbar (리스트 필터링)', () => (
    <>
      <Navbar title={text('제목', '도쿄 관광지')} borderless>
        <Navbar.Item icon={'back'} />
        <Navbar.Item floated="right" icon={'more'} />
      </Navbar>
      <Navbar.Secondary>
        <ListingFilter>
          <ListingFilter.FilterEntry active expanding>
            전 지역
          </ListingFilter.FilterEntry>
        </ListingFilter>
      </Navbar.Secondary>
    </>
  ))
  .add('목차', () => (
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
      <Navbar.Item floated="right" icon={'more'} />
    </Navbar>
  ))
  .add('검색', () => (
    <SearchNavbar
      inputPlaceholder={'“호텔예약” 도시이름으로 검색'}
      onBackClick={action('onBackClick')}
      onDeleteClick={action('onDeleteClick')}
      onInputChange={action('onInputChange')}
      onKeyUp={action('onKeyUp')}
      onBlur={action('onBlur')}
      onFocus={action('onFocus')}
    />
  ))
