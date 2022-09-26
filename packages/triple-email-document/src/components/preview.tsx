import styled from 'styled-components'

import { FluidTable, Box } from '../common'

export interface PreviewDocument {
  type: 'preview'
  value: {
    phrase: string
  }
}

const PreviewStyled = styled.div`
  font-size: 1px;
  display: none;
  max-height: 0px;
  max-width: 0px;
  opacity: 0;
  overflow: hidden;
`

export default function EmailPreview({
  value: { phrase },
}: {
  value: PreviewDocument['value']
}) {
  return (
    <FluidTable>
      <tbody>
        <tr>
          <Box padding={{ top: 0, bottom: 0, left: 0, right: 0 }}>
            <PreviewStyled>{phrase}</PreviewStyled>
          </Box>
        </tr>
      </tbody>
    </FluidTable>
  )
}
