import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs'

import ActionSheet from '@titicaca/triple-design-system/elements/action-sheet'

storiesOf('ActionSheet', module)
  .addDecorator(withKnobs)
  .add('텍스트 메뉴', () => (
    <ActionSheet
      open={boolean('열림', true)}
      title={text('제목', '샘플 액션 시트')}
    >
      <ActionSheet.Item>메뉴 1</ActionSheet.Item>
      <ActionSheet.Item>메뉴 2</ActionSheet.Item>
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
