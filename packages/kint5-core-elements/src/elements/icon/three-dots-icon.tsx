import { BaseIconProps } from './type'

export function ThreeDotsIcon({
  width = 24,
  height = 24,
  color = '#000',
}: BaseIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
    >
      <mask
        id="mask0_75_57"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="24"
        css={{ maskType: 'alpha' }}
      >
        <rect width="24" height="24" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_75_57)">
        <path
          d="M9.99999 12C9.99999 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 9.99999 13.1046 9.99999 12Z"
          fill={color}
        />
        <path
          d="M17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12Z"
          fill={color}
        />
        <path
          d="M2.99707 12C2.99707 10.8954 3.8925 10 4.99707 10C6.10164 10 6.99707 10.8954 6.99707 12C6.99707 13.1046 6.10164 14 4.99707 14C3.8925 14 2.99707 13.1046 2.99707 12Z"
          fill={color}
        />
      </g>
    </svg>
  )
}
