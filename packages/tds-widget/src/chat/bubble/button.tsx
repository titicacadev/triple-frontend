import { css, styled } from 'styled-components'

import { useATagNavigator } from '../utils'

import Bubble from './bubble'
import { ButtonBubbleProp } from './type'
import { StyledText } from './item/text'

const ARROW_ICON = ` <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11" fill="none">
<path d="M3.375 9.16683L7.16667 5.37516L3.375 1.5835" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`

const getSVG = (svg: string) => {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

const Text = styled(StyledText)`
  text-decoration: none !important;

  &::after {
    content: '';
    color: inherit;
    background-color: currentcolor;
    display: inline-block;
    width: 10px;
    height: 10px;
    margin-left: 4px;
    mask-image: url(${getSVG(ARROW_ICON)});
    mask-size: contain;
    mask-repeat: no-repeat;
    mask-position: center;
  }
`

export function ButtonBubble({
  id,
  label,
  action,
  my,
  disabled,
  onClick,
  ...props
}: ButtonBubbleProp) {
  const aTagNavigator = useATagNavigator(
    'onLinkClick' in props ? props.onLinkClick : undefined,
  )

  return (
    <Bubble id={id} my={my} {...props}>
      <button
        css={css`
          color: ${my ? '#B5FFFB' : 'var(--color-blue)'};
        `}
        disabled={disabled}
        role="link"
        type="button"
        {...('param' in action && { 'data-link': action.param })}
        onClick={(e) => {
          if (action.type === 'link') {
            aTagNavigator(e)
          } else if ('onButtonClick' in props) {
            props.onButtonClick?.()
          }
          onClick?.(e, id)
        }}
      >
        <Text>{label}</Text>
      </button>
    </Bubble>
  )
}
