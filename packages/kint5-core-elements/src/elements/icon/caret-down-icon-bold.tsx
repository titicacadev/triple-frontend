import { SVGProps } from 'react'

export function CaretDownIconBold({
  color = '#000',
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <mask
        id="mask0_178_81"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="24"
        css={{ maskType: 'alpha' }}
      >
        <rect width="24" height="24" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_178_81)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2.55789 7.52418C3.30175 6.82527 4.50778 6.82527 5.25163 7.52418L12 13.8647L18.7484 7.52418C19.4922 6.82527 20.6983 6.82527 21.4421 7.52418C22.186 8.22308 22.186 9.35622 21.4421 10.0551L13.6836 17.3448C12.7538 18.2184 11.2462 18.2184 10.3164 17.3448L2.55789 10.0551C1.81404 9.35623 1.81404 8.22308 2.55789 7.52418Z"
          fill={color}
        />
      </g>
    </svg>
  )
}
