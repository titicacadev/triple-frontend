import React, { useState } from 'react'
import styled from 'styled-components'
import { text, boolean, number, select, object } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import ActionSheet from '@titicaca/action-sheet'
import { RangePicker } from '@titicaca/date-picker'

export default {
  title: 'action-sheet / action-sheet',
}

export function BaseActionSheet() {
  return (
    <ActionSheet
      open={boolean('열림', false)}
      title={text('제목', '샘플 액션 시트')}
      borderRadius={number('시트 모서리의 radius 값', 12)}
      from={select('시트가 나오는 위치', ['bottom', 'top'], 'bottom')}
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
      onClose={action('onClose')}
    >
      <ActionSheet.Item>메뉴 1</ActionSheet.Item>
      <ActionSheet.Item>메뉴 2</ActionSheet.Item>
      <ActionSheet.Item>메뉴 3</ActionSheet.Item>
      <ActionSheet.Item>메뉴 4</ActionSheet.Item>
      <ActionSheet.Item>메뉴 5</ActionSheet.Item>
      <ActionSheet.Item>메뉴 6</ActionSheet.Item>
      <ActionSheet.Item>메뉴 7</ActionSheet.Item>
      <ActionSheet.Item>메뉴 8</ActionSheet.Item>
    </ActionSheet>
  )
}

BaseActionSheet.storyName = '기본 액션시트'

export function ActionSheetWithTextMenu() {
  return (
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
  )
}

ActionSheetWithTextMenu.storyName = '텍스트 메뉴'

export function ActionSheetWithIconMenu() {
  return (
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
      <ActionSheet.Item buttonLabel={text('버튼 레이블', '액션')}>
        {text('메뉴 텍스트', '샘플 메뉴')}
      </ActionSheet.Item>
    </ActionSheet>
  )
}

ActionSheetWithIconMenu.storyName = '아이콘 메뉴'

export function ActionSheetWithForm() {
  return (
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
  )
}

ActionSheetWithForm.storyName = '액션시트 방향 조절'

export function ActionSheetWithCustomHeader() {
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
  const CustomHeader = ({ title, help }: { title: string; help: string }) => (
    <>
      <Title>{title}</Title>
      <Help>{help}</Help>
    </>
  )

  return (
    <ActionSheet
      open={boolean('열림', true)}
      title={
        <CustomHeader title="여행일정" help="출발일-도착일을 선택해주세요." />
      }
      onClose={action('onClose')}
    >
      <ActionSheet.Item>메뉴 1</ActionSheet.Item>
      <ActionSheet.Item>메뉴 2</ActionSheet.Item>
    </ActionSheet>
  )
}

ActionSheetWithCustomHeader.storyName = '커스텀 헤더'

export function ActionSheetWithExtendStyle() {
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
        <RangePicker startDate={null} endDate={null} onDatesChange={() => {}} />
      </NewStyledActionSheet>
    </>
  )
}

ActionSheetWithExtendStyle.storyName = '스타일 확장'

export function ActionSheetWithEvents() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <p>
        open 과 동시에 onEnter - onEntering - onEntered 가 순서대로 발생하고
        close 와 동시에 onExit - onExiting - onExited 가 발생합니다.
      </p>
      <button onClick={() => setOpen(true)}>open</button>

      <ActionSheet
        open={open}
        title={text('제목', '샘플 액션 시트')}
        onClose={action('onClose')}
        onEnter={action('onEnter')}
        onEntered={action('onEntered')}
        onEntering={action('onEntering')}
        onExit={action('onExit')}
        onExited={action('onExited')}
        onExiting={action('onExiting')}
      >
        <ActionSheet.Item>메뉴 1</ActionSheet.Item>
        <ActionSheet.Item>메뉴 2</ActionSheet.Item>

        <button onClick={() => setOpen(false)}>close</button>
      </ActionSheet>
    </>
  )
}

ActionSheetWithEvents.storyName = '이벤트'
