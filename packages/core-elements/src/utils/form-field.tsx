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
  focus?: boolean
  error?: boolean
  absolute?: boolean
}>`
  font-size: 13px;

  ${({ focus }) =>
    focus &&
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
  const WrapperComponent: React.FC<{
    label?: string
    error?: string
    help?: string
    props?: T
  }> = ({ label, error, help, props }) => {
    const [isFocus, setFocus] = useState(false)

    return (
      <Container onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}>
        {label && (
          <Label isFocus={isFocus} error={!!error} margin={{ bottom: 6 }}>
            {label}
          </Label>
        )}
        <WrappedComponent focus={focus} error={!!error} {...props} />
        {error ? (
          <MessageContainer padding={{ top: 6 }}>
            <Label absolute={!help} error={!!error}>
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
