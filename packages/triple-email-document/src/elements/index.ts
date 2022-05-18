import { ComponentType } from 'react'

import {
  Heading1Document,
  Heading2Document,
  Heading3Document,
  Heading4Document,
  Heading1View,
  Heading2View,
  Heading4View,
} from './heading'
import {
  Divider1Document,
  Divider1View,
  Divider2Document,
  Divider2View,
  Divider3Document,
  Divider3View,
  Divider4Document,
  Divider4View,
  Divider5Document,
  Divider5View,
  Divider6Document,
  Divider6View,
} from './dividers'
import TextView, { TextDocument } from './text'
import LinksView, { LinksDocument } from './links'
import NoteView, { NoteDocument } from './note'
import ImagesView, { ImageDocument } from './images'
import EmbeddedView, { EmbeddedDocument } from './embedded'

export type TripleEmailElementData =
  | Heading1Document
  | Heading2Document
  | Heading3Document
  | Heading4Document
  | Divider1Document
  | Divider2Document
  | Divider3Document
  | Divider4Document
  | Divider5Document
  | Divider6Document
  | TextDocument
  | LinksDocument
  | NoteDocument
  | ImageDocument
  | EmbeddedDocument
// 여기에 데이터 구조 타입을 추가하세요

export type TripleEmailElementType = TripleEmailElementData['type']

export type GetValue<Key extends TripleEmailElementType> = Extract<
  TripleEmailElementData,
  { type: Key }
>['value']

const ELEMENTS: {
  [key in TripleEmailElementType]: ComponentType<{
    value: GetValue<key>
  }>
} = {
  heading1: Heading1View,
  heading2: Heading2View,
  heading3: Heading1View,
  heading4: Heading4View,
  hr1: Divider1View,
  hr2: Divider2View,
  hr3: Divider3View,
  hr4: Divider4View,
  hr5: Divider5View,
  hr6: Divider6View,
  text: TextView,
  links: LinksView,
  note: NoteView,
  images: ImagesView,
  embedded: EmbeddedView,
  // 여기에 컴포넌트를 추가하세요.
}

export default ELEMENTS
