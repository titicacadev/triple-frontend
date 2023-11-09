import { BaseIconProps } from './type'

export function LeftArrowIcon({
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
        id="mask0_2392_23288"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="24"
        css={{ maskType: 'alpha' }}
      >
        <rect width="24" height="24" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_2392_23288)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.1915 3.20464C11.582 3.59516 11.582 4.22833 11.1915 4.61885L4.68533 11.125H21.7656C22.3179 11.125 22.7656 11.5727 22.7656 12.125C22.7656 12.6773 22.3179 13.125 21.7656 13.125H4.61185L10.868 19.3811C11.2585 19.7716 11.2585 20.4048 10.868 20.7953C10.4774 21.1858 9.84426 21.1858 9.45374 20.7953L2.23437 13.576C1.87261 13.2142 1.6784 12.7483 1.65176 12.2748C1.64443 12.2259 1.64062 12.1759 1.64062 12.125C1.64062 12.0489 1.64912 11.9748 1.66522 11.9036C1.71993 11.4809 1.90965 11.0723 2.23437 10.7475L9.77727 3.20464C10.1678 2.81411 10.801 2.81411 11.1915 3.20464Z"
          fill={color}
        />
      </g>
    </svg>
  )
}
