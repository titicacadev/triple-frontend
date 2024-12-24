import { CSSProperties } from 'react'

export function ArrowRight({
  color = '#3A3A3A',
  style,
}: {
  color?: string
  style?: CSSProperties
}) {
  return (
    <svg
      width="6"
      height="10"
      viewBox="0 0 6 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      <path
        d="M1.04674 1L5 4.97649L1 9"
        stroke={color}
        strokeOpacity="1"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
