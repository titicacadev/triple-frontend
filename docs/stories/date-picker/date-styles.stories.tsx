import React from 'react'
import { StoryFn } from '@storybook/addons'
import { array } from '@storybook/addon-knobs'
import styled from 'styled-components'
import PickerFrame, {
  generateSelectedCircleStyle,
  rangeStyle,
  generateDateLabelStyle,
} from '@titicaca/date-picker/lib/picker-frame'

const Table = styled.table`
  table-layout: fixed;
  border-collapse: separate;
  border-spacing: 8px;
  text-align: center;
  empty-cells: show;

  td {
    width: auto !important;
  }
`

export default {
  title: 'date-picker / 날짜 스타일',
  decorators: [
    (storyFn: StoryFn<JSX.Element>) => (
      <PickerFrame height="500px" sideSpacing={10} monthPadding="0">
        <div className="DayPicker">
          <Table className="DayPicker-Month">{storyFn()}</Table>
        </div>
      </PickerFrame>
    ),
  ],
}

export function common() {
  return (
    <tbody className="DayPicker-Body">
      <tr className="DayPicker-Week">
        <td>기본</td>
        <td className="DayPicker-Day">1</td>
        <td className="DayPicker-Day DayPicker-Day--disabled">2</td>
        <td className="DayPicker-Day DayPicker-Day--saturday">3</td>
        <td className="DayPicker-Day DayPicker-Day--sunday">4</td>
        <td className="DayPicker-Day DayPicker-Day--publicHolidays">5</td>
        <td className="DayPicker-Day DayPicker-Day--today">6</td>
        <td className="DayPicker-Day DayPicker-Day--selected">7</td>
      </tr>

      <tr className="DayPicker-Week">
        <td>outside</td>
        <td className="DayPicker-Day DayPicker-Day--outside" />
        <td className="DayPicker-Day DayPicker-Day--outside DayPicker-Day--disabled" />
        <td className="DayPicker-Day DayPicker-Day--outside DayPicker-Day--saturday" />
        <td className="DayPicker-Day DayPicker-Day--outside DayPicker-Day--sunday" />
        <td className="DayPicker-Day DayPicker-Day--outside DayPicker-Day--publicHolidays" />
        <td className="DayPicker-Day DayPicker-Day--outside DayPicker-Day--today" />
        <td className="DayPicker-Day DayPicker-Day--outside DayPicker-Day--selected" />
      </tr>

      <tr className="DayPicker-Week">
        <td>오늘</td>
        <td className="DayPicker-Day DayPicker-Day--today">1</td>
        <td className="DayPicker-Day DayPicker-Day--today DayPicker-Day--disabled">
          2
        </td>
        <td className="DayPicker-Day DayPicker-Day--today DayPicker-Day--saturday">
          3
        </td>
      </tr>

      <tr className="DayPicker-Week">
        <td>knob</td>
        <td
          className={[
            'DayPicker-Day',
            ...array('조건', ['']).map((type) => `DayPicker-Day--${type}`),
          ].join(' ')}
        >
          42
        </td>
      </tr>
    </tbody>
  )
}

export function dayPicker() {
  return (
    <>
      <tr className="DayPicker-Week">
        <td>selected</td>
        <td className="DayPicker-Day DayPicker-Day--selected">1</td>
        <td className="DayPicker-Day DayPicker-Day--selected DayPicker-Day--disabled">
          2
        </td>
        <td className="DayPicker-Day DayPicker-Day--selected DayPicker-Day--saturday">
          3
        </td>
        <td className="DayPicker-Day DayPicker-Day--selected DayPicker-Day--sunday">
          4
        </td>
        <td className="DayPicker-Day DayPicker-Day--selected DayPicker-Day--publicHolidays">
          5
        </td>
        <td className="DayPicker-Day DayPicker-Day--selected DayPicker-Day--today">
          6
        </td>
      </tr>

      <tr className="DayPicker-Week">
        <td>knob</td>
        <td
          className={[
            'DayPicker-Day',
            ...array('조건', ['']).map((type) => `DayPicker-Day--${type}`),
          ].join(' ')}
        >
          42
        </td>
      </tr>
    </>
  )
}

