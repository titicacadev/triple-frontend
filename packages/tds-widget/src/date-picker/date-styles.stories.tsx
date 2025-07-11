import type { Meta, StoryFn, StoryObj } from '@storybook/react'
import { styled } from 'styled-components'

import { dateLabelMixin, rangeMixin } from './mixins'
import { PickerFrame, generateSelectedCircleStyle } from './picker-frame'

const Table = styled.table`
  border-collapse: separate;
  border-spacing: 8px;
  text-align: center;
  empty-cells: show;

  td {
    width: auto !important;
  }
`

export default {
  title: 'tds-widget / date-picker / 날짜 스타일',
  decorators: [
    (Story) => (
      <PickerFrame
        $height="500px"
        $sideSpacing={10}
        $monthPadding="0"
        $hideTodayLabel={false}
      >
        <div className="DayPicker">
          <Table className="DayPicker-Month">
            <Story />
          </Table>
        </div>
      </PickerFrame>
    ),
  ],
} as Meta

export const Common: StoryFn = () => {
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
        <td className={['DayPicker-Day'].join(' ')}>42</td>
      </tr>
    </tbody>
  )
}

const DayContainer = styled.tbody`
  ${generateSelectedCircleStyle('.DayPicker-Day--selected')}
`

export const DayPicker: StoryObj = {
  render: () => {
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
          <td className={['DayPicker-Day'].join(' ')}>42</td>
        </tr>
      </>
    )
  },

  decorators: [
    (Story) => (
      <DayContainer className="DayPicker-Body">
        <Story />
      </DayContainer>
    ),
  ],
}

const RangeContainer = styled.tbody`
  ${generateSelectedCircleStyle('.DayPicker-Day--from,.DayPicker-Day--to')}

  ${rangeMixin({})}

  ${dateLabelMixin({
    selector: '.DayPicker-Day--from',
    label: '출발일',
  })}

  ${dateLabelMixin({ selector: '.DayPicker-Day--to', label: '귀국일' })}

  ${dateLabelMixin({
    selector: '.DayPicker-Day--from.DayPicker-Day--to',
    label: '당일왕복',
  })}
`

export const RangePicker: StoryObj = {
  render: () => {
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
          <td className={['DayPicker-Day'].join(' ')}>42</td>
        </tr>
      </>
    )
  },

  decorators: [
    (Story) => (
      <RangeContainer className="DayPicker-Body">
        <Story />
      </RangeContainer>
    ),
  ],
}
