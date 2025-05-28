import { css } from 'styled-components'

import { useATagNavigator } from '../utils'

import Bubble from './bubble'
import { ButtonBubbleProp } from './type'
import { TextItem } from './item'

const EXPORT_ICON = ` <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.00002 4.83337H3.00002C2.26364 4.83337 1.66669 5.43033 1.66669 6.16671V13.5C1.66669 14.2364 2.26364 14.8334 3.00002 14.8334H10.3334C11.0697 14.8334 11.6667 14.2364 11.6667 13.5V10.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 12.1666H13C13.7364 12.1666 14.3333 11.5697 14.3333 10.8333V3.49996C14.3333 2.76358 13.7364 2.16663 13 2.16663H5.66665C4.93027 2.16663 4.33331 2.76358 4.33331 3.49996V4.49996" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11.3333 5.16663L8 8.49996" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.66669 4.83337H11.6667V7.83337" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`

const getSVG = (svg: string) => {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

export function ButtonBubble({
  id,
  label,
  action,
  onLinkClick,
  my,
  ...props
}: ButtonBubbleProp) {
  const aTagNavigator = useATagNavigator(onLinkClick)

  return (
    <Bubble
      id={id}
      css={css`
        a {
          color: ${my ? '#B5FFFB' : 'var(--color-blue)'};
          text-decoration: underline;

          &::after {
            content: '';
            color: inherit;
            background-color: currentcolor;
            display: inline-block;
            width: 16px;
            height: 16px;
            margin-left: 4px;
            mask-image: url(${getSVG(EXPORT_ICON)});
            mask-size: contain;
            mask-repeat: no-repeat;
            mask-position: center;
            transform: translateY(2px);
          }
        }
      `}
      my={my}
      data-bubble-type="button"
      {...props}
    >
      <TextItem
        href={action.param}
        text={label}
        onClick={(e) => aTagNavigator(e)}
      />
    </Bubble>
  )
}
