import React from 'react'
import { storiesOf } from '@storybook/react'
import { number, text, select } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import { Tooltip, Navbar } from '@titicaca/core-elements'
import styled from 'styled-components'

const Base = styled.div`
  position: relative;
  display: inline-block;
  margin: 50px;
  border: solid 1px black;
  padding: 10px;
`

storiesOf('Tooltip', module)
  .add('기본', () => (
    <Base>
      툴팁 표시 대상
      <Tooltip
        label={text('내용', '모든 호텔 보기')}
        borderRadius={text('border radius')}
      />
    </Base>
  ))
  .add('onClick', () => (
    <Base>
      툴팁 표시 대상
      <Tooltip
        label={text('내용', '모든 호텔 보기')}
        borderRadius={text('border radius')}
        onClick={action('툴팁 클릭')}
      />
    </Base>
  ))
  .add('위치', () => (
    <Base>
      툴팁 표시 대상
      <Tooltip
        label={text('내용', '모든 호텔 보기')}
        borderRadius={text('border radius')}
        absolute={{
          top: number('top'),
          right: number('right'),
          bottom: number('bottom'),
          left: number('left'),
        }}
        pointingPosition={select('포인팅 위치', ['above', 'below'], 'below')}
      />
    </Base>
  ))
  .add('아이콘', () => (
    <Navbar>
      <div style={{ height: '100%', position: 'relative' }}>
        <Navbar.Item icon="list" />

        <Tooltip
          label={text('내용', '모든 호텔 보기')}
          borderRadius={text('border radius', 12)}
          absolute={{
            top: number('top'),
            right: number('right'),
            bottom: number('bottom', -25),
            left: number('left', -14),
          }}
          pointingPosition={select('포인팅 위치', ['above', 'below'], 'above')}
        />
      </div>
    </Navbar>
  ))
