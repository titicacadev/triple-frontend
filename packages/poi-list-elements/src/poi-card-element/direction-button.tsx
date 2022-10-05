import styled from 'styled-components'

export const DIRECTION_BUTTON_WIDTH = 40

const IconWrapper = styled.div`
  > svg {
    vertical-align: middle;
  }
`

function DirectionButton({ onClick }: { onClick: () => void }) {
  return (
    <IconWrapper
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={DIRECTION_BUTTON_WIDTH}
        height="40"
        viewBox="0 0 40 40"
      >
        <g fill="none" fillRule="evenodd">
          <rect
            width="39.5"
            height="39.5"
            x=".25"
            y=".25"
            stroke="#222"
            strokeOpacity=".1"
            strokeWidth=".5"
            rx="19.75"
          />
          <path
            fill="#368FFF"
            d="M16.731 8.269L21.346 12.308 16.731 16.346z"
            transform="rotate(-90 19.038 12.308)"
          />
          <path fill="#368FFF" d="M25.385 15.769L30 19.808 25.385 23.846z" />
          <path
            stroke="#368FFF"
            strokeLinejoin="round"
            strokeWidth="2.4"
            d="M18.923 27.885v-4.039c0-2.23 1.802-4.038 4.035-4.038h5.196"
          />
          <path
            stroke="#368FFF"
            strokeLinecap="square"
            strokeWidth="2.4"
            d="M18.891 15.192L18.891 26.731"
          />
        </g>
      </svg>
    </IconWrapper>
  )
}

export default DirectionButton
