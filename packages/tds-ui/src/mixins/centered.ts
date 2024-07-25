import { css } from 'styled-components'

export interface CenteredMixinProps {
  centered?: boolean
}

export const centeredMixin = ({ centered }: CenteredMixinProps) =>
  centered
    ? css`
        margin-left: auto;
        margin-right: auto;
      `
    : undefined
