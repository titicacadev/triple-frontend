import { styled, useTheme } from 'styled-components'
import { Container } from '@titicaca/tds-ui'
import { ButtonHTMLAttributes } from 'react'

import { TextFullViewArrowIcon } from '../../../icons/text-full-view-arrow-icon'

const getColorVariable =
  (condition: boolean, reverse: boolean) =>
  (colorA: string, colorB: string) => {
    if (reverse) {
      return condition ? colorB : colorA
    }
    return condition ? colorA : colorB
  }

export const NolFullTextViewText = styled.div`
  max-height: 45.6rem;
  overflow: hidden;
`

const Divider = styled.hr<{ color: string }>`
  border: none;
  height: 1px;
  margin: 8px 0;
  background-color: ${({ color }) => color};
`

const Button = styled.button.attrs({ type: 'button' })<{
  color: string
}>`
  background-color: unset;
  float: right;
  font-size: 1.2rem;
  line-height: 1.6rem;
  position: relative;
  font-weight: 700;
  color: ${({ color }) => color};
`

export const NolFullTextViewButton = ({
  my,
  reverseColor = false,
  ...props
}: {
  my: boolean
  reverseColor?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>) => {
  const getColor = getColorVariable(my, reverseColor)
  const theme = useTheme()

  return (
    <>
      <Divider
        color={getColor(theme.nol.colorNeutralW20, theme.nol.colorNeutralB10)}
      />
      <Button
        color={getColor(theme.nol.colorNeutralW100, theme.nol.colorNeutralG80)}
        {...props}
      >
        전체보기
        <TextFullViewArrowIcon color={getColor('white', '#545457')} />
      </Button>
    </>
  )
}

export const NolFullTextViewContent = styled(Container)`
  padding: 12px 20px;
  font-size: 1.5rem;
  line-height: 1.4;
  color: ${({ theme }) => theme.nol.colorNeutralB100};
  white-space: pre-wrap;
  word-break: break-word;

  & > a {
    color: ${({ theme }) => theme.nol.colorPrimaryNol};
    text-decoration: underline;
    line-break: anywhere;
  }
`
