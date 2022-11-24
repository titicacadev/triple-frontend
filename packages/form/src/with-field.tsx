import { useState, ComponentType, FC } from 'react'
import styled, { css } from 'styled-components'
import { Container, Text } from '@titicaca/core-elements'

const Label = styled(Text)<{
  focused?: boolean
  error?: boolean
  absolute?: boolean
}>`
  font-size: 13px;

  ${({ focused }) =>
    focused &&
    css`
      color: var(--color-blue);
    `}

  ${({ error }) =>
    error &&
    css`
      color: var(--color-red);
    `}

  ${({ absolute }) =>
    absolute &&
    css`
      position: absolute;
      top: 6px;
    `}
`

export default function withField<T>(WrappedComponent: ComponentType<T>) {
  const WrapperComponent: FC<
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
          <Container
            position="relative"
            css={{
              padding: '6px 0 0',
            }}
          >
            <Label absolute={!help} error>
              {error}
            </Label>
          </Container>
        ) : null}

        {!hasError && help ? (
          <Container
            position="relative"
            css={{
              padding: '6px 0 0',
            }}
          >
            <Label alpha={0.5}>{help}</Label>
          </Container>
        ) : null}
      </Container>
    )
  }
  return WrapperComponent
}
