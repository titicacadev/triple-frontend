import { FooterButton } from '../type'

import { BUTTON_LIST, ButtonContainer, LinkButton } from './button'
import { Dropdown } from './dropdown'

export function ButtonArea({ buttons }: { buttons: FooterButton[] }) {
  return (
    <ButtonContainer flex>
      {buttons
        .filter(({ hidden }) => !hidden)
        .map((button) => {
          switch (button.type) {
            case 'button':
              return BUTTON_LIST[button.key] || null
            case 'link':
              return <LinkButton {...button} />
            case 'dropdown':
              return <Dropdown {...button} />
            default:
              return null
          }
        })}
    </ButtonContainer>
  )
}
