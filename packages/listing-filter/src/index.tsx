import styled, { css } from 'styled-components'
import { MarginPadding, paddingMixin } from '@titicaca/core-elements'
import { blue, gray, gray200, gray300, white } from '@titicaca/color-palette'
import { HTMLAttributes, ReactNode, PureComponent } from 'react'

const FilterEntryBase = styled.div<{ active?: boolean; disabled?: boolean }>`
  display: inline-block;
  font-size: 13px;
  line-height: 15px;
  border: 1px solid ${({ active }) => (active ? blue : gray200)};
  color: ${({ active }) => (active ? blue : gray200)};
  background-repeat: no-repeat;
  border-radius: 2px;
  box-sizing: border-box;
  margin-right: 6px;
  vertical-align: top;
  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.3;
    `};
`

const ACTIVE_EXPANDER_ICON_URL =
  'https://assets.triple.guide/images/ico-category-select-on.svg'
const INACTIVE_EXPANDER_ICON_URL =
  'https://assets.triple.guide/images/ico-category-select.svg'
const PRIMARY_ICON_URL = 'https://assets.triple.guide/images/ico-filter-cal.svg'

const ExpandingFilterEntryFrame = styled(FilterEntryBase)<{
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
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 0;
  height: 18px;
  width: 18px;
  line-height: 18px;
  background-color: ${blue};
  color: ${white};
  border-radius: 9px;
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  box-sizing: border-box;
`

const ExpandingFilterEntryContainer = styled.div<{
  withBadge?: boolean
}>`
  position: relative;

  ${({ withBadge }) =>
    withBadge &&
    css`
      padding-right: 20px;
    `}
`

interface ExpandingFilterEntryProps extends HTMLAttributes<HTMLElement> {
  disabled?: boolean
  active?: boolean
  badge?: ReactNode
}
function ExpandingFilterEntry({
  badge,
  children,
  ...props
}: ExpandingFilterEntryProps) {
  return (
    <ExpandingFilterEntryFrame {...props}>
      <ExpandingFilterEntryContainer withBadge={!!badge}>
        {children}
        {badge ? (
          <ExpandingFilterEntryBadge>{badge}</ExpandingFilterEntryBadge>
        ) : null}
      </ExpandingFilterEntryContainer>
    </ExpandingFilterEntryFrame>
  )
}

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
          color: ${white};
          background-color: ${blue};
        `
      : css`
          color: ${gray200};
          border: solid 1px ${gray200};
        `};
  border-radius: 2px;
`

const UnderlineRegularFilterEntry = styled(FilterEntryBase)<{
  active?: boolean
}>`
  position: relative;
  margin: 0;
  border: 0;
  border-radius: 0;
  padding: 10px;
  font-size: 14px;
  font-weight: bold;
  color: ${gray300};
  ${({ active }) =>
    active &&
    css`
      color: ${gray};
      &:before {
        content: '';
        position: absolute;
        bottom: 0;
        left: 10px;
        right: 10px;
        height: 2px;
        background: ${blue};
      }
    `};
`

const PrimaryFilterEntry = styled(FilterEntryBase)`
  padding: 10px 14px 9px 38px;
  background-image: url(${PRIMARY_ICON_URL});
  background-size: 24px 24px;
  background-position: top 5px left 10px;
  border: none;
  border-radius: 2px;
  background-color: ${blue};
  font-size: 13px;
  font-weight: bold;
  color: ${white};
`

interface FilterEntryProps extends HTMLAttributes<HTMLElement> {
  disabled?: boolean
  active?: boolean
  activeIconImage?: string
  inactiveIconImage?: string
  underline?: boolean
}

function FilterEntry({
  active,
  activeIconImage,
  inactiveIconImage,
  underline,
  ...props
}: FilterEntryProps) {
  if (underline) {
    return <UnderlineRegularFilterEntry active={active} {...props} />
  }
  return (
    <RegularFilterEntry
      active={active}
      iconImage={active ? activeIconImage : inactiveIconImage}
      withIcon={!!(activeIconImage && inactiveIconImage)}
      {...props}
    />
  )
}

const ListingFilterBase = styled.div<{ padding?: MarginPadding }>`
  white-space: nowrap;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
  cursor: pointer;

  ::-webkit-scrollbar {
    display: none;
  }

  ${paddingMixin}
`

export default class ListingFilter extends PureComponent<{
  padding?: MarginPadding
}> {
  static FilterEntry = FilterEntry

  static ExpandingFilterEntry = ExpandingFilterEntry

  static PrimaryFilterEntry = PrimaryFilterEntry

  render() {
    const {
      props: {
        children,
        padding = { top: 0, right: 20, bottom: 10, left: 20 },
      },
    } = this

    return <ListingFilterBase padding={padding}>{children}</ListingFilterBase>
  }
}
