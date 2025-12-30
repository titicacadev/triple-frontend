import { BaseSizes } from '../commons'

const ShadowSizeMap: { [key in BaseSizes | 'none']: string } = {
  small: '0 0 10px 0 rgba(0, 0, 0, 0.07)',
  medium: '0 0 20px 0 rgba(0, 0, 0, 0.07)',
  large: '0 0 30px 0 rgba(0, 0, 0, 0.1)',
  none: '',
}

export interface ShadowMixinProps {
  shadow?: KeyOfShadowSize
  shadowValue?: string
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
export const shadowMixin = ({ shadow, shadowValue }: ShadowMixinProps = {}) => {
  const value = shadow ? ShadowSizeMap[shadow] : shadowValue

  return value ? `box-shadow: ${value};` : ''
}

export type KeyOfShadowSize = keyof typeof ShadowSizeMap
export type ShadowSizeMapType = { [key in KeyOfShadowSize]: string }
