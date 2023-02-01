import { SyntheticEvent } from 'react'

export const silenceEvent = (e?: SyntheticEvent) => {
  if (e) {
    e.preventDefault()
    e.stopPropagation()
    e.nativeEvent && e.nativeEvent.stopImmediatePropagation()
  }
}
