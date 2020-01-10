import generateRgba from '../generate-rgba'

enum Color {
  gray = '58, 58, 58',
  blue = '54, 143, 255',
  mint = '38, 206, 194',
  orange = '255, 150, 35',
  red = '253, 46, 105',
  /* eslint-disable @typescript-eslint/camelcase */
  deep_orange = '255, 91, 46',
  medium_red = '255, 33, 60',
  deep_red = '190, 0, 23',
  purple = '151, 95, 254',
  emerald = '11, 208, 153',
  /* eslint-disable @typescript-eslint/camelcase */
}

export default {
  white: 'rgba(255, 255, 255, 1)',
  ...generateRgba('gray', Color.gray),
  gray_2: `rgba(${Color.gray}, 0.02)`,
  gray_5: `rgba(${Color.gray}, 0.05)`,
  ...generateRgba('blue', Color.blue),
  ...generateRgba('mint', Color.mint),
  ...generateRgba('orange', Color.orange),
  ...generateRgba('deep_orange', Color.deep_orange),
  ...generateRgba('red', Color.red),
  ...generateRgba('medium_red', Color.medium_red),
  ...generateRgba('deep_red', Color.deep_red),
  ...generateRgba('purple', Color.purple),
  ...generateRgba('emerald', Color.emerald),
}
