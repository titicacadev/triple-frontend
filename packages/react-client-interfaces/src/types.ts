export enum AppName {
  iOS = 'Triple-iOS',
  Android = 'Triple-Android',
}

export interface App {
  appName: AppName
  appVersion: string
}
