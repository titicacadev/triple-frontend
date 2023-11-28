import { BaseIconProps } from './type'

export function FilledLocationIcon({
  width = 12,
  height = 12,
  color = '#B6BBC1',
}: BaseIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 12 12"
      fill="none"
    >
      <path
        d="M6 0C3.51487 0 1.5 2.01487 1.5 4.5C1.5 5.47856 1.82081 6.3765 2.35406 7.11188C2.36363 7.1295 2.36513 7.14919 2.376 7.16606L5.376 11.6661C5.51513 11.8748 5.7495 12 6 12C6.2505 12 6.48487 11.8748 6.624 11.6661L9.624 7.16606C9.63506 7.14919 9.63637 7.1295 9.64594 7.11188C10.1792 6.3765 10.5 5.47856 10.5 4.5C10.5 2.01487 8.48513 0 6 0ZM6 6C5.17162 6 4.5 5.32837 4.5 4.5C4.5 3.67162 5.17162 3 6 3C6.82837 3 7.5 3.67162 7.5 4.5C7.5 5.32837 6.82837 6 6 6Z"
        fill={color}
      />
    </svg>
  )
}
