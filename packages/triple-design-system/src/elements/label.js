import React from 'react'
import styled from 'styled-components'

const RadioLabel = styled.div`
  display: inline-block;
  padding-left: 9px;
  font-size: 14px;
  line-height: 17px;
  color: ${({ selected }) => (selected ? '#3a3a3a' : 'rgba(58, 58, 58, 0.3)')};
  background-image: url(${({ selected }) =>
    `http://triple-web-assets-dev.s3-website-ap-northeast-1.amazonaws.com/images/img-search-select-${
      selected ? 'on' : 'off'
    }@4x.png`});
  background-size: 5px 5px;
  background-position: left center;
  background-repeat: no-repeat;
  cursor: pointer;
`

export default function Label({ radio, children, ...props }) {
  if (radio) {
    return <RadioLabel {...props}>{children}</RadioLabel>
  }

  return children
}
