import React from 'react'
import styled from 'styled-components'

import { FluidTable, Box } from '../common'

export interface TextDocument {
  type: 'text'
  value: {
    rawHTML: string
  }
}

const HtmlContainer = styled.div`
  p {
    margin: 24px 0 0 0;
    font-size: 16px;
    line-height: 1.63;
    font-weight: 500;
    color: var(--color-gray900);

    &:first-of-type {
      margin-top: 0;
    }
  }

  strong {
    font-size: 16px;
    line-height: 1.63;
    font-weight: bold;
    color: var(--color-gray);
  }

  && {
    a {
      font-size: 16px;
      line-height: 1.63;
      font-weight: bold;
      color: #2987f0;
      text-decoration: underline;
    }
  }
`

export default function TextView({
  value: { rawHTML },
}: {
  value: TextDocument['value']
}) {
  return (
    <FluidTable>
      <tbody>
        <tr>
          <Box padding={{ top: 10, left: 30, right: 30 }}>
            <HtmlContainer dangerouslySetInnerHTML={{ __html: rawHTML }} />
          </Box>
        </tr>
      </tbody>
    </FluidTable>
  )
}
