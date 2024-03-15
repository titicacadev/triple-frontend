import { PropsWithChildren } from 'react'
import styled from 'styled-components'
import { CheckIconBold, Container, Text } from '@titicaca/kint5-core-elements'

import { useActionSheet } from './action-sheet-context'

export const ActionItemContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 14px 0;
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
          border: `1px solid ${
            checked ? 'var(--color-kint5-gray100)' : 'var(--color-kint5-gray30)'
          }`,
          borderRadius: '50%',
          backgroundColor: checked
            ? 'var(--color-kint5-gray100)'
            : 'var(--color-kint5-gray0)',
        }}
      >
        {checked ? (
          <CheckIconBold
            color="#FFF"
            css={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 12,
              height: 12,
            }}
          />
        ) : null}
      </Container>
    </ActionItemContainer>
  )
}
