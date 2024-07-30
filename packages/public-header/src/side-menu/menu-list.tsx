import styled, { css } from 'styled-components'
import { Container, Text } from '@titicaca/core-elements'
import { useState } from 'react'

import type { MenuItem, LinkMenuItem, AccordionMenuItem } from './type'

const MenuListContainer = styled.ul`
  padding-bottom: 12px;
`

const menuItemCss = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 20px;
  padding: 20px 0;
  border-top: 1px solid var(--color-gray50);
`

const LinkMenuItemBase = styled.a`
  ${menuItemCss}
`

const AccordionMenuItemContainer = styled(Container)<{ open: boolean }>`
  display: grid;
  grid-template-rows: ${({ open }) =>
    open ? 'max-content 1fr' : 'max-content 0fr'};
  transition: grid-template-rows 300ms ease;
`

const AccordionMenuItemBase = styled(Container)<{ open: boolean }>`
  ${menuItemCss}
  cursor: pointer;

  & > img {
    width: 8px;
    height: 16px;
    transform: rotate(270deg);

    ${({ open }) =>
      open &&
      css`
        transform: rotate(90deg);
      `};
  }
`

const AccordionSubItemContainer = styled(Container)`
  background: var(--color-gray20);
  overflow: hidden;
`

const AccordionSubItem = styled.a`
  display: block;
  padding: 16px 28px;
  font-size: 15px;
  cursor: pointer;

  &:first-child {
    margin-top: 8px;
  }

  &:last-child {
    margin-bottom: 8px;
  }
`

const Tooltip = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 32px;
  padding: 0 12px;
  border-radius: 16px;
  background-color: var(--color-blue);
  color: var(--color-white);
  font-size: 13px;
  font-weight: 700;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: -5px;
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
    border-right: 8px solid var(--color-blue);
    transform: translateY(-50%);
  }
`

interface MenuListProps {
  menus: MenuItem[]
}

export function MenuList({ menus }: MenuListProps) {
  return (
    <MenuListContainer>
      {menus.map((menu) => {
        return (
          <li key={menu.label}>
            {menu.type === 'link' ? (
              <LinkMenuItem {...menu} />
            ) : (
              <AccordionMenuItem {...menu} />
            )}
          </li>
        )
      })}
    </MenuListContainer>
  )
}

function LinkMenuItem({
  label,
  href,
  onClick,
  tooltipDescription,
}: LinkMenuItem) {
  return (
    <LinkMenuItemBase href={href} onClick={onClick}>
      <Container css={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <Text color="gray" size={15} bold>
          {label}
        </Text>

        {tooltipDescription ? <Tooltip>{tooltipDescription}</Tooltip> : null}
      </Container>
    </LinkMenuItemBase>
  )
}

function AccordionMenuItem({
  label,
  onClick,
  subItems,
  defaultOpen = true,
}: AccordionMenuItem) {
  const [open, setOpen] = useState<boolean>(defaultOpen)

  const onMenuClick = () => {
    setOpen((open) => !open)
    onClick?.()
  }

  return (
    <AccordionMenuItemContainer open={open}>
      <AccordionMenuItemBase onClick={onMenuClick} open={open}>
        <Container css={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Text color="gray" size={15} bold>
            {label}
          </Text>
        </Container>
        <img
          src="https://assets.triple.guide/images/ico_arrow_right_16@4x.png"
          alt="arrow icon"
        />
      </AccordionMenuItemBase>

      <AccordionSubItemContainer>
        {subItems.map(
          ({
            label: subItemLabel,
            href: subItemHref,
            onClick: onSubItemClick,
          }) => (
            <AccordionSubItem
              key={subItemLabel}
              href={subItemHref}
              onClick={onSubItemClick}
            >
              {subItemLabel}
            </AccordionSubItem>
          ),
        )}
      </AccordionSubItemContainer>
    </AccordionMenuItemContainer>
  )
}
