import { BaseIconProps } from './type'

export function CloseIcon({
  width = 24,
  height = 24,
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
        id="mask0_5229_1246"
        maskUnits="userSpaceOnUse"
        x="0"
        y="-1"
        width="24"
        height="25"
        css={{ maskType: 'alpha' }}
      >
        <rect y="-0.350098" width="24" height="24" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_5229_1246)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M20.4853 3.48528C20.8758 3.87581 20.8758 4.50897 20.4853 4.89949L13.4142 11.9706L20.4853 19.0416C20.8758 19.4322 20.8758 20.0653 20.4853 20.4558C20.0948 20.8464 19.4616 20.8464 19.0711 20.4558L12 13.3848L4.92893 20.4558C4.53841 20.8464 3.90524 20.8464 3.51472 20.4558C3.12419 20.0653 3.12419 19.4322 3.51472 19.0416L10.5858 11.9706L3.51472 4.89949C3.1242 4.50897 3.12419 3.87581 3.51472 3.48528C3.90524 3.09476 4.53841 3.09476 4.92893 3.48528L12 10.5563L19.0711 3.48528C19.4616 3.09476 20.0948 3.09476 20.4853 3.48528Z"
          fill={color}
        />
      </g>
    </svg>
  )
}
