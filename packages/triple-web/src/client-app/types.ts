export const enum ClientAppName {
  iOS = 'Triple-iOS',
  Android = 'Triple-Android',
}

export type ClientAppValue = {
  metadata: {
    name: ClientAppName
    version: string
    isMacApp: boolean
  }
  device: {
    autoplay: 'always' | 'wifi_only' | 'never'
    networkType: 'wifi' | 'cellular' | 'unknown'
  }
} | null
