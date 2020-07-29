export type ActionButtonElement = React.ReactNode

export interface POIListElementBaseProps<T> {
  poi: T
  onClick?: React.MouseEventHandler<HTMLLIElement>
}
