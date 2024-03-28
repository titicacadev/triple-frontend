import { SVGProps } from 'react'

export function CheckIcon({ color, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <mask
        id="mask0_14_1051"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="24"
        css={{ maskType: 'alpha' }}
      >
        <rect width="24" height="24" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_14_1051)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M21.7006 5.30546C22.0998 5.71271 22.0998 6.37298 21.7006 6.78023L10.1696 18.5419C9.57068 19.1527 8.59969 19.1527 8.0008 18.5419L2.29944 12.7265C1.90019 12.3192 1.90019 11.659 2.29944 11.2517C2.6987 10.8445 3.34603 10.8445 3.74529 11.2517L9.08518 16.6984L20.2547 5.30546C20.654 4.89822 21.3013 4.89822 21.7006 5.30546Z"
          fill={color}
        />
      </g>
    </svg>
  )
}
