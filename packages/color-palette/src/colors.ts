export enum ColorSet {
  gray = rgba('58, 58, 58, 1'),
  gray20 = rgba('58, 58, 58, 0.02'),
  gray50 = rgba('58, 58, 58, 0.05'),
  gray100 = rgba('58, 58, 58, 0.1'),
  gray200 = rgba('58, 58, 58, 0.2'),
  gray300 = rgba('58, 58, 58, 0.3'),
  gray400 = rgba('58, 58, 58, 0.4'),
  gray500 = rgba('58, 58, 58, 0.5'),
  gray600 = rgba('58, 58, 58, 0.6'),
  gray700 = rgba('58, 58, 58, 0.7'),
  gray800 = rgba('58, 58, 58, 0.8'),
  gray900 = rgba('58, 58, 58, 0.9'),
  blue = rgba('54, 143, 255, 1'),
  blue100 = rgba('54, 143, 255, 0.1'),
  blue980 = rgba('54, 143, 255, 0.98'),
  mint = rgba('38, 206, 194, 1'),
  mint100 = rgba('38, 206, 194, 0.1'),
  orange = rgba('255, 150, 35, 1'),
  red = rgba('253, 46, 105, 1'),
  deepOrange = rgba('255, 91, 46, 1'),
  mediumRed = rgba('255, 33, 60, 1'),
  deepRed = rgba('190, 0, 23, 1'),
  purple = rgba('151, 95, 254, 1'),
  emerald = rgba('11, 208, 153, 1'),
  white = rgba('255, 255, 255, 1'),
  white600 = rgba('255, 255, 255, 0.6'),

  /** genie */
  azul = rgba('31, 87, 250, 1'),
  azul500 = rgba('31, 87, 250, 0.5'),
  teal = rgba('10, 219, 143, 1'),
  teal100 = rgba('10, 219, 143, 0.1'),
  teal900 = rgba('10, 219, 143, 0.9'),
}

function rgba(values: string) {
  return (`rgba(${values})` as unknown) as ColorSet
}

export type Color = keyof typeof ColorSet | string
