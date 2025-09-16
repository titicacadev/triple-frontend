import { FooterButton } from '../../utils/type'

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
              return <LinkButton {...button} key={button.key} />
            case 'dropdown':
              return <Dropdown {...button} key={button.key} />
            default:
              return null
          }
        })}
    </ButtonContainer>
  )
}
