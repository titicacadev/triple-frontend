import styled, { css } from 'styled-components'

interface HrProps {
  compact?: boolean
  color?: string
}

export const HR1 = styled.div<HrProps>`
  margin: 50px 30px;
  height: 1px;
  background-color: ${({ color }) => color || 'var(--color-kint5-gray20)'};

  ${({ compact }) =>
    compact &&
    css`
      margin: 0;
    `};
`

export const HR2 = styled.div<HrProps>`
  margin: 50px 0;
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

export const HR4 = styled.div`
  margin: 40px auto;
  width: 50px;
  height: 50px;
  background-repeat: no-repeat;
  background-size: 50px 50px;
  background-image: url('https://assets.triple-dev.titicaca-corp.com/images/kint5-document-line1.svg');
`

export const HR5 = styled.div`
  margin: 30px auto;
  width: 50px;
  height: 6px;
  background-repeat: no-repeat;
  background-size: 50px 6px;
  background-image: url('https://assets.triple-dev.titicaca-corp.com/images/kint5-document-line2.svg');
`

export const HR6 = styled.div`
  margin: 40px auto;
  width: 102px;
  height: 6px;
  background-repeat: no-repeat;
  background-size: 102px 6px;
  background-image: url('https://assets.triple-dev.titicaca-corp.com/images/kint5-document-line3.svg');
`

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
