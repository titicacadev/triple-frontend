export type BackgroundColor = 'mint' | 'blue' | 'gray' | 'darkGray'

export interface BackgroundColorInterface {
  sent: Extract<BackgroundColor, 'mint' | 'blue'>
  received: Extract<BackgroundColor, 'gray' | 'darkGray'>
}

export interface BubbleStyle<T extends 'sent' | 'received'> {
  backgroundColor: BackgroundColorInterface[T]
  textColor: {
    normal: string
    blinded?: string
  }
  link?: {
    color?: string
    underline?: boolean
  }
}

export interface ChatBubbleStyle {
  sent: BubbleStyle<'sent'>
  received: BubbleStyle<'received'>
}
