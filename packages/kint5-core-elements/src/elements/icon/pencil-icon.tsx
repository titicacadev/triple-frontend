import { SVGProps } from 'react'

export function PencilIcon({
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
        id="mask0_14_1066"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="24"
        css={{ maskType: 'alpha' }}
      >
        <rect width="24" height="24" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_14_1066)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M18.7335 5.26653C18.2845 4.81754 17.5565 4.81754 17.1076 5.26653L16.793 5.58105L18.4189 7.20696L18.7335 6.89244C19.1824 6.44345 19.1824 5.71551 18.7335 5.26653ZM17.0544 8.57154L15.4284 6.94563L4.9298 17.4443V19.0702H6.55571L17.0544 8.57154ZM15.743 3.90195C16.9456 2.69933 18.8954 2.69933 20.098 3.90195C21.3007 5.10457 21.3007 7.0544 20.098 8.25701L7.69524 20.6598C7.47743 20.8776 7.18202 21 6.87398 21H4.44735C3.648 21 3 20.352 3 19.5526V17.126C3 16.818 3.12237 16.5226 3.34017 16.3047L3.34018 16.3047L15.743 3.90195Z"
          fill={color}
        />
      </g>
    </svg>
  )
}
