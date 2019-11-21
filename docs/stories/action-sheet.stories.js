import React from 'react'
import { storiesOf } from '@storybook/react'
import { text, boolean, select } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import ActionSheet from '@titicaca/action-sheet'

storiesOf('ActionSheet', module)
  .add('인터랙션 테스트: 초기상태 닫힘', () => (
    <>
      <a onClick={action('clicked')}>Click me</a>
      <ActionSheet
        open={boolean('열림', false)}
        title={text('제목', '샘플 액션 시트')}
        onClose={action('onClose')}
      >
        <ActionSheet.Item>메뉴 1</ActionSheet.Item>
        <ActionSheet.Item>메뉴 2</ActionSheet.Item>
      </ActionSheet>
    </>
  ))
  .add('인터랙션 테스트: 초기상태 열림', () => (
    <>
      <a onClick={action('clicked')}>Click me</a>
      <ActionSheet
        open={boolean('열림', true)}
        title={text('제목', '샘플 액션 시트')}
        onClose={action('onClose')}
      >
        <ActionSheet.Item>메뉴 1</ActionSheet.Item>
        <ActionSheet.Item>메뉴 2</ActionSheet.Item>
      </ActionSheet>
    </>
  ))
  .add('텍스트 메뉴', () => (
    <ActionSheet
      open={boolean('열림', true)}
      title={text('제목', '샘플 액션 시트')}
    >
      <ActionSheet.Item checked={boolean('메뉴 1 선택', true)}>
        메뉴 1
      </ActionSheet.Item>
      <ActionSheet.Item checked={boolean('메뉴 2 선택', false)}>
        메뉴 2
      </ActionSheet.Item>
    </ActionSheet>
  ))
  .add('텍스트 + 아이콘 메뉴', () => (
    <ActionSheet
      open={boolean('열림', true)}
      title={text('제목', '샘플 액션 시트')}
    >
      <ActionSheet.Item
        icon={select(
          '아이콘 종류',
          [
            'save',
            'schedule',
            'share',
            'suggest',
            'review',
            'report',
            'delete',
          ],
          'save',
        )}
      >
        {text('메뉴 텍스트', '샘플 메뉴')}
      </ActionSheet.Item>
    </ActionSheet>
  ))
  .add('텍스트 + 버튼 메뉴', () => (
    <ActionSheet
      open={boolean('열림', true)}
      title={text('제목', '샘플 액션 시트')}
    >
      <ActionSheet.Item buttonLabel={text('버튼 레이블', '액션')}>
        {text('메뉴 텍스트', '샘플 메뉴')}
      </ActionSheet.Item>
    </ActionSheet>
  ))
  .add('{reverse=true} 상단 액션시트', () => (
    <ActionSheet
      open={boolean('열림', true)}
      title={text('제목', '샘플 액션 시트')}
      borderRadius={0}
      from="top"
      maxContentHeight={100}
      padding={{
        top: 20,
        left: 25,
        bottom: 30,
        right: 25,
      }}
    >
      <ActionSheet.Item
        icon={select(
          '아이콘 종류',
          [
            'save',
            'schedule',
            'share',
            'suggest',
            'review',
            'report',
            'delete',
          ],
          'save',
        )}
      >
        {text('메뉴 텍스트', '샘플 메뉴')}
      </ActionSheet.Item>
      <ActionSheet.Item buttonLabel={text('버튼 레이블', '액션')}>
        {text('메뉴 텍스트', '샘플 메뉴')}
      </ActionSheet.Item>
    </ActionSheet>
  ))
