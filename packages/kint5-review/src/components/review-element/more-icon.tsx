import { SVGProps } from 'react'

export function MoreIcon({ color, ...props }: SVGProps<SVGSVGElement>) {
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
        id="mask0_4324_37216"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="24"
        css={{ maskType: 'alpha' }}
      >
        <rect width="24" height="24" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_4324_37216)">
        <path
          d="M13.5 12C13.5 12.8284 12.8284 13.5 12 13.5C11.1716 13.5 10.5 12.8284 10.5 12C10.5 11.1716 11.1716 10.5 12 10.5C12.8284 10.5 13.5 11.1716 13.5 12Z"
          fill={color}
        />
        <path
          d="M7.5 12C7.5 12.8284 6.82843 13.5 6 13.5C5.17157 13.5 4.5 12.8284 4.5 12C4.5 11.1716 5.17157 10.5 6 10.5C6.82843 10.5 7.5 11.1716 7.5 12Z"
          fill={color}
        />
        <path
          d="M19.5022 12C19.5022 12.8284 18.8306 13.5 18.0022 13.5C17.1738 13.5 16.5022 12.8284 16.5022 12C16.5022 11.1716 17.1738 10.5 18.0022 10.5C18.8306 10.5 19.5022 11.1716 19.5022 12Z"
          fill={color}
        />
      </g>
    </svg>
  )
}
