import { BaseIconProps } from './type'

export function EmptyCheckboxIcon({
  width = 24,
  height = 24,
  color = '#747C86',
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
        id="mask0_4324_36973"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="24"
        css={{ maskType: 'alpha' }}
      >
        <rect width="24" height="24" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_4324_36973)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8 4H16C18.2091 4 20 5.79086 20 8V16C20 18.2091 18.2091 20 16 20H8C5.79086 20 4 18.2091 4 16V8C4 5.79086 5.79086 4 8 4ZM2 8C2 4.68629 4.68629 2 8 2H16C19.3137 2 22 4.68629 22 8V16C22 19.3137 19.3137 22 16 22H8C4.68629 22 2 19.3137 2 16V8ZM8.675 11.075L10.825 13.225L15.775 8.275C15.9583 8.09167 16.1917 8 16.475 8C16.7583 8 16.9917 8.09167 17.175 8.275C17.3583 8.45833 17.45 8.69167 17.45 8.975C17.45 9.25833 17.3583 9.49167 17.175 9.675L11.525 15.325C11.325 15.525 11.0917 15.625 10.825 15.625C10.5583 15.625 10.325 15.525 10.125 15.325L7.275 12.475C7.09167 12.2917 7 12.0583 7 11.775C7 11.4917 7.09167 11.2583 7.275 11.075C7.45833 10.8917 7.69167 10.8 7.975 10.8C8.25833 10.8 8.49167 10.8917 8.675 11.075Z"
          fill={color}
        />
      </g>
    </svg>
  )
}
