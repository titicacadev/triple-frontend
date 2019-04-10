import React, { PureComponent } from 'react'
import Container from '../elements/container'
import Text from '../elements/text'
import styled, { css } from 'styled-components'

const COLORS = {
  blue: '54, 143, 255',
  red: '255, 33, 60',
}

const Label = styled(Text)`
  font-size: 13px;

  ${({ focus }) =>
    focus &&
    css`
      color: rgb(${COLORS.blue});
    `};

  ${({ error }) =>
    error &&
    css`
      color: rgb(${COLORS.red});
    `};

  ${({ absolute }) =>
    absolute &&
    css`
      position: absolute;
      bottom: 9px;
    `};
`

const FieldFrame = styled.div`
  position: relative;

  ${({ padding }) =>
    padding &&
    css`
      padding-top: ${padding.top}px;
      padding-right: ${padding.right}px;
      padding-bottom: ${padding.bottom}px;
      padding-left: ${padding.left}px;
    `};

  ${({ margin }) =>
    margin &&
    css`
      margin-top: ${margin.top}px;
      margin-right: ${margin.right}px;
      margin-bottom: ${margin.bottom}px;
      margin-left: ${margin.left}px;
    `};
`

export default function withField(WrappedComponent) {
  return class Wrapper extends PureComponent {
    state = {
      focus: false,
    }

    render() {
      const {
        state: { focus },
        props: { label, error, help, ...props },
      } = this

      return (
        <FieldFrame
          onFocus={() => this.setState({ focus: true })}
          onBlur={() => this.setState({ focus: false })}
        >
          {label ? (
            <>
              <Label
                focus={focus ? 'true' : undefined}
                error={error}
                margin={{ bottom: 6 }}
              >
                {label}
              </Label>
              <WrappedComponent
                focus={focus ? 'true' : undefined}
                error={error}
                {...props}
              />
              <Container padding={{ top: 6 }}>
                {error ? (
                  <Label error={error}>{error}</Label>
                ) : help ? (
                  <Label alpha={0.5}>{help}</Label>
                ) : null}
              </Container>
            </>
          ) : (
            <WrappedComponent
              focus={focus ? 'true' : undefined}
              error={error}
              {...props}
            />
          )}
        </FieldFrame>
      )
    }
  }
}
