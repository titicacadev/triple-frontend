import { css, ThemedStyledProps } from 'styled-components'

import { BaseSizes } from '../commons'

const ShadowMap: { [key in BaseSizes]: string } = {
  small: '0 0 10px 0 rgba(0, 0, 0, 0.07)',
  medium: '0 0 20px 0 rgba(0, 0, 0, 0.07)',
  large: '0 0 30px 0 rgba(0, 0, 0, 0.1)',
}

/**
 * Usage
 *
 * import { shadowMixin } from '../mixins/box'
 *
 * const ShadowComponent = styled.div`
 *  ${shadowMixin}
 * `
 *
 * <BoxShadowedComponent shadow="small | medium | large" />
 *
 * const ShadowContainer = styled(Container)`
 *   ${shadowMixin}
 * `
 *
 * <ShadowContainer shadow="small"></ShadowContainer>
 *
 */
export const shadowMixin = ({
  shadow,
}: ThemedStyledProps<{ shadow?: KeyOfShadowMap }, any>) =>
  shadow &&
  css`
    box-shadow: ${ShadowMap[shadow as KeyOfShadowMap]};
  `

export type KeyOfShadowMap = keyof typeof ShadowMap
export type ShadowMapType = { [key in KeyOfShadowMap]: string }
