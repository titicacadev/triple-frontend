export type BackgroundColor = 'mint' | 'blue' | 'gray' | 'darkGray'

export interface BackgroundColorInterface {
  sent: Extract<BackgroundColor, 'mint' | 'blue'>
  received: Extract<BackgroundColor, 'gray' | 'darkGray'>
}

export interface BubbleColor<T extends 'sent' | 'received'> {
  backgroundColor: BackgroundColorInterface[T]
  textColor: {
    normal: string
    blinded?: string
  }
}

export interface ChatBubbleColor {
  sent: BubbleColor<'sent'>
  received: BubbleColor<'received'>
}
