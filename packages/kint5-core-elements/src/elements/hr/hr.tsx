import styled, { css } from 'styled-components'

interface HrProps {
  compact?: boolean
  color?: string
}

export const HR1 = styled.div<HrProps>`
  margin: 40px 16px;
  height: 1px;
  background-color: ${({ color }) => color || 'var(--color-kint5-gray20)'};

  ${({ compact }) =>
    compact &&
    css`
      margin: 0;
    `};
`

export const HR2 = styled.div<HrProps>`
  margin: 32px 0;
  height: 8px;
  background-color: var(--color-kint5-gray20);

  ${({ compact }) =>
    compact &&
    css`
      margin: 0;
    `};
`

export const HR3 = styled.div<{ height?: number }>`
  height: ${({ height }) => height || 10}px;
  background-color: transparent;
`

export function HR4() {
  return (
    <svg
      role="separator"
      width="37"
      height="37"
      viewBox="0 0 37 37"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      css={{
        display: 'block',
        margin: '40px auto',
        width: 50,
        height: 50,
      }}
    >
      <line
        x1="36.3536"
        y1="0.353553"
        x2="0.998215"
        y2="35.7089"
        stroke="#747C86"
      />
    </svg>
  )
}

export function HR5() {
  return (
    <svg
      role="separator"
      width="50"
      height="6"
      viewBox="0 0 50 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      css={{ display: 'block', margin: '30px auto', width: 50, height: 6 }}
    >
      <circle cx="3" cy="3" r="3" fill="#9199A2" />
      <circle cx="25" cy="3" r="3" fill="#9199A2" />
      <circle cx="47" cy="3" r="3" fill="#9199A2" />
    </svg>
  )
}

export function HR6() {
  return (
    <svg
      role="separator"
      width="102"
      height="6"
      viewBox="0 0 102 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      css={{
        display: 'block',
        margin: '40px auto',
        width: 102,
        height: 6,
      }}
    >
      <circle cx="51" cy="3" r="3" fill="#9199A2" />
      <line x1="62" y1="2.5" x2="102" y2="2.5" stroke="#9199A2" />
      <line y1="2.5" x2="40" y2="2.5" stroke="#9199A2" />
    </svg>
  )
}

export const HR7 = styled.div<HrProps>`
  margin: 30px auto;
  ${({ compact }) =>
    compact &&
    css`
      margin: 0;
    `};
  width: 100%;
  border-bottom: dashed 1px #efefef;
`
