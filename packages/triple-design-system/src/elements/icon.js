import styled from 'styled-components'

const NAMES = {
  save: 'ico-save@2x.png',
  web: 'ico-end-web@2x.png',
  call: 'ico-end-call@2x.png',
  map: 'ico-end-poi@2x.png',
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
    `url(${src ? src : `https://assets.triple.guide/images/${NAMES[name]}`})`};
  background-size: ${({ size }) =>
    `${SIZES[size || 'small']} ${SIZES[size || 'small']}`};
  background-repeat: no-repeat;
`

export default Icon
