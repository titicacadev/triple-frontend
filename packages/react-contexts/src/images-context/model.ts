export interface Image {
  id: string
  sizes: {
    [key: string]: {
      url: string
    }
  }
}
