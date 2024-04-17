import { SVGProps } from 'react'
import { FlexBox, Text } from '@titicaca/kint5-core-elements'
import { PoiType } from '@titicaca/content-type-definitions'

const BACKGROUND_COLOR_BY_TYPE = {
  attraction: '#1769FF',
  restaurant: '#FF6B00',
  hotel: '#1769FF',
  festa: '#EB147B',
}

export function ItineraryOrder({
  itineraryItemType,
  index,
}: {
  itineraryItemType: PoiType | 'festa' | null
  index: number
}) {
  return (
    <FlexBox flex css={{ position: 'relative' }}>
      <Text
        css={{
          position: 'absolute',
          top: 6,
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'var(--color-kint5-gray0)',
          fontSize: 12,
          fontWeight: 700,
        }}
      >
        {index + 1}
      </Text>
      <OrderBackground
        color={BACKGROUND_COLOR_BY_TYPE[itineraryItemType ?? 'attraction']}
      />
    </FlexBox>
  )
}

function OrderBackground({ color, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="35"
      viewBox="0 0 32 35"
      fill="none"
      {...props}
    >
      <g filter="url(#filter0_d_13323_36796)">
        <mask
          id="path-1-outside-1_13323_36796"
          maskUnits="userSpaceOnUse"
          x="3"
          y="2"
          width="26"
          height="31"
          fill="black"
        >
          <rect fill="white" x="3" y="2" width="26" height="31" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M18.0803 26.8203C23.7162 25.8353 28 20.9179 28 15C28 8.37258 22.6274 3 16 3C9.37259 3 4 8.37258 4 15C4 20.9179 8.28384 25.8353 13.9197 26.8203C14.6565 27.8418 15.3564 29.1973 15.6898 30.6679C15.7475 30.9224 15.8434 30.9856 16.0153 30.9976C16.181 30.9856 16.2525 30.9224 16.3102 30.6679C16.6436 29.1973 17.3435 27.8418 18.0803 26.8203Z"
          />
        </mask>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M18.0803 26.8203C23.7162 25.8353 28 20.9179 28 15C28 8.37258 22.6274 3 16 3C9.37259 3 4 8.37258 4 15C4 20.9179 8.28384 25.8353 13.9197 26.8203C14.6565 27.8418 15.3564 29.1973 15.6898 30.6679C15.7475 30.9224 15.8434 30.9856 16.0153 30.9976C16.181 30.9856 16.2525 30.9224 16.3102 30.6679C16.6436 29.1973 17.3435 27.8418 18.0803 26.8203Z"
          fill={color}
        />
        <path
          d="M16.0153 30.9976L16.0501 30.4988L16.0147 30.4963L15.9792 30.4989L16.0153 30.9976ZM15.9805 31.4964C16.021 31.4992 16.0602 31.5 16.0959 31.5V30.5C16.0744 30.5 16.0599 30.4995 16.0501 30.4988L15.9805 31.4964ZM15.9792 30.4989C15.9712 30.4995 15.9578 30.5 15.9362 30.5V31.5C15.9717 31.5 16.0109 31.4992 16.0514 31.4963L15.9792 30.4989ZM18.0803 26.8203L17.9081 25.8353L17.5073 25.9053L17.2693 26.2353L18.0803 26.8203ZM16 3V4V3ZM4 15H3H4ZM13.9197 26.8203L14.7307 26.2353L14.4927 25.9053L14.0919 25.8353L13.9197 26.8203ZM15.6898 30.6679L16.665 30.4469L15.6898 30.6679ZM16.0153 30.9976L15.9457 31.9952L16.0166 32.0001L16.0875 31.995L16.0153 30.9976ZM16.3102 30.6679L15.335 30.4469L16.3102 30.6679ZM27 15C27 20.4237 23.0736 24.9324 17.9081 25.8353L18.2525 27.8054C24.3587 26.7382 29 21.4121 29 15H27ZM16 4C22.0751 4 27 8.92487 27 15H29C29 7.8203 23.1797 2 16 2V4ZM5 15C5 8.92487 9.92487 4 16 4V2C8.8203 2 3 7.8203 3 15H5ZM14.0919 25.8353C8.92636 24.9324 5 20.4237 5 15H3C3 21.4121 7.64131 26.7382 13.7475 27.8054L14.0919 25.8353ZM16.665 30.4469C16.2964 28.8207 15.5301 27.3436 14.7307 26.2353L13.1087 27.4053C13.7829 28.3401 14.4164 29.5739 14.7145 30.889L16.665 30.4469ZM16.0849 30C16.0983 30.0009 16.3016 30.0151 16.4915 30.1922C16.6569 30.3463 16.6775 30.5019 16.665 30.4469L14.7145 30.889C14.7597 31.0885 14.8571 31.4029 15.1279 31.6552C15.4232 31.9305 15.7604 31.9822 15.9457 31.9952L16.0849 30ZM15.335 30.4469C15.3273 30.4808 15.3269 30.472 15.3397 30.4414C15.3532 30.4087 15.3909 30.3285 15.4721 30.2415C15.5608 30.1464 15.6672 30.0798 15.7722 30.0404C15.8642 30.0059 15.9328 30.0009 15.9431 30.0002L16.0875 31.995C16.2831 31.9808 16.6407 31.9207 16.9345 31.6059C17.1734 31.3497 17.2507 31.0423 17.2855 30.889L15.335 30.4469ZM17.2693 26.2353C16.4699 27.3436 15.7036 28.8207 15.335 30.4469L17.2855 30.889C17.5836 29.5739 18.2171 28.3401 18.8913 27.4053L17.2693 26.2353Z"
          fill="white"
          mask="url(#path-1-outside-1_13323_36796)"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_13323_36796"
          x="0"
          y="0"
          width="32"
          height="36.0001"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="1.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_13323_36796"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_13323_36796"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  )
}
