export interface FooterInfo {
  companyTexts: Array<FooterText[]>
  disclaimer: string
  links: FooterLink[]
  extraLinks: FooterLink[]
  awards: FooterAward[]
  familySites?: FooterLink[]
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
