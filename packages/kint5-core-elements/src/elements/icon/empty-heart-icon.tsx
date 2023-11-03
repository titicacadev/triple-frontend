interface EmptyHeartIconProps {
  width?: number
  height?: number
  color?: string
}

export function EmptyHeartIcon({
  width = 24,
  height = 24,
  color = '#000',
}: EmptyHeartIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
    >
      <mask
        id="mask0_1364_4523"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="24"
        css={{ maskType: 'alpha' }}
      >
        <rect width="24" height="24" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_1364_4523)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.9999 4.88711C11.5562 4.40352 10.9929 3.90485 10.3286 3.5058C9.31517 2.89706 8.01385 2.4925 6.55331 2.81159C4.15333 3.33594 2.84512 4.66592 2.19631 6.07494C1.57386 7.42671 1.59393 8.76564 1.65203 9.35938L1.6543 9.38264L1.65766 9.40576C1.87357 10.892 2.44163 13.1833 4.89324 15.6163C7.59713 18.2997 9.19026 19.4021 11.31 20.8044C11.7281 21.081 12.2717 21.081 12.6898 20.8044C14.8095 19.4021 16.4028 18.2997 19.1067 15.6163C21.5584 13.1833 22.1264 10.892 22.3423 9.40576L22.3457 9.38264L22.348 9.35938C22.4061 8.76564 22.4261 7.42671 21.8037 6.07494C21.1549 4.66592 19.8467 3.33594 17.4467 2.81159C15.9861 2.4925 14.6848 2.89706 13.6713 3.50579C13.007 3.90484 12.4437 4.40351 11.9999 4.88711ZM9.29872 5.22027C8.59251 4.79605 7.81163 4.58385 6.9802 4.7655C5.20481 5.15339 4.40446 6.06126 4.01297 6.91146C3.60253 7.80281 3.60284 8.72717 3.64045 9.14259C3.81622 10.3367 4.25758 12.1677 6.30206 14.1967C8.70608 16.5825 10.154 17.632 11.9999 18.8619C13.8459 17.6319 15.2939 16.5825 17.6979 14.1967C19.7424 12.1677 20.1838 10.3367 20.3595 9.14258C20.3972 8.72715 20.3975 7.8028 19.987 6.91146C19.5955 6.06126 18.7952 5.15339 17.0198 4.7655C16.1884 4.58385 15.4074 4.79605 14.7012 5.22028C13.9847 5.65065 13.4003 6.27003 13.0373 6.77207C12.5287 7.47543 11.4711 7.47544 10.9625 6.77205C10.5995 6.27 10.0152 5.65063 9.29872 5.22027Z"
          fill={color}
        />
      </g>
    </svg>
  )
}
