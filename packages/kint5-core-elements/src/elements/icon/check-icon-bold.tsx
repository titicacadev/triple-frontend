import { SVGProps } from 'react'

export function CheckIconBold({
  color = '#000',
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <mask
        id="mask0_121_29"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="24"
        css={{ maskType: 'alpha' }}
      >
        <rect width="24" height="24" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_121_29)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M21.4567 5.53166C22.1811 6.24055 22.1811 7.38988 21.4567 8.09876L10.9952 18.3354C10.0896 19.2215 8.62144 19.2215 7.71588 18.3354L2.54334 13.274C1.81889 12.5651 1.81889 11.4158 2.54334 10.7069C3.26779 9.99805 4.44236 9.99805 5.16681 10.7069L9.35554 14.8057L18.8332 5.53166C19.5576 4.82278 20.7322 4.82278 21.4567 5.53166Z"
          fill={color}
        />
      </g>
    </svg>
  )
}
