import { PropsWithChildren } from 'react'
import { Navbar } from '@titicaca/core-elements'

export enum NavbarItemType {
  BACK = 'back',
  MORE = 'more',
}

interface NavbarItem {
  type: NavbarItemType
  onClick: () => void
}

interface ChatNavbarUIProps {
  title: JSX.Element
  items?: NavbarItem[]
}

export function ChatNavbarUI({
  title,
  items,
  children,
  ...props
}: PropsWithChildren<ChatNavbarUIProps>) {
  return (
    <Navbar position="fixed" renderTitle={() => title} {...props}>
      {items
        ? items.map(({ type, ...props }) => {
            switch (type) {
              case NavbarItemType.BACK:
                return (
                  <Navbar.Item
                    key={NavbarItemType.BACK}
                    floated="left"
                    icon="back"
                    {...props}
                  />
                )
              case NavbarItemType.MORE:
                return (
                  <Navbar.Item
                    key={NavbarItemType.MORE}
                    floated="right"
                    icon="more"
                    {...props}
                  />
                )
              default:
                return null
            }
          })
        : null}
      {children}
    </Navbar>
  )
}
