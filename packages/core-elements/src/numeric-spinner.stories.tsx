import styled from 'styled-components'

import NumericSpinner from './elements/numeric-spinner'

export default {
  title: 'Core-Elements / NumericSpinner',
  component: NumericSpinner,
}

export const Basic = () => {
  return (
    <NumericSpinner
      size="big"
      label="성인"
      min={1}
      max={8}
      value={2}
      padding={{ top: 15, right: 125, bottom: 15, left: 16 }}
    />
  )
}
Basic.storyName = '숙박 인원'

export const CustomStyle = () => {
  const NewStyledNumericSpinner = styled(NumericSpinner)`
    > div:first-child {
      color: red;
    }
  `
  return (
    <NewStyledNumericSpinner
      size="big"
      label="성인"
      min={1}
      max={8}
      value={2}
      padding={{ top: 15, right: 125, bottom: 15, left: 16 }}
    />
  )
}
CustomStyle.storyName = '스타일 변경'
