import { FlexBox } from '@titicaca/core-elements'
import { css } from 'styled-components'

export const ModalUnderlay = ({ ...props }) => {
  return (
    <FlexBox
      flex
      alignItems="center"
      justifyContent="center"
      css={css`
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(58, 58, 58, 0.5);
        z-index: 9999;
      `}
      {...props}
    />
  )
}
