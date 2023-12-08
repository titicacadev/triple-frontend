import { BaseIconProps } from './type'

export function CaretDownIcon({
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
        id="mask0_14_1094"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="24"
        css={{ maskType: 'alpha' }}
      >
        <rect width="24" height="24" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_14_1094)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.27748 7.28456C3.64745 6.90515 4.24729 6.90515 4.61726 7.28456L12 14.8557L19.3827 7.28456C19.7527 6.90515 20.3526 6.90515 20.7225 7.28456C21.0925 7.66397 21.0925 8.27912 20.7225 8.65853L13.0048 16.5732C12.4499 17.1423 11.5501 17.1423 10.9952 16.5732L3.27748 8.65853C2.90751 8.27912 2.90751 7.66397 3.27748 7.28456Z"
          fill={color}
        />
      </g>
    </svg>
  )
}
