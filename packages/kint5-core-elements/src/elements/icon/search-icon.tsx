import { BaseIconProps } from './type'

export function SearchIcon({
  width = 16,
  height = 16,
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
        id="mask0_4655_5184"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="24"
        css={{ maskType: 'alpha' }}
      >
        <rect width="24" height="24" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_4655_5184)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.0519 4.07792C6.75258 4.07792 4.07792 6.75258 4.07792 10.0519C4.07792 13.3513 6.75258 16.026 10.0519 16.026C13.3513 16.026 16.026 13.3513 16.026 10.0519C16.026 6.75258 13.3513 4.07792 10.0519 4.07792ZM2 10.0519C2 5.60498 5.60498 2 10.0519 2C14.4989 2 18.1039 5.60498 18.1039 10.0519C18.1039 14.4989 14.4989 18.1039 10.0519 18.1039C5.60498 18.1039 2 14.4989 2 10.0519Z"
          fill={color}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14.4472 14.4472C14.8529 14.0414 15.5107 14.0414 15.9165 14.4472L21.6957 20.2264C22.1014 20.6321 22.1014 21.29 21.6957 21.6957C21.29 22.1014 20.6321 22.1014 20.2264 21.6957L14.4472 15.9165C14.0414 15.5107 14.0414 14.8529 14.4472 14.4472Z"
          fill={color}
        />
      </g>
    </svg>
  )
}
