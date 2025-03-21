import { Theme } from '@titicaca/tds-theme'

import { ReservationInfoTheme } from './theme-provider'

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {
    reservationInfo: ReservationInfoTheme
  }
}
