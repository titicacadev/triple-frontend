import { blue, white } from '@titicaca/color-palette'

export type Color = 'blue' | 'white'

const COLORS: {
  [key in Color]: {
    [key: string]: string
  }
} = {
  blue: {
    background: blue,
    border: white,
    font: white,
  },
  white: {
    background: white,
    border: blue,
    font: blue,
  },
}

export default COLORS
