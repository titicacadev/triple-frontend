import styled from 'styled-components'

import Icon from '../icon'

const IconContainer = styled.div`
  position: absolute;
  top: 30px;
  right: 10px;
  width: 20px;
  height: 20px;
`

export default function ImageLinkIndicator() {
  return (
    <IconContainer>
      <Icon size="medium" name="arrowRight" />
    </IconContainer>
  )
}
