import { TranslatedProperty } from '@titicaca/type-definitions'

export interface RegionData {
  nameOverride: string | null
  source: {
    id: string
    names: TranslatedProperty
    style?: {
      backgroundImageUrl: string
    }
  }
}
