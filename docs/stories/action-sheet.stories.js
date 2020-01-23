import React from 'react'
import styled from 'styled-components'
import { storiesOf } from '@storybook/react'
import { text, boolean, number, select, object } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import ActionSheet from '@titicaca/action-sheet'
import { RangePicker } from '@titicaca/date-picker'

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
  .add('옵션 props 테스트: 상단으로 부터의 액션시트 예제', () => (
    <ActionSheet
      open={boolean('열림', true)}
      title={text('제목', '샘플 액션 시트')}
      borderRadius={number('시트 모서리의 radius 값', 0)}
      from={select('시트가 나오는 위치', ['bottom', 'top'], 'top')}
      maxContentHeight={number('컨텐츠 영역의 최대 높이', 100)}
      padding={object(
        'padding',
        {
          top: 20,
          left: 25,
          bottom: 30,
          right: 25,
        },
        'padding 옵션',
      )}
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
  .add('커스텀 헤더', () => {
    const Title = styled.h1`
      padding: 10px 20px;
      font-size: 24px;
      font-weight: bold;
    `
    const Help = styled.small`
      padding: 0 20px;
      color: gray;
      font-size: 13px;
    `
    const CustomHeader = ({ title, help }) => (
      <>
        <Title>{title}</Title>
        <Help>{help}</Help>
      </>
    )

    return (
      <>
        <a onClick={action('clicked')}>Click me</a>
        <ActionSheet
          open={boolean('열림', true)}
          title={
            <CustomHeader
              title="여행일정"
              help="출발일-도착일을 선택해주세요."
            />
          }
          onClose={action('onClose')}
        >
          <ActionSheet.Item>메뉴 1</ActionSheet.Item>
          <ActionSheet.Item>메뉴 2</ActionSheet.Item>
        </ActionSheet>
      </>
    )
  })
  .add('스타일드 컴포넌트 확장 및 캘린더 컴포넌트', () => {
    const NewStyledActionSheet = styled(ActionSheet)`
      > div:last-child {
        /* padding: 0; */
      }
    `

    return (
      <>
        <a onClick={action('clicked')}>Click me</a>
        <NewStyledActionSheet
          open={boolean('열림', true)}
          title={text('제목', '샘플 액션 시트')}
          onClose={action('onClose')}
        >
          <RangePicker
            startDate={null}
            endDate={null}
            onDatesChange={() => {}}
          />
        </NewStyledActionSheet>
      </>
    )
  })
