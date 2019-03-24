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
  padding: 8px 9px 8px 34px;
  background-size: 24px 24px;
  background-position: 7px 4px;
  ${({ iconImage }) =>
    iconImage
      ? css`
          background-image: url(${iconImage});
        `
      : ''};
`

export const ListingFilter = styled.div`
  white-space: nowrap;
  overflow-x: scroll;
  padding: 0 20px;

  ::-webkit-scrollbar {
    display: none;
  }
`

function FilterEntry({
  active,
  expanding,
  activeIconImage,
  inactiveIconImage,
  ...props
}) {
  if (expanding) {
    return <ExpandingFilterEntry active={active} {...props} />
  }

  return (
    <RegularFilterEntry
      active={active}
      iconImage={active ? activeIconImage : inactiveIconImage}
      {...props}
    />
  )
}

ListingFilter.FilterEntry = FilterEntry
