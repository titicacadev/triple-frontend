import { PropsWithChildren } from 'react'
import styled from 'styled-components'
import { CheckIconBold, Container, Text } from '@titicaca/kint5-core-elements'

import { useActionSheet } from './action-sheet-context'

export const ActionItemContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 22.5px 0;
`

export interface ActionSheetItemProps extends PropsWithChildren {
  icon?: string
  checked?: boolean
  onClick?: () => unknown
}

export const ActionSheetItem = ({
  children,
  checked,
  onClick,
  ...props
}: ActionSheetItemProps) => {
  const { onClose } = useActionSheet()

  const handleClick = () => {
    onClick ? !onClick() && onClose?.() : onClose?.()
  }

  return (
    <ActionItemContainer onClick={handleClick} {...props}>
      <Text
        css={{
          flex: 1,
          fontWeight: 500,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {children}
      </Text>
      <Container
        css={{
          position: 'relative',
          width: 24,
          height: 24,
          border: '1px solid var(--color-kint5-gray30)',
          borderRadius: '50%',
          backgroundColor: checked
            ? 'var(--color-kint5-gray100)'
            : 'var(--color-kint5-gray0)',
        }}
      >
        {checked ? (
          <Container
            css={{
              position: 'absolute',
              top: 0,
              left: 5,
            }}
          >
            <CheckIconBold width={12} height={12} color="#FFF" />
          </Container>
        ) : null}
      </Container>
    </ActionItemContainer>
  )
}
