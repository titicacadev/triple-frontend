import { MouseEventHandler, ReactNode } from 'react'
import { CSSObject } from 'styled-components'

import { Button } from '../button'
import { Container } from '../container'
import { FlexBox } from '../flex-box'
import { CloseIcon, LeftArrowIcon } from '../icon'

interface NavbarProps {
  leftButtonIconType?: 'back' | 'close'
  centerContent?: ReactNode
  rightContent?: ReactNode
  containerCss?: CSSObject
  onLeftButtonClick?: MouseEventHandler<HTMLButtonElement>
}

export function Navbar({
  leftButtonIconType = 'back',
  centerContent,
  rightContent,
  containerCss,
  onLeftButtonClick,
}: NavbarProps) {
  return (
    <FlexBox
      flex
      alignItems="center"
      justifyContent="center"
      css={{
        position: 'sticky',
        top: 0,
        left: 0,
        right: 0,
        height: 44,
        padding: '0 16px',
        backgroundColor: 'var(--color-kint5-gray0)',
        ...containerCss,
      }}
    >
      <Button
        onClick={onLeftButtonClick}
        css={{
          background: 'none',
          margin: 0,
          padding: 0,
          position: 'absolute',
          top: '50%',
          left: 16,
          transform: 'translateY(-50%)',
        }}
      >
        {leftButtonIconType === 'back' ? <LeftArrowIcon /> : <CloseIcon />}
      </Button>
      {centerContent}
      {rightContent ? (
        <Container
          css={{
            position: 'absolute',
            top: '50%',
            right: 16,
            transform: 'translateY(-50%)',
          }}
        >
          {rightContent}
        </Container>
      ) : null}
    </FlexBox>
  )
}
