import React from 'react'
import { storiesOf } from '@storybook/react'

import { ELEMENTS } from '@titicaca/triple-document'

const { list: ListElement } = ELEMENTS

storiesOf('TripleDocument | TripleDocument.리스트', module)
  .add('점', () => (
    <ListElement
      value={{
        bulletType: 'oval',
        items: [
          {
            type: 'text',
            value: {
              text: '일본 여행! 포켓와이파이 없이 어떻게 가려고요?',
            },
          },
          {
            type: 'text',
            value: {
              text:
                '와그만의 핑크미가 뿜뿜나는 LTE 포켓와이파이로 더 편한 일본 여행을 즐겨보세요.',
            },
          },
          {
            type: 'text',
            value: {
              text: '일본 지역 어디든 잘 터져서 데이터 걱정이 없어요.',
            },
          },
          {
            type: 'text',
            value: {
              text: '보조배터리도 무료로 하나 더 챙겨드리니 걱정하지 마세요.',
            },
          },
          {
            type: 'text',
            value: {
              text:
                '일본 공항에서 수령할 수 있는 일본 공항 수령 LTE 포켓와이파이도 있어요.',
            },
          },
          {
            type: 'text',
            value: {
              rich: true,
              text: '오사카 여행에 주유패스가 빠질 수 없겠죠?\n',
              rawHTML:
                '<p>오사카 여행에 <strong>주유패스가</strong> 빠질 수 없겠죠?</p>\n',
              markdownText: '오사카 여행에 **주유패스가** 빠질 수 없겠죠?\n',
            },
          },
          {
            type: 'links',
            value: {
              display: 'default',
              links: [
                {
                  href: 'http://www.waug.com/good/?idx=105245',
                  label: '일본 공항 수령 LTE 포켓와이파이',
                },
              ],
            },
          },
        ],
      }}
    />
  ))
  .add('체크', () => (
    <ListElement
      value={{
        bulletType: 'check',
        items: [
          {
            type: 'text',
            value: {
              text: '일본 여행! 포켓와이파이 없이 어떻게 가려고요?',
            },
          },
          {
            type: 'text',
            value: {
              text:
                '와그만의 핑크미가 뿜뿜나는 LTE 포켓와이파이로 더 편한 일본 여행을 즐겨보세요.',
            },
          },
          {
            type: 'text',
            value: {
              text: '일본 지역 어디든 잘 터져서 데이터 걱정이 없어요.',
            },
          },
          {
            type: 'text',
            value: {
              text: '보조배터리도 무료로 하나 더 챙겨드리니 걱정하지 마세요.',
            },
          },
          {
            type: 'text',
            value: {
              text:
                '일본 공항에서 수령할 수 있는 일본 공항 수령 LTE 포켓와이파이도 있어요.',
            },
          },
          {
            type: 'links',
            value: {
              display: 'default',
              links: [
                {
                  href: 'http://www.waug.com/good/?idx=105245',
                  label: '일본 공항 수령 LTE 포켓와이파이',
                },
              ],
            },
          },
        ],
      }}
    />
  ))
