import { SVGProps } from 'react'

export function EllipsisIcon({
  color = '#000',
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="6"
      height="6"
      viewBox="0 0 6 6"
      fill="none"
      {...props}
    >
      <circle cx="3" cy="3" r="3" fill={color} />
    </svg>
  )
}