const DayContainer = styled.tbody`
  ${generateSelectedCircleStyle('.DayPicker-Day--selected')}
`

dayPicker.decorators = [
  (storyFn: StoryFn<JSX.Element>) => (
    <DayContainer className="DayPicker-Body">{storyFn()}</DayContainer>
  ),
]

export function rangePicker() {
  return (
    <>
      <tr className="DayPicker-Week">
        <td>outside 구간</td>
        <td className="DayPicker-Day DayPicker-Day--outside DayPicker-Day--from DayPicker-Day--selected DayPicker-Day--included-range" />
        <td className="DayPicker-Day DayPicker-Day--publicHolidays DayPicker-Day--outside DayPicker-Day--selected DayPicker-Day--included-range" />
        <td className="DayPicker-Day DayPicker-Day--disabled DayPicker-Day--outside DayPicker-Day--selected DayPicker-Day--included-range" />
        <td className="DayPicker-Day DayPicker-Day--outside DayPicker-Day--today DayPicker-Day--selected DayPicker-Day--included-range" />
        <td className="DayPicker-Day DayPicker-Day--outside DayPicker-Day--today DayPicker-Day--publicHolidays  DayPicker-Day--selected DayPicker-Day--included-range" />
      </tr>

      <tr className="DayPicker-Week">
        <td>구간</td>

        <td className="DayPicker-Day DayPicker-Day--selected">1</td>
        <td className="DayPicker-Day DayPicker-Day--selected DayPicker-Day--disabled">
          2
        </td>
        <td className="DayPicker-Day DayPicker-Day--selected DayPicker-Day--saturday">
          3
        </td>
        <td className="DayPicker-Day DayPicker-Day--selected DayPicker-Day--sunday">
          4
        </td>
        <td className="DayPicker-Day DayPicker-Day--selected DayPicker-Day--publicHolidays">
          5
        </td>
        <td className="DayPicker-Day DayPicker-Day--selected DayPicker-Day--today">
          6
        </td>
      </tr>

      <tr className="DayPicker-Week">
        <td>from, to</td>
        <td />
        <td className="DayPicker-Day DayPicker-Day--selected DayPicker-Day--from">
          1
        </td>
        <td className="DayPicker-Day DayPicker-Day--selected DayPicker-Day--to">
          2
        </td>
        <td className="DayPicker-Day DayPicker-Day--selected DayPicker-Day--from DayPicker-Day--to">
          3
        </td>
        <td className="DayPicker-Day DayPicker-Day--selected DayPicker-Day--from DayPicker-Day--saturday">
          4
        </td>
        <td className="DayPicker-Day DayPicker-Day--selected DayPicker-Day--from DayPicker-Day--today">
          5
        </td>
      </tr>

      <tr className="DayPicker-Week">
        <td>knob</td>
        <td
          className={[
            'DayPicker-Day',
            ...array('조건', ['']).map((type) => `DayPicker-Day--${type}`),
          ].join(' ')}
        >
          42
        </td>
      </tr>
    </>
  )
}

const RangeContainer = styled.tbody`
  ${generateSelectedCircleStyle('.DayPicker-Day--from,.DayPicker-Day--to')}

  ${rangeStyle}

  ${generateDateLabelStyle('.DayPicker-Day--from', '출발일')}

  ${generateDateLabelStyle('.DayPicker-Day--to', '귀국일')}

  ${generateDateLabelStyle(
    '.DayPicker-Day--from.DayPicker-Day--to',
    '당일왕복',
  )}
`

rangePicker.decorators = [
  (storyFn: StoryFn<JSX.Element>) => (
    <RangeContainer className="DayPicker-Body">{storyFn()}</RangeContainer>
  ),
]
