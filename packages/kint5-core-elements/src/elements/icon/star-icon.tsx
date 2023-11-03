interface StarIconProps {
  width?: number
  height?: number
  color?: string
}

export function StarIcon({
  width = 12,
  height = 12,
  color = '#FFF',
}: StarIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 12 12"
      fill="none"
    >
      <path
        d="M5.33742 1.46135C5.58255 0.846218 6.41745 0.846215 6.66258 1.46135L7.68497 4.02694L10.3387 4.24899C10.975 4.30223 11.233 5.13099 10.7482 5.5644L8.72634 7.37208L9.34406 10.0749C9.49217 10.7229 8.81672 11.2351 8.27198 10.8879L6 9.43949L3.72802 10.8879C3.18329 11.2351 2.50783 10.7229 2.65594 10.0749L3.27366 7.37208L1.25178 5.5644C0.767009 5.13099 1.02501 4.30223 1.66128 4.24899L4.31503 4.02694L5.33742 1.46135Z"
        fill={color}
      />
    </svg>
  )
}
