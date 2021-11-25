import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { getColor } from '@titicaca/color-palette'

import Container from '../elements/container'
import Text from '../elements/text'

const MessageContainer = styled(Container)`
  position: relative;
`

// eslint-disable-next-line no-unexpected-multiline
const Label = styled(Text)<{
  focused?: boolean
  error?: boolean
  absolute?: boolean
}>`
  font-size: 13px;

  ${({ focused }) =>
    focused &&
    css`
      color: rgba(${getColor('blue')});
    `}

  ${({ error }) =>
    error &&
    css`
      color: rgba(${getColor('red')});
    `}

  ${({ absolute }) =>
    absolute &&
    css`
      position: absolute;
      top: 6px;
    `}
`

export function withField<T>(WrappedComponent: React.ComponentType<T>) {
  const WrapperComponent: React.FC<
    {
      label?: string
      error?: string | boolean
      help?: string
    } & T
  > = ({ label, error, help, ...props }) => {
    const [focused, setFocused] = useState(false)
    const isStringErrorType = typeof error === 'string'
    const hasError = isStringErrorType ? !!error : error

    return (
      <Container
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      >
        {label && (
          <Label focused={focused} error={hasError} margin={{ bottom: 6 }}>
            {label}
          </Label>
        )}
        <WrappedComponent
          focused={focused ? 'true' : undefined}
          error={hasError ? 'true' : undefined}
          {...(props as T)}
        />
        {isStringErrorType && hasError ? (
          <MessageContainer padding={{ top: 6 }}>
            <Label absolute={!help} error={true}>
              {error}
            </Label>
          </MessageContainer>
        ) : help ? (
          <MessageContainer padding={{ top: 6 }}>
            <Label alpha={0.5}>{help}</Label>
          </MessageContainer>
        ) : null}
      </Container>
    )
  }
  return WrapperComponent
}
