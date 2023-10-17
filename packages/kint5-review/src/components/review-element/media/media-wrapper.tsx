import { ReactNode } from 'react'
import styled from 'styled-components'

import { GridWrapper } from './elements'

interface Props {
  length: number
  children?: ReactNode
}

const MonoMediaWrapper = styled(GridWrapper)`
  @media (min-width: 500px) {
    grid-template-rows: 293px;
  }
`

const DuoMediaWrapper = styled(GridWrapper)`
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 2fr;

  & > :nth-child(1) {
    grid-column: 1;
  }

  & > :nth-child(2) {
    grid-column: 2;
  }

  @media (min-width: 500px) {
    grid-template-rows: 217px;
  }
`

const TriMediaWrapper = styled(GridWrapper)`
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);

  & > :nth-child(1) {
    grid-column: span 2;
    grid-row: span 2;
  }

  & > :nth-child(2) {
    grid-column: 3;
    grid-row: 1;
  }

  & > :nth-child(3) {
    grid-column: 3;
    grid-row: 2;
  }

  @media (min-width: 500px) {
    grid-template-rows: repeat(2, 143px);
  }
`

const QuadMediaWrapper = styled(GridWrapper)`
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 1fr);

  & > :nth-child(1) {
    grid-column: span 3;
    grid-row: span 3;
  }

  & > :nth-child(2) {
    grid-column: 4;
    grid-row: 1;
  }

  & > :nth-child(3) {
    grid-column: 4;
    grid-row: 2;
  }

  & > :nth-child(4) {
    grid-column: 4;
    grid-row: 3;
  }

  @media (min-width: 500px) {
    grid-template-rows: repeat(3, 105px);
  }
`

const PentaMediaWrapper = styled(GridWrapper)`
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(5, 1fr);

  & > :nth-child(1) {
    grid-column: span 3;
    grid-row: span 3;
  }

  & > :nth-child(2) {
    grid-column: 4 / span 3;
    grid-row: span 3;
  }

  & > :nth-child(3) {
    grid-column: span 2;
    grid-row: 4 / span 2;
  }

  & > :nth-child(4) {
    grid-column: 3 / span 2;
    grid-row: 4 / span 2;
  }

  & > :nth-child(5) {
    grid-column: 5 / span 2;
    grid-row: 4 / span 2;
  }

  @media (min-width: 500px) {
    grid-template-rows: none;
    grid-auto-rows: 217px 143px;

    & > :nth-child(1) {
      grid-row: 1;
    }

    & > :nth-child(2) {
      grid-row: 1;
    }

    & > :nth-child(3) {
      grid-row: 2;
    }

    & > :nth-child(4) {
      grid-row: 2;
    }

    & > :nth-child(5) {
      grid-row: 2;
    }
  }
`

function MediaWrapper({ length, children }: Props) {
  switch (length) {
    case 0:
      return null
    case 1:
      return <MonoMediaWrapper>{children}</MonoMediaWrapper>
    case 2:
      return <DuoMediaWrapper>{children}</DuoMediaWrapper>
    case 3:
      return <TriMediaWrapper>{children}</TriMediaWrapper>
    case 4:
      return <QuadMediaWrapper>{children}</QuadMediaWrapper>
    default:
      return <PentaMediaWrapper>{children}</PentaMediaWrapper>
  }
}

export default MediaWrapper
