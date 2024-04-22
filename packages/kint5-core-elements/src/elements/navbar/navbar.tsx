import { MouseEventHandler, ReactNode } from 'react'

import { Button } from '../button'
import { Container } from '../container'
import { FlexBox } from '../flex-box'
import { CloseIcon, LeftArrowIcon } from '../icon'

interface NavbarProps {
  leftButtonIconType?: 'back' | 'close'
  centerContent?: ReactNode
  rightContent?: ReactNode
  disableLeftButton?: boolean
  onLeftButtonClick?: MouseEventHandler<HTMLButtonElement>
}

export const NAVBAR_HEIGHT_PX = 44

export function Navbar({
  leftButtonIconType = 'back',
  centerContent,
  rightContent,
  onLeftButtonClick,
  ...props
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
        height: NAVBAR_HEIGHT_PX,
        padding: '0 16px',
        backgroundColor: 'var(--color-kint5-gray0)',
        // 화면이 작은 아이폰에서 상단 간격이 미세하게 어긋나 빈 틈이 보이는 경우가 있어 이를 메꿉니다.
        '::before': {
          content: '""',
          position: 'absolute',
          top: -1,
          width: '100%',
          height: 1,
          backgroundColor: 'var(--color-kint5-gray0)',
        },
      }}
      {...props}
    >
      {onLeftButtonClick ? (
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
      ) : null}
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
