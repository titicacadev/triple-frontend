import { BaseIconProps } from './type'

export function EmptyHouseIcon({
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
        id="mask0_82_278"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="24"
        css={{ maskType: 'alpha' }}
      >
        <rect width="24" height="24" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_82_278)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.2804 4.95132C12.5387 4.33631 11.4613 4.33631 10.7196 4.95132L5.07945 9.62812C4.39547 10.1953 4 11.0354 4 11.9213V18.5149C4 19.0644 4.44772 19.5099 5 19.5099H7.5C8.05228 19.5099 8.5 19.0644 8.5 18.5149V16.0273C8.5 14.1039 10.067 12.5447 12 12.5447C13.933 12.5447 15.5 14.1039 15.5 16.0273V18.5149C15.5 19.0644 15.9477 19.5099 16.5 19.5099H19C19.5523 19.5099 20 19.0644 20 18.5149V11.9213C20 11.0354 19.6045 10.1953 18.9206 9.62812L13.2804 4.95132ZM12 14.5348C11.1716 14.5348 10.5 15.203 10.5 16.0273V18.5149C10.5 20.1635 9.15685 21.5 7.5 21.5H5C3.34315 21.5 2 20.1635 2 18.5149V11.9213C2 10.4448 2.65912 9.04456 3.79908 8.09931L9.43926 3.42251C10.9226 2.1925 13.0774 2.1925 14.5607 3.42251L20.2009 8.09931C21.3409 9.04456 22 10.4448 22 11.9213V18.5149C22 20.1635 20.6569 21.5 19 21.5H16.5C14.8431 21.5 13.5 20.1635 13.5 18.5149V16.0273C13.5 15.203 12.8284 14.5348 12 14.5348Z"
          fill={color}
        />
      </g>
    </svg>
  )
}