export interface Banner {
  id: string
  desc: string
  image: string
  target: string
}

export enum ListDirection {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  VERTICAL = 'vertical',
  // eslint-disable-next-line @typescript-eslint/naming-convention
  HORIZONTAL = 'horizontal',
}
