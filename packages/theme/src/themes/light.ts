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
}

export default {
  white: 'rgba(255, 255, 255, 1)',
  ...generateRgba('gray', Color.gray),
  gray02: `rgba(${Color.gray}, 0.02)`,
  gray05: `rgba(${Color.gray}, 0.05)`,
  ...generateRgba('blue', Color.blue),
  ...generateRgba('mint', Color.mint),
  ...generateRgba('orange', Color.orange),
  ...generateRgba('deepOrange', Color.deepOrange),
  ...generateRgba('red', Color.red),
  ...generateRgba('mediumRed', Color.mediumRed),
  ...generateRgba('deepRed', Color.deepRed),
  ...generateRgba('purple', Color.purple),
  ...generateRgba('emerald', Color.emerald),
}
