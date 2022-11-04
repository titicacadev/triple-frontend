import styled, { css } from 'styled-components'

import { FluidTable, Box } from '../common'

export interface TextDocument {
  type: 'text'
  value: {
    text?: string
    rawHTML?: string
  }
}

const textStyle = css`
  font-size: 16px;
  line-height: 1.63;
  font-weight: 500;
  color: rgba(58, 58, 58, 0.9);
  white-space: pre-line;
`

const HtmlContainer = styled.div`
  p {
    margin: 24px 0 0;
    ${textStyle}

    &:first-of-type {
      margin-top: 0;
    }
  }

  strong {
    ${textStyle}

    font-weight: bold;
    color: rgba(58, 58, 58, 1);
  }

  && {
    a {
      ${textStyle}

      font-weight: bold;
      color: #2987f0;
      text-decoration: underline;
    }
  }
`

const TextContainer = styled.div`
  ${textStyle}
`

export default function TextView({
  value: { text, rawHTML },
}: {
  value: TextDocument['value']
}) {
  return (
    <FluidTable>
      <tbody>
        <tr>
          <Box padding={{ left: 30, right: 30 }}>
            {rawHTML ? (
              <HtmlContainer dangerouslySetInnerHTML={{ __html: rawHTML }} />
            ) : (
              <TextContainer>{text}</TextContainer>
            )}
          </Box>
        </tr>
      </tbody>
    </FluidTable>
  )
}
