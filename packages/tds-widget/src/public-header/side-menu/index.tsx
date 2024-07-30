import { Navbar } from '@titicaca/tds-ui'
import { useSessionAvailability } from '@titicaca/triple-web'

import { SideMenuOverlay } from './overlay'
import { MenuList } from './menu-list'
import { AuthButton } from './auth-button'
import { Profile } from './profile'
import { MenuItem } from './type'

export function SideMenu({
  open,
  onClose,
  menus,
  ...props
}: {
  open: boolean
  onClose: () => void
  menus: MenuItem[]
}) {
  const sessionAvailable = useSessionAvailability()

  return (
    <SideMenuOverlay open={open} onClose={onClose} {...props}>
      <Navbar borderless>
        <Navbar.Item floated="left" icon="close" onClick={onClose} />
      </Navbar>

      <Profile />
      <MenuList menus={menus} />

      {sessionAvailable ? <AuthButton /> : null}
    </SideMenuOverlay>
  )
}
