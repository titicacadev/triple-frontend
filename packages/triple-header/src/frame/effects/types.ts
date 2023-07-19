type RepeatType = 'loop' | 'reverse' | 'mirror'

export interface InitialEffectOptions {
  infinity?: boolean
  repeatType?: RepeatType
  index?: number
  totalFramesCount?: number
}
