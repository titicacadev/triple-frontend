import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'

export function disableScroll(selector: string) {
  disableBodyScroll(document.querySelector(selector) as HTMLElement)
}

export function enableScroll(selector: string) {
  enableBodyScroll(document.querySelector(selector) as HTMLElement)
}
