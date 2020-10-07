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

import Pois from './elements/pois'
import { TnaProductsList } from './elements/tna'
import Coupon from './elements/coupon'
import {
  TripleElementData,
  ImageEventHandler,
  LinkEventHandler,
  ElementSet,
} from './types'
import { Text, MH1, MH2, MH3, MH4 } from './elements/text'
import Links from './elements/links'
import Images from './elements/images'
import Embedded from './elements/embedded'
import List from './elements/list'
import Regions from './elements/regions'
import ExternalVideo from './elements/external-video'
import Note from './elements/note'
import Table from './elements/table'

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
  heading1: MH1,
  heading2: MH2,
  heading3: MH3,
  heading4: MH4,
  text: Text,
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
