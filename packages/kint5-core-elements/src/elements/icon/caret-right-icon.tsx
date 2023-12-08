import { BaseIconProps } from './type'

export function CaretRightIcon({
  width = 24,
  height = 24,
  color = '#000',
}: BaseIconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0_1116_437"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="24"
        css={{ maskType: 'alpha' }}
      >
        <rect
          y="24"
          width="24"
          height="24"
          transform="rotate(-90 0 24)"
          fill="#D9D9D9"
        />
      </mask>
      <g mask="url(#mask0_1116_437)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.28456 20.7225C6.90515 20.3526 6.90515 19.7527 7.28456 19.3827L14.8557 12L7.28456 4.61726C6.90515 4.24729 6.90515 3.64745 7.28456 3.27748C7.66397 2.90751 8.27912 2.90751 8.65853 3.27748L16.5732 10.9952C17.1423 11.5501 17.1423 12.4499 16.5732 13.0048L8.65853 20.7225C8.27912 21.0925 7.66397 21.0925 7.28456 20.7225Z"
          fill={color}
        />
      </g>
    </svg>
  )
}
