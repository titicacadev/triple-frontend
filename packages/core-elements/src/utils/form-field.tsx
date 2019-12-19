import React, { useState } from 'react'
import Container from '../elements/container'
import Text from '../elements/text'
import styled, { css } from 'styled-components'
import { GetGlobalColor } from '../commons'

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
      color: rgb(${GetGlobalColor('blue')});
    `};

  ${({ error }) =>
    error &&
    css`
      color: rgb(${GetGlobalColor('red')});
    `};

  ${({ absolute }) =>
    absolute &&
    css`
      position: absolute;
      top: 6px;
    `};
`

export function withField<T>(WrappedComponent: React.ComponentType<T>) {
  const WrapperComponent: React.FC<
    {
      label?: string
      error?: string
      help?: string
    } & T
  > = ({ label, error, help, ...props }) => {
    const [focused, setFocused] = useState(false)
    const hasError = !!error

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
        {hasError ? (
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
