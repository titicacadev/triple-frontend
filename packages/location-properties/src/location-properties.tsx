import { useCallback, useMemo } from 'react'
import { Segment, List } from '@titicaca/core-elements'
import ActionSheet from '@titicaca/action-sheet'
import { useI18n } from '@titicaca/i18n'
import { useHistoryFunctions, useUriHash } from '@titicaca/react-contexts'
import { TranslatedProperty } from '@titicaca/type-definitions'

import PropertyItem, {
  ACTION_SHEET_PREFIX,
  PropertyItemProps,
} from './property-item'

interface ExtraProperty {
  description: string
  value: string
}

function LocationProperties({
  addresses,
  onAddressesClick,
  phoneNumber,
  onPhoneNumberClick,
  officialSiteUrl,
  onOfficialSiteUrlClick,
  extraProperties,
  onExtraPropertyClick,
  onCopy,
  ...props
}: {
  addresses?: TranslatedProperty
  onAddressesClick?: () => void
  phoneNumber?: string
  onPhoneNumberClick?: () => void
  officialSiteUrl?: string
  onOfficialSiteUrlClick?: () => void
  extraProperties?: ExtraProperty[]
  onExtraPropertyClick?: (extraProperty: ExtraProperty) => void
  onCopy: (value: string) => void
} & Parameters<typeof Segment>['0']) {
  const { t } = useI18n()
  const uriHash = useUriHash()
  const { back } = useHistoryFunctions()

  const properties: Map<
    string,
    Omit<PropertyItemProps, 'identifier'>
  > = useMemo(() => {
    const allValues = new Map<string, Omit<PropertyItemProps, 'identifier'>>()
    const addressValue =
      addresses?.primary || addresses?.ko || addresses?.en || addresses?.local

    addressValue &&
      allValues.set('addresses', {
        title: t('common:address', '주소'),
        value: addressValue,
        onClick: onAddressesClick,
        eventActionFragment: '기본정보_주소',
      })

    phoneNumber &&
      allValues.set('phoneNumber', {
        title: t('common:contact', '전화'),
        value: phoneNumber,
        onClick: onPhoneNumberClick,
        eventActionFragment: '기본정보_전화번호',
      })

    officialSiteUrl &&
      allValues.set('officialSiteUrl', {
        title: t('common:homepage', '홈페이지'),
        value: officialSiteUrl,
        singleLine: true,
        onClick: onOfficialSiteUrlClick,
        eventActionFragment: '기본정보_홈페이지',
      })

    if (extraProperties) {
      extraProperties.forEach(({ description, value, ...rest }, i) => {
        allValues.set(`extraProperties.${i}`, {
          title: description,
          value,
          onClick: onExtraPropertyClick
            ? () => onExtraPropertyClick({ description, value, ...rest })
            : undefined,
        })
      })
    }

    return allValues
  }, [
    t,
    addresses,
    phoneNumber,
    officialSiteUrl,
    extraProperties,
    onAddressesClick,
    onPhoneNumberClick,
    onOfficialSiteUrlClick,
    onExtraPropertyClick,
  ])

  const isActionSheetOpen = (uriHash || '').startsWith(ACTION_SHEET_PREFIX)
  const value =
    isActionSheetOpen &&
    properties.get(uriHash.replace(`${ACTION_SHEET_PREFIX}.`, ''))?.value
  const handleClick = useCallback(() => value && onCopy(value), [onCopy, value])

  return (
    <>
      <Segment {...props}>
        <List verticalGap={15}>
          {[...properties.entries()].map(([key, props]) => (
            <PropertyItem key={key} identifier={key} {...props} />
          ))}
        </List>
      </Segment>
      <ActionSheet
        title={t('common:copyActionSheetTitle', '복사하기')}
        open={isActionSheetOpen}
        onClose={back}
      >
        <ActionSheet.Item
          buttonLabel={t('common:copy', '복사')}
          onClick={handleClick}
        >
          {value}
        </ActionSheet.Item>
      </ActionSheet>
    </>
  )
}

export default LocationProperties
