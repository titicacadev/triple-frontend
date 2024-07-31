import { ReactElement } from 'react'

export type Category = 'air' | 'hotels' | 'tna'
export type DeeplinkComponent = ({
  deeplinkHref,
}: {
  deeplinkHref: string
}) => ReactElement
