import { ComponentType } from 'react'

import {
  Heading1Document,
  Heading2Document,
  Heading3Document,
  Heading4Document,
  Heading1View,
  Heading2View,
  Heading3View,
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
import LinkView, { LinkDocument } from './link'
import NoteView, { NoteDocument } from './note'
import ImagesView, { ImageDocument } from './images'

export type TripleDocumentElement =
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
  | LinkDocument
  | NoteDocument
  | ImageDocument
// 여기에 데이터 구조 타입을 추가하세요

export type TripleDocumentElementType = TripleDocumentElement['type']

export type GetValue<Key extends TripleDocumentElementType> = Extract<
  TripleDocumentElement,
  { type: Key }
>['value']

const ELEMENTS: {
  [key in TripleDocumentElementType]: ComponentType<{
    value: GetValue<key>
  }>
} = {
  heading1: Heading1View,
  heading2: Heading2View,
  heading3: Heading3View,
  heading4: Heading4View,
  hr1: Divider1View,
  hr2: Divider2View,
  hr3: Divider3View,
  hr4: Divider4View,
  hr5: Divider5View,
  hr6: Divider6View,
  text: TextView,
  link: LinkView,
  note: NoteView,
  images: ImagesView,
  // 여기에 컴포넌트를 추가하세요.
}

export default ELEMENTS
