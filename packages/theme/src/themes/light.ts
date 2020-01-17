import generateRgba from '../generate-rgba'

enum Color {
  gray = '58, 58, 58',
  blue = '54, 143, 255',
  mint = '38, 206, 194',
  orange = '255, 150, 35',
  red = '253, 46, 105',
  deepOrange = '255, 91, 46',
  mediumRed = '255, 33, 60',
  deepRed = '190, 0, 23',
  purple = '151, 95, 254',
  emerald = '11, 208, 153',
  white = '255, 255, 255, 1',
}

export default {
  white: `rgba(${Color.white}, 1)`,
  black: `rgba(${Color.gray})`,
  gray: {
    20: `rgba(${Color.gray}, 0.02)`,
    50: `rgba(${Color.gray}, 0.05)`,
    ...generateRgba(Color.gray),
  },
  blue: {
    ...generateRgba(Color.blue),
  },
  mint: {
    ...generateRgba(Color.mint),
  },
  orange: {
    ...generateRgba(Color.orange),
  },
  deepOrange: {
    ...generateRgba(Color.deepOrange),
  },
  red: {
    ...generateRgba(Color.red),
  },
  mediumRed: {
    ...generateRgba(Color.mediumRed),
  },
  deepRed: {
    ...generateRgba(Color.deepRed),
  },
  purple: {
    ...generateRgba(Color.purple),
  },
  emerald: {
    ...generateRgba(Color.emerald),
  },
}
