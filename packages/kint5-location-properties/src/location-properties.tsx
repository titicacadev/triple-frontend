import { useCallback, useMemo } from 'react'
import { useTranslation } from '@titicaca/next-i18next'
import { Segment, List, EmptyLocationIcon } from '@titicaca/kint5-core-elements'
import { ActionSheet, ActionSheetItem } from '@titicaca/action-sheet'
import { useHistoryFunctions, useUriHash } from '@titicaca/react-contexts'
import { TranslatedProperty } from '@titicaca/type-definitions'

import PropertyItem, {
  ACTION_SHEET_PREFIX,
  PropertyItemProps,
} from './property-item'
import { PhoneIcon } from './phone-icon'
import { HouseIcon } from './house-icon'

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
  const { t } = useTranslation('common-web')

  const uriHash = useUriHash()
  const { back } = useHistoryFunctions()

  const properties: Map<
    string,
    Omit<PropertyItemProps, 'identifier'>
  > = useMemo(() => {
    const allValues = new Map<string, Omit<PropertyItemProps, 'identifier'>>()
    const addressValue = addresses?.en

    addressValue &&
      allValues.set('addresses', {
        title: t(['juso', '주소']),
        value: addressValue,
        iconRenderer: () => (
          <EmptyLocationIcon color="#9199A1" width={18} height={18} />
        ),
        onClick: onAddressesClick,
        eventActionFragment: '기본정보_주소',
      })

    phoneNumber &&
      allValues.set('phoneNumber', {
        title: t(['jeonhwa', '전화']),
        value: phoneNumber,
        iconRenderer: () => (
          <PhoneIcon color="#9199A1" css={{ width: 18, height: 18 }} />
        ),
        onClick: onPhoneNumberClick,
        eventActionFragment: '기본정보_전화번호',
      })

    officialSiteUrl &&
      allValues.set('officialSiteUrl', {
        title: t(['hompeiji', '홈페이지']),
        value: officialSiteUrl,
        iconRenderer: () => (
          <HouseIcon color="#9199A1" css={{ width: 18, height: 18 }} />
        ),
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
      <Segment
        {...props}
        css={{
          backgroundColor: 'transparent',
          margin: '0 16px',
          padding: '20px 0',
        }}
      >
        <List verticalGap={15}>
          {Array.from(properties.entries()).map(([key, props]) => (
            <PropertyItem key={key} identifier={key} {...props} />
          ))}
        </List>
      </Segment>
      <ActionSheet
        title={t(['bogsahagi', '복사하기'])}
        open={isActionSheetOpen}
        onClose={back}
      >
        <ActionSheetItem
          buttonLabel={t(['bogsa', '복사'])}
          onClick={handleClick}
        >
          {value}
        </ActionSheetItem>
      </ActionSheet>
    </>
  )
}

export default LocationProperties
