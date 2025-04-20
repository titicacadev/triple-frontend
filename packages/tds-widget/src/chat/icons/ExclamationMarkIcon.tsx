import { styled, CSSProp } from 'styled-components'

const Path = styled.path<{ stroke?: CSSProp; fill?: CSSProp }>`
  stroke: ${({ stroke }) => stroke};
  fill: ${({ fill }) => fill};
`

export default function ExclamationMarkIcon({
  color = '#3A3A3A',
}: {
  color?: CSSProp
}) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flex: '0 0 16px' }}
    >
      <Path
        d="M7.99995 14.3C11.4793 14.3 14.3 11.4794 14.3 8.00001C14.3 4.52062 11.4793 1.70001 7.99995 1.70001C4.52056 1.70001 1.69995 4.52062 1.69995 8.00001C1.69995 11.4794 4.52056 14.3 7.99995 14.3Z"
        stroke={color}
        strokeWidth="1.2"
      />
      <Path
        d="M7.38477 9.03192L7.26758 4.35419H8.73242L8.61523 9.03192H7.38477ZM8 11.4587C7.55566 11.4587 7.2041 11.1218 7.2041 10.6921C7.2041 10.2624 7.55566 9.92548 8 9.92548C8.44434 9.92548 8.7959 10.2624 8.7959 10.6921C8.7959 11.1218 8.44434 11.4587 8 11.4587Z"
        fill={color}
      />
    </svg>
  )
}
