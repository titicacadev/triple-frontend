import { ComponentType } from 'react'
import { Text } from '@titicaca/core-elements'

import { FluidTable, Box } from '../common'

import ImageView, { ImageDocument } from './images'
import TextView, { TextDocument } from './text'
import LinksView, { LinksDocument } from './links'

interface ElementSet {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [type: string]: ComponentType<any>
}

type EntriesElement =
  | EmbeddedHeadingDocument
  | ImageDocument
  | TextDocument
  | LinksDocument

export interface EmbeddedHeadingDocument {
  type: 'heading'
  value: {
    text: string
  }
}

export interface EmbeddedDocument {
  type: 'embedded'
  value: {
    entries: EntriesElement[][]
  }
}

const EMBEDDED_ELEMENTS: ElementSet = {
  heading: EmbeddedHeading,
  images: ImageView,
  text: TextView,
  links: LinksView,
}

export default function EmbeddedView({
  value: { entries },
}: {
  value: EmbeddedDocument['value']
}) {
  return (
    <>
      {entries.map((elements) =>
        elements.map(({ type, value }, index) => {
          const Element = EMBEDDED_ELEMENTS[type]

          return Element && <Element key={index} value={value} />
        }),
      )}
    </>
  )
}

function EmbeddedHeading({
  value: { text },
}: {
  value: EmbeddedHeadingDocument['value']
}) {
  return (
    <FluidTable>
      <tbody>
        <tr>
          <Box padding={{ left: 30, right: 30 }}>
            <Text bold lineHeight="24px" size={16} color="gray">
              {text}
            </Text>
          </Box>
        </tr>
      </tbody>
    </FluidTable>
  )
}
