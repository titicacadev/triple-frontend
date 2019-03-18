import React from 'react'

import { storiesOf } from '@storybook/react'

import { Navbar, ListingFilter } from '@titicaca/triple-design-system'
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs'

storiesOf('Navbar', module)
  .addDecorator(withKnobs)
  .add('버튼 2개 (좌1+우1)', () => (
    <Navbar
      title={text('제목', '도쿄 관광지')}
      borderless={boolean('Border 생략', true)}
    >
      <Navbar.Item icon={select('좌측 아이콘', ['back', 'close'], 'back')} />
      <Navbar.Item
        floated="right"
        icon={select(
          '우측 아이콘',
          [
            'more',
            'map',
            'write',
            'scraped',
            'unscraped',
            'share',
            'route',
            'search',
          ],
          'more',
        )}
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
        icon={select(
          '우측 아이콘 1',
          [
            'more',
            'map',
            'write',
            'scraped',
            'unscraped',
            'share',
            'route',
            'search',
          ],
          'more',
        )}
      />
      <Navbar.Item
        floated="right"
        icon={select(
          '우측 아이콘 2',
          [
            'more',
            'map',
            'write',
            'scraped',
            'unscraped',
            'share',
            'route',
            'search',
          ],
          'route',
        )}
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
