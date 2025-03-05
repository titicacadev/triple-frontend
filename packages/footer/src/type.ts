export interface FooterInfo {
  company: Company
  disclaimer: string
  links: Link[]
  extraLinks: Link[]
  awards: Award[]
}

export interface Company {
  name: string
  ceo: WithLabel<{ names: string[] }>
  businessRegistrationNumber: WithLabel<{ value: string }>
  salesReportNumber: WithLabel<{ value: string }>
  address: WithLabel<{ value: string }>
  contact: WithLabel<{ phone: string; email: string }>
}

export interface Link {
  label: string
  url: string
  faEventAction?: string
}

export interface Award {
  text: string
  alt: string
  imageUrl: string
}

type WithLabel<T> = T & { label: string }
