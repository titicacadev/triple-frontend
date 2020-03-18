import React, { useState } from 'react'
import styled from 'styled-components'
import { boolean } from '@storybook/addon-knobs'
import ActionSheet from '@titicaca/action-sheet'
import { Confirm } from '@titicaca/modals'

const EmptyScroll = styled.div`
  height: 200vh;
`

export default {
  title: 'React-Hooks | body-scoll-lock',
}

export const 기본_스크롤락 = () => (
  <div>
    <EmptyScroll>가나다라마바사아자차카</EmptyScroll>
    <ActionSheet open={boolean('열림', false)} title="가나다라마바사아자차카">
      <ActionSheet.Item>메뉴 1</ActionSheet.Item>
      <ActionSheet.Item>메뉴 2</ActionSheet.Item>
    </ActionSheet>
  </div>
)

export const 중첩_스크롤락 = () => {
  const [openModal, setOpenModal] = useState(false)
  const [openActionSheet, setOpenActionSheet] = useState(false)

  return (
    <div>
      <EmptyScroll>가나다라마바사아자차카</EmptyScroll>
      <ActionSheet open={boolean('열림', false)} title="가나다라마바사아자차카">
        <ActionSheet.Item onClick={() => setOpenModal(true)}>
          모달 열기
        </ActionSheet.Item>
        <ActionSheet.Item onClick={() => setOpenActionSheet(true)}>
          액션시트 열기
        </ActionSheet.Item>
        <ActionSheet.Item>나</ActionSheet.Item>
        <ActionSheet.Item>다</ActionSheet.Item>
        <ActionSheet.Item>라</ActionSheet.Item>
        <ActionSheet.Item>마</ActionSheet.Item>
        <ActionSheet.Item>바</ActionSheet.Item>
        <ActionSheet.Item>사</ActionSheet.Item>
      </ActionSheet>
      <ActionSheet
        open={openActionSheet}
        borderRadius={0}
        from="top"
        maxContentHeight={300}
        padding={{
          top: 0,
          left: 20,
          bottom: 9.5,
          right: 20,
        }}
        onClose={() => setOpenActionSheet(false)}
      >
        <ActionSheet.Item>가</ActionSheet.Item>
        <ActionSheet.Item>나</ActionSheet.Item>
        <ActionSheet.Item>다</ActionSheet.Item>
      </ActionSheet>
      <Confirm open={openModal} onClose={() => setOpenModal(false)}>
        삭제하겠습니까? 삭제하면 적립된 리뷰 포인트도 함께 사라집니다.
      </Confirm>
    </div>
  )
}
