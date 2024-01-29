import { BaseIconProps } from './type'

export function CaretLeftIcon({
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
        id="mask0_1116_555"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="24"
        css={{ maskType: 'alpha' }}
      >
        <rect
          width="24"
          height="24"
          transform="matrix(1 0 0 -1 0 24)"
          fill="#D9D9D9"
        />
      </mask>
      <g mask="url(#mask0_1116_555)" transform="rotate(-90 12 12)">
        <path
          d="M3.5 16.25L11.6465 8.10355C11.8417 7.90829 12.1583 7.90829 12.3536 8.10355L20.5 16.25"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>
    </svg>
  )
}
