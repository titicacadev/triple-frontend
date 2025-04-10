import { styled } from 'styled-components'
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

export const TextContainer = styled.div`
  max-height: 45.6rem;
  overflow: hidden;
`

export const Divider = styled.hr<{ color: string }>`
  border: none;
  height: 1px;
  margin: 8px 5px;
  background-color: ${({ color }) => color};
`

export const Button = styled.button.attrs({ type: 'button' })<{
  color: string
}>`
  background-color: unset;
  float: right;
  margin: 0 5px;
  padding-right: 12px;
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

  return (
    <>
      <Divider
        color={getColor(
          'var(--color-neutral-w-20)',
          'var(--color-neutral-b-10)',
        )}
      />
      <Button
        color={getColor(
          'var(--color-neutral-w-100)',
          'var(--color-neutral-g-80)',
        )}
        {...props}
      >
        전체보기
        <TextFullViewArrowIcon color={getColor('#545457', 'white')} />
      </Button>
    </>
  )
}

export const ContentContainer = styled(Container)`
  padding: 12px 20px;
  font-size: 1.5rem;
  line-height: 1.4;
  color: var(--color-neutral-b-100);
  white-space: pre-wrap;
  word-break: break-word;

  & > a {
    color: var(--color-primary-nol);
    text-decoration: underline;
    line-break: anywhere;
  }
`
