import { styled, css } from 'styled-components'

export const HeaderMenuButton = styled.button.attrs({
  id: 'header-menu-button',
})<{ hasNewNotification?: boolean }>`
  position: relative;
  width: 24px;
  height: 24px;
  background: no-repeat center/100%
    url('https://assets.triple.guide/images/ico_navi_menu@4x.png');
  margin: 0 8px;

  ${({ hasNewNotification }) =>
    hasNewNotification &&
    css`
      &::after {
        content: '';
        position: absolute;
        top: -6px;
        right: -7px;
        width: 8px;
        height: 8px;
        background-color: #fd2e69;
        border-radius: 50%;
      }
    `}
`
