import { HR1, HR2, HR3, HR4, HR5, HR6 } from '@titicaca/core-elements'

import { ElementSet } from '../types'

import Anchor from './anchor'
import Coupon from './coupon'
import Embedded from './embedded'
import ExternalVideo from './external-video'
import Images from './images'
import ItineraryElement from './itinerary'
import Links from './links'
import List from './list'
import Note from './note'
import Pois from './pois'
import Regions from './regions'
import Table from './table'
import { MH1, MH2, MH3, MH4, Text } from './text'
import { TnaProducts } from './tna'

const ELEMENTS: ElementSet = {
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
  tnaProducts: TnaProducts,
  table: Table,
  coupon: Coupon,
  itinerary: ItineraryElement,
  anchor: Anchor,
}

export default ELEMENTS
