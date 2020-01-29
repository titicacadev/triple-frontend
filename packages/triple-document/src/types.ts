export interface RegionData {
  nameOverride: string | null
  source: {
    id: string
    names: {
      ko: string | null
      en: string | null
      local: string | null
    }
    style?: {
      backgroundImageUrl: string
    }
  }
}
