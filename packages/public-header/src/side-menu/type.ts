interface MenuItemBase {
  label: string
  onClick?: () => void
  eventAction?: string
  tooltipDescription?: string
}

export type LinkMenuItem = MenuItemBase & {
  type: 'link'
  href: string
}

export type AccordionMenuItem = MenuItemBase & {
  type: 'accordion'
  subItems: LinkMenuItem[]
  defaultOpen?: boolean
}

export type MenuItem = LinkMenuItem | AccordionMenuItem
