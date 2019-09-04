import * as React from 'react'
import styled, { css } from 'styled-components'

const FilterEntryBase = styled.div<{ active?: boolean }>`
  display: inline-block;
  font-size: 13px;
  line-height: 1.2;
  border: 1px solid
    ${({ active }) => (active ? '#368fff' : 'rgba(58, 58, 58, 0.2)')};
  color: ${({ active }) => (active ? '#368fff' : 'rgba(58, 58, 58, 0.2)')};
  background-repeat: no-repeat;
  border-radius: 2px;
  box-sizing: border-box;
  margin-right: 6px;
  vertical-align: top;
`

const ACTIVE_EXPANDER_ICON_URL =
  'https://assets.triple.guide/images/ico-category-select-on.svg'
const INACTIVE_EXPANDER_ICON_URL =
  'https://assets.triple.guide/images/ico-category-select.svg'
const PRIMARY_ICON_URL =
  'https://assets.triple-dev.titicaca-corp.com/images/ico-filter-cal.svg'

// eslint-disable-next-line no-unexpected-multiline
const ExpandingFilterEntryContainer = styled(FilterEntryBase)<{
  active?: boolean
}>`
  padding: 9px 24px 9px 11px;
  background-image: ${({ active }) =>
    active
      ? `url(${ACTIVE_EXPANDER_ICON_URL})`
      : `url(${INACTIVE_EXPANDER_ICON_URL})`};
  background-size: 10px 24px;
  background-position: top 4px right 10px;
`

const ExpandingFilterEntryBadge = styled.div`
  display: inline-block;
  height: 18px;
  width: 18px;
  line-height: 18px;
  background-color: #368fff;
  color: #fff;
  vertical-align: top;
  border-radius: 9px;
  font-size: 12px;
  font-weight: bold;
  padding-left: 5px;
  box-sizing: border-box;
  margin-left: 2px;
  margin-top: -2px;
`

function ExpandingFilterEntry({
  badge,
  children,
  ...props
}: {
  active?: boolean
  badge?: React.ReactNode
  children?: React.ReactNode
}) {
  return (
    <ExpandingFilterEntryContainer {...props}>
      {children}
      {badge ? (
        <ExpandingFilterEntryBadge>{badge}</ExpandingFilterEntryBadge>
      ) : null}
    </ExpandingFilterEntryContainer>
  )
}

// eslint-disable-next-line no-unexpected-multiline
const RegularFilterEntry = styled(FilterEntryBase)<{
  active?: boolean
  withIcon?: boolean
  iconImage?: string
}>`
  ${({ withIcon, iconImage }) =>
    withIcon
      ? css`
          padding: 9px 10px 9px 32px;
          background-size: 24px 24px;
          background-position: top 5px left 8px;
          background-image: url(${iconImage});
        `
      : css`
          padding: 9px 16px;
        `};
  ${({ active }) =>
    active
      ? css`
          color: #fff;
          background-color: #368fff;
        `
      : css`
          color: rgba(58, 58, 58, 0.2);
          border: solid 1px rgba(58, 58, 58, 0.2);
        `};
  border-radius: 2px;
`

const PrimaryFilterEntry = styled(FilterEntryBase)`
  padding: 10px 14px 9px 38px;
  background-image: url(${PRIMARY_ICON_URL});
  background-size: 24px 24px;
  background-position: top 5px left 10px;
  border: none;
  border-radius: 2px;
  background-color: #368fff;
  font-size: 13px;
  font-weight: bold;
  color: #fff;
`

function FilterEntry({
  active,
  activeIconImage,
  inactiveIconImage,
  ...props
}: {
  active?: boolean
  activeIconImage?: string
  inactiveIconImage?: string
  children: React.ReactNode
}) {
  return (
    <RegularFilterEntry
      active={active}
      iconImage={active ? activeIconImage : inactiveIconImage}
      withIcon={!!(activeIconImage && inactiveIconImage)}
      {...props}
    />
  )
}

const ListingFilterBase = styled.div`
  white-space: nowrap;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
  cursor: pointer;

  padding: 0 20px 10px 20px;

  ::-webkit-scrollbar {
    display: none;
  }
`

export default class ListingFilter extends React.PureComponent {
  static FilterEntry = FilterEntry
  static ExpandingFilterEntry = ExpandingFilterEntry
  static PrimaryFilterEntry = PrimaryFilterEntry

  render() {
    const {
      props: { children },
    } = this

    return <ListingFilterBase>{children}</ListingFilterBase>
  }
}
