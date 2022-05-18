import styled from 'styled-components'

import { FluidTable, Box } from '../common'

export interface Heading1Document {
  type: 'heading1'
  value: {
    headline?: string
    text: string
  }
}

export interface Heading2Document {
  type: 'heading2'
  value: {
    text: string
  }
}

export interface Heading3Document {
  type: 'heading3'
  value: {
    text: string
  }
}

export interface Heading4Document {
  type: 'heading4'
  value: {
    text: string
  }
}

const H1Container = styled.h1`
  margin: 0;
  font-size: 21px;
  font-weight: bold;
  color: rgba(58, 58, 58, 1);
  white-space: pre-line;
`

const HeadlineContainer = styled.p`
  margin: 0;
  font-size: 13px;
  font-weight: bold;
  color: #2987f0;
`

const H2Container = styled.h2`
  margin: 0;
  font-size: 19px;
  font-weight: 500;
  color: rgba(58, 58, 58, 1);
  white-space: pre-line;
`

const H3Container = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: bold;
  color: rgba(58, 58, 58, 1);
  white-space: pre-line;
`

const H4Container = styled.h4`
  margin: 0;
  font-size: 16px;
  font-weight: bold;
  color: #2987f0;
`

export function Heading1View({
  value: { text, headline },
}: {
  value: Heading1Document['value']
}) {
  return (
    <FluidTable>
      <tbody>
        <tr>
          <Box padding={{ top: 25, bottom: 20, left: 30, right: 30 }}>
            {headline && <HeadlineContainer>{headline}</HeadlineContainer>}
            <H1Container>{text}</H1Container>
          </Box>
        </tr>
      </tbody>
    </FluidTable>
  )
}

export function Heading2View({
  value: { text },
}: {
  value: Heading2Document['value']
}) {
  return (
    <FluidTable>
      <tbody>
        <tr>
          <Box padding={{ top: 20, bottom: 20, left: 30, right: 30 }}>
            <H2Container>{text}</H2Container>
          </Box>
        </tr>
      </tbody>
    </FluidTable>
  )
}

export function Heading3View({
  value: { text },
}: {
  value: Heading3Document['value']
}) {
  return (
    <FluidTable>
      <tbody>
        <tr>
          <Box padding={{ top: 20, left: 30, right: 30 }}>
            <H3Container>{text}</H3Container>
          </Box>
        </tr>
      </tbody>
    </FluidTable>
  )
}

export function Heading4View({
  value: { text },
}: {
  value: Heading4Document['value']
}) {
  return (
    <FluidTable>
      <tbody>
        <tr>
          <Box padding={{ top: 20, left: 30, right: 30 }}>
            <H4Container>{text}</H4Container>
          </Box>
        </tr>
      </tbody>
    </FluidTable>
  )
}
