import * as React from 'react'
import {
  HR1,
  HR2,
  HR3,
  HR4,
  HR5,
  HR6,
  ImageSourceType,
} from '@titicaca/core-elements'

import Pois from './pois'
import { TnaProductsList } from './tna'
import Coupon from './coupon'
import {
  TripleElementData,
  ImageEventHandler,
  LinkEventHandler,
  ElementSet,
} from './types'
import Heading from './heading-hoc'
import TextElement from './text-element'
import Links from './links'
import Images from './images'
import { MH1, MH2, MH3, MH4 } from './margin-headings'
import Embedded from './embedded'
import List from './list'
import Regions from './regions'
import ExternalVideo from './external-video'
import Note from './note'
import Table from './table'

interface TripleDocumentProps {
  customElements?: ElementSet
  children: TripleElementData[]

  // merged...
  onResourceClick?: (e: React.SyntheticEvent, resource: unknown) => void
  onImageClick?: ImageEventHandler
  onLinkClick?: LinkEventHandler
  onTNAProductClick?: (
    e: React.SyntheticEvent,
    product: unknown,
    slotId?: number,
    index?: number,
  ) => void
  onTNAProductsFetch?: (slotId: number) => Promise<unknown>
  imageSourceComponent?: ImageSourceType
  deepLink?: string
  videoAutoPlay?: boolean
}

export const ELEMENTS: ElementSet = {
  heading1: Heading(MH1),
  heading2: Heading(MH2),
  heading3: Heading(MH3),
  heading4: Heading(MH4),
  text: TextElement,
  images: Images,
  hr1: HR1,
  hr2: HR2,
  hr3: HR3,
  hr4: HR4,
  hr5: HR5,
  hr6: HR6,
  pois: Pois,
  links: Links,
  embedded: Embedded,
  note: Note,
  list: List,
  regions: Regions,
  video: ExternalVideo,
  tnaProducts: TnaProductsList,
  table: Table,
  coupon: Coupon,
}

export function TripleDocument({
  children,
  customElements = {},
  onResourceClick,
  onImageClick,
  onLinkClick,
  onTNAProductClick,
  onTNAProductsFetch,
  imageSourceComponent,
  deepLink,
  videoAutoPlay,
}: TripleDocumentProps) {
  return (
    <>
      {children.map(({ type, value }, i) => {
        const Element = { ...ELEMENTS, ...customElements }[type]

        return (
          Element && (
            <Element
              key={i}
              value={value}
              onResourceClick={onResourceClick}
              onImageClick={onImageClick}
              onLinkClick={onLinkClick}
              onTNAProductClick={onTNAProductClick}
              onTNAProductsFetch={onTNAProductsFetch}
              ImageSource={imageSourceComponent}
              deepLink={deepLink}
              videoAutoPlay={videoAutoPlay}
            />
          )
        )
      })}
    </>
  )
}
