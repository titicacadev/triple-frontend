import React from 'react'
import styled from 'styled-components'

import { FluidTable, Box } from '../common'

export interface NoteDocument {
  type: 'note'
  value: {
    title: string
    body: string
  }
}

const SegmentStlyed = styled.div`
  padding: 20px;
  border-radius: 6px;
  background-color: #fafafa;

  &:after {
    content: '';
    display: block;
    clear: both;
  }
`

const NoteTextStyled = styled.div`
  font-size: 14px;
  line-height: 1.57;
`

const TitleStyled = styled(NoteTextStyled)`
  font-weight: 700;
  color: var(--color-gray);
`

const BodyStyled = styled(NoteTextStyled)`
  color: var(--color-gray800);
`

export default function NoteView({
  value: { title, body },
}: {
  value: NoteDocument['value']
}) {
  return (
    <FluidTable>
      <tbody>
        <tr>
          <Box padding={{ top: 30, bottom: 30, left: 30, right: 30 }}>
            <SegmentStlyed>
              <TitleStyled>{title}</TitleStyled>
              <BodyStyled>{body}</BodyStyled>
            </SegmentStlyed>
          </Box>
        </tr>
      </tbody>
    </FluidTable>
  )
}
