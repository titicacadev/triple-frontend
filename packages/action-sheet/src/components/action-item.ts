import styled from 'styled-components'
import * as CSS from 'csstype'

export const ActionItemContainer = styled.div`
  width: 100%;
  height: 54px;

  &:after {
    content: '';
    display: block;
    clear: both;
  }
`

// eslint-disable-next-line no-unexpected-multiline
export const ItemText = styled.div<{
  width?: CSS.WidthProperty<string | number>
  checked?: boolean
}>`
  display: inline-block;
  width: ${({ width }) => width || '100%'};
  height: 54px;
  line-height: 54px;
  font-size: 16px;
  color: ${({ checked }) => (checked ? '#368fff' : '#3a3a3a')};
  font-weight: ${({ checked }) => (checked ? 'bold' : 'normal')};
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

export const ItemButton = styled.a`
  float: right;
  height: 30px;
  line-height: 30px;
  margin-top: 11px;
  padding: 0 17px;
  border-radius: 15px;
  background-color: #fafafa;
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  color: #3a3a3a;
`

export const URL_BY_NAMES: { [key: string]: string } = {
  save: 'https://assets.triple.guide/images/img-action-save@4x.png',
  schedule: 'https://assets.triple.guide/images/img-action-schedule@4x.png',
  share: 'https://assets.triple.guide/images/img-action-share@4x.png',
  suggest: 'https://assets.triple.guide/images/img-action-suggest@4x.png',
  review: 'https://assets.triple.guide/images/img-action-review@4x.png',
  report: 'https://assets.triple.guide/images/img-action-report@4x.png',
  delete: 'https://assets.triple.guide/images/img-action-delete@4x.png',
}

export const CHECKED_ICON_URL =
  'https://assets.triple.guide/images/checkbox-on.svg'

export const ItemIcon = styled.img`
  float: left;
  margin-top: 12px;
  width: 30px;
  height: 30px;
  margin-right: 9px;
`

export const CheckedIcon = styled.div`
  float: right;
  margin-top: 9px;
  margin-right: -5px;
  width: 36px;
  height: 36px;
  background-size: 36px 36px;
  background-image: url(${CHECKED_ICON_URL});
  background-repeat: none;
`
