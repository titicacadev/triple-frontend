import { MouseEventHandler, ReactNode } from 'react'
import { CSSObject } from 'styled-components'

import { Button } from '../button'
import { Container } from '../container'
import { FlexBox } from '../flex-box'

interface NavbarProps {
  centerContent?: ReactNode
  rightContent?: ReactNode
  containerCss?: CSSObject
  onBackButtonClick: MouseEventHandler<HTMLButtonElement>
}

export function Navbar({
  centerContent,
  rightContent,
  containerCss,
  onBackButtonClick,
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
        height: 52,
        padding: '0 16px',
        backgroundColor: 'var(--color-kint5-gray0)',
        ...containerCss,
      }}
    >
      <Button
        onClick={onBackButtonClick}
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
        <img
          src="https://assets.triple-dev.titicaca-corp.com/images/kint5-ic-arrow-2-line-24.svg"
          alt="Back"
          width={24}
          height={24}
          draggable={false}
        />
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
