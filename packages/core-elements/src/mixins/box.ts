import { css } from 'styled-components'

import { BaseSizes } from '../commons'

const ShadowMap: { [key in BaseSizes]: string } = {
  small: '0 0 10px 0 rgba(0, 0, 0, 0.07)',
  medium: '0 0 20px 0 rgba(0, 0, 0, 0.07)',
  large: '0 0 30px 0 rgba(0, 0, 0, 0.1)',
}

/**
 * Usage
 *
 * import { boxShadow } from '../mixins/box'
 *
 * const ShadowComponent = styled.div`
 *  ${boxShadow}
 * `
 *
 * <BoxShadowedComponent shadow="small | medium | large" />
 *
 * const ShadowContainer = styled(Container)`
 *   ${boxShadow}
 * `
 *
 * <ShadowContainer shadow="small"></ShadowContainer>
 *
 */
export const boxShadow = ({ shadow: key }: any) => css`
  box-shadow: ${ShadowMap[key as KeyOfShadowMap]};
`

export type KeyOfShadowMap = keyof typeof ShadowMap
export type ShadowMapType = { [key in KeyOfShadowMap]: string }
