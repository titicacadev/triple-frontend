export interface FooterInfo {
  companyTexts: Array<FooterText[]>
  disclaimer: string
  links: FooterLink[]
  extraLinks: FooterLink[]
  awards: FooterAward[]
  buttons?: FooterButton[]
}

export interface FooterText {
  text: string
  url?: string
  faEventAction?: string
}

export interface FooterLink {
  label: string
  url: string
  faEventAction?: string
}

export interface FooterAward {
  text: string
  alt: string
  imageUrl: string
}

export interface FooterButtonBase {
  /**
   * 고유 key값
   * type이 button인 경우 선언된 버튼 컴포넌트를 참조하는데 사용됩니다.
   */
  key: string
  faEventAction?: string
  hidden?: boolean
}

export interface FooterDefaultButton extends FooterButtonBase {
  type: 'button'
}

export interface FooterLinkButton extends FooterButtonBase {
  type: 'link'
  label: string
  href: string
  iconSrc?: string
}

export interface FooterDropdownButton extends FooterButtonBase {
  type: 'dropdown'
  label: string
  options: FooterLink[]
}

export type FooterButton =
  | FooterDefaultButton
  | FooterLinkButton
  | FooterDropdownButton
