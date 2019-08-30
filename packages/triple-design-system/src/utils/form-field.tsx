import * as React from 'react'
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

export function withField(WrappedComponent) {
  return class Wrapper extends React.PureComponent<{
    label?: string
    error?: string
    help?: string
  }> {
    state = {
      focus: false,
    }

    render() {
      const {
        state: { focus },
        props: { label, error, help, ...props },
      } = this

      return (
        <Container
          onFocus={() => this.setState({ focus: true })}
          onBlur={() => this.setState({ focus: false })}
        >
          {label && (
            <Label focus={focus} error={!!error} margin={{ bottom: 6 }}>
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
  }
}
