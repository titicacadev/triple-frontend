import styled from 'styled-components'

import { MarginPadding } from './../commons'
import { GlobalSizes } from '../commons'
import { marginMixin, paddingMixin } from '../mixins'

type Icons = 'save' | 'web' | 'call' | 'map' | 'arrowRight'

const URL_BY_NAMES: { [key in Icons]: string } = {
  save: 'https://assets.triple.guide/images/ico-save@4x.png',
  web: 'https://assets.triple.guide/images/ico-end-web@4x.png',
  call: 'https://assets.triple.guide/images/ico-end-call@4x.png',
  map: 'https://assets.triple.guide/images/ico-end-poi@4x.png',
  arrowRight: 'https://assets.triple.guide/images/ico-arrow@4x.png',
}

const SIZES: Partial<Record<GlobalSizes, string>> = {
  tiny: '16px',
  small: '18px',
  medium: '20px',
  large: '22px',
  big: '24px',
}

// eslint-disable-next-line no-unexpected-multiline
const Icon = styled.div<{
  size?: GlobalSizes
  src?: string
  name?: Icons
  padding?: MarginPadding
  margin?: MarginPadding
}>`
  display: inline-block;
  width: ${({ size }) => SIZES[size || 'small']};
  height: ${({ size }) => SIZES[size || 'small']};
  background-image: ${({ src, name }) =>
    `url(${src || (name ? URL_BY_NAMES[name] : '')})`};
  background-size: ${({ size }) =>
    `${SIZES[size || 'small']} ${SIZES[size || 'small']}`};
  background-repeat: no-repeat;
  vertical-align: text-bottom;

  ${marginMixin}
  ${paddingMixin}
`

export default Icon
