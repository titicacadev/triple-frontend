import styled from 'styled-components'

const URL_BY_NAMES = {
  save: 'https://assets.triple.guide/images/ico-save@2x.png',
  web: 'https://assets.triple.guide/images/ico-end-web@2x.png',
  call: 'https://assets.triple.guide/images/ico-end-call@2x.png',
  map: 'https://assets.triple.guide/images/ico-end-poi@2x.png',
}

const SIZES = {
  tiny: '16px',
  small: '18px',
}

const Icon = styled.div`
  display: inline-block;
  width: ${({ size }) => SIZES[size || 'small']};
  height: ${({ size }) => SIZES[size || 'small']};
  background-image: ${({ src, name }) =>
    `url(${src ? src : URL_BY_NAMES[name]})`};
  background-size: ${({ size }) =>
    `${SIZES[size || 'small']} ${SIZES[size || 'small']}`};
  background-repeat: no-repeat;
`

export default Icon
