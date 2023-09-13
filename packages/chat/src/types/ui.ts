export type BackgroundColor = 'mint' | 'blue' | 'gray' | 'darkGray'

export interface BackgroundColorInterface {
  sent: Extract<BackgroundColor, 'mint' | 'blue'>
  received: Extract<BackgroundColor, 'gray' | 'darkGray'>
}

export interface BubbleColor<T extends 'sent' | 'received'> {
  backgroundColor: BackgroundColorInterface[T]
  textColor: string
}

// type BubbleColor<T extends 'sent' | 'received' | undefined = undefined> = {
//   textColor: string
// } & (T extends undefined
//   ? { backgroundColor: BackgroundColor }
//   : { backgroundColor: BackgroundColorInterface[T] })

export interface ChatBubbleColor {
  sent: BubbleColor<'sent'>
  received: BubbleColor<'received'>
}
