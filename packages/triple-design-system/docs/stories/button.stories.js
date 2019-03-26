import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { text, number, select } from '@storybook/addon-knobs'

import { Button } from '@titicaca/triple-design-system'

storiesOf('Button', module)
  .add('일반', () => (
    <Button
      size={select('버튼 크기', ['tiny', 'small'], 'tiny')}
      fontSize={select('폰트 크기', ['tiny', 'small', 'large'], 'tiny')}
      onClick={action('clicked')}
    >
      {text('버튼 레이블', '안녕')}
    </Button>
  ))
  .add('컴팩트', () => (
    <Button
      compact
      size={select('버튼 크기', ['tiny'], 'tiny')}
      fontSize={select('폰트 크기', ['tiny', 'small', 'large'], 'tiny')}
      onClick={action('clicked')}
    >
      {text('버튼 레이블', '안녕')}
    </Button>
  ))
  .add('일반 (채움형)', () => (
    <Button
      fluid
      size={select('버튼 크기', ['tiny', 'small'], 'tiny')}
      fontSize={select('폰트 크기', ['tiny', 'small', 'large'], 'tiny')}
      onClick={action('clicked')}
    >
      {text('버튼 레이블', '안녕')}
    </Button>
  ))
  .add('베이직', () => (
    <Button
      basic
      size={select('버튼 크기', ['tiny', 'small', 'large'], 'tiny')}
      fontSize={select('폰트 크기', ['tiny', 'small', 'large'], 'tiny')}
      onClick={action('clicked')}
      color={select('버튼 색', ['gray', 'blue'])}
    >
      {text('버튼 레이블', '안녕')}
    </Button>
  ))
  .add('베이직 (채움형)', () => (
    <Button
      basic
      fluid
      size={select('버튼 크기', ['tiny', 'small', 'large'], 'tiny')}
      fontSize={select('폰트 크기', ['tiny', 'small', 'large'], 'tiny')}
      onClick={action('clicked')}
      color={select('버튼 색', ['gray', 'blue'])}
    >
      {text('버튼 레이블', '안녕')}
    </Button>
  ))
  .add('베이직 (채움형 + 아이콘)', () => (
    <Button
      basic
      bold
      fluid
      size={select('버튼 크기', ['tiny', 'small', 'large'], 'tiny')}
      fontSize={select('폰트 크기', ['tiny', 'small', 'large'], 'small')}
      onClick={action('clicked')}
      color={select('버튼 색', ['gray', 'blue'])}
    >
      <Button.Icon src="https://triple-dev.titicaca-corp.com/content/static/images/index@4x.png" />
      {text('버튼 레이블', '목차')}
    </Button>
  ))
  .add('블록형 아이콘', () => (
    <Button
      icon={select(
        '아이콘 종류',
        [
          'saveEmpty',
          'saveFilled',
          'starEmpty',
          'starFilled',
          'map',
          'share',
          'schedule',
        ],
        'saveEmpty',
      )}
    >
      {text('버튼 레이블', '저장하기')}
    </Button>
  ))
  .add('버튼 그룹', () => (
    <Button.Group horizontalGap={number('버튼 간격', 10)}>
      <Button basic size="large" fontSize="small">
        현지에서 길묻기
      </Button>
      <Button borderRadius={4} size="small" fontSize="small">
        길찾기
      </Button>
    </Button.Group>
  ))
  .add('아이콘 버튼 그룹', () => (
    <Button.Group horizontalGap={number('버튼 간격', 22)}>
      <Button icon="saveEmpty">저장하기</Button>
      <Button icon="schedule">일정추가</Button>
      <Button icon="starEmpty">리뷰쓰기</Button>
      <Button icon="share">공유하기</Button>
    </Button.Group>
  ))
