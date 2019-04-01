import React from 'react'
import styled, { css } from 'styled-components'

const FilterEntryBase = styled.div`
  display: inline-block;
  font-family: sans-serif;
  font-size: 13px;
  border: 1px solid
    ${({ active }) => (active ? '#368fff' : 'rgba(58, 58, 58, 0.3)')};
  color: ${({ active }) => (active ? '#368fff' : 'rgba(58, 58, 58, 0.3)')};
  background-repeat: no-repeat;
  border-radius: 2px;
  box-sizing: border-box;
  margin-right: 6px;
`

const ACTIVE_EXPANDER_ICON_URL =
  'https://assets.triple.guide/images/ico-category-select-on.svg'
const INACTIVE_EXPANDER_ICON_URL =
  'https://assets.triple.guide/images/ico-category-select.svg'
const PRIMARY_ICON_URL =
  'https://assets.triple-dev.titicaca-corp.com/images/ico-filter-cal.svg'

const ExpandingFilterEntry = styled(FilterEntryBase)`
  padding: 8px 24px 8px 11px;
  background-image: ${({ active }) =>
    active
      ? `url(${ACTIVE_EXPANDER_ICON_URL})`
      : `url(${INACTIVE_EXPANDER_ICON_URL})`};
  background-size: 10px 24px;
  background-position: top 4px right 10px;
`

const RegularFilterEntry = styled(FilterEntryBase)`
  ${({ withIcon, iconImage }) =>
    withIcon
      ? css`
          padding: 8px 10px 8px 32px;
          background-size: 24px 24px;
          background-position: 8px 5px;
          background-image: url(${iconImage});
        `
      : css`
          padding: 8px 16px;
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
  padding: 10px 14px 8px 38px;
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

export const ListingFilter = styled.div`
  white-space: nowrap;
  overflow-x: scroll;
  padding: 0 20px;

  ::-webkit-scrollbar {
    display: none;
  }
`

function FilterEntry({ active, activeIconImage, inactiveIconImage, ...props }) {
  return (
    <RegularFilterEntry
      active={active}
      iconImage={active ? activeIconImage : inactiveIconImage}
      {...props}
    />
  )
}

ListingFilter.FilterEntry = FilterEntry
ListingFilter.ExpandingFilterEntry = ExpandingFilterEntry
ListingFilter.PrimaryFilterEntry = PrimaryFilterEntry
