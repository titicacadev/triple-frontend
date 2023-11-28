import { useTranslation } from '@titicaca/next-i18next'
import {
  Container,
  EmptyCheckboxIcon,
  FilledCheckboxIcon,
  FlexBox,
  Text,
} from '@titicaca/kint5-core-elements'

import { useReviewFilters } from './filter-context'

export function Filters() {
  const { isMediaCollection, handleMediaChange } = useReviewFilters()

  const { t } = useTranslation('common-web')

  return (
    <FlexBox flex alignItems="center" position="relative">
      <Filter
        title={t(['sajin-dongyeongsang', '사진/동영상'])}
        checked={isMediaCollection}
        onClick={handleMediaChange}
      />
    </FlexBox>
  )
}

function Filter({
  title,
  checked,
  onClick,
}: {
  title: string
  checked: boolean
  onClick: () => void
}) {
  return (
    <FlexBox
      flex
      alignItems="center"
      gap="4px"
      onClick={onClick}
      css={{
        cursor: 'pointer',
      }}
    >
      <Container css={{ position: 'relative' }}>
        <input
          readOnly
          type="checkbox"
          checked={checked}
          css={{
            position: 'absolute',
            top: 0,
            left: 0,
            appearance: 'none',
            width: 24,
            height: 24,
            cursor: 'pointer',
          }}
        />
        {checked ? (
          <FilledCheckboxIcon
            css={{
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          />
        ) : (
          <EmptyCheckboxIcon
            css={{
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          />
        )}
      </Container>
      <Text
        css={{
          fontSize: 14,
          color: 'var(--color-kint5-gray60)',
        }}
      >
        {title}
      </Text>
    </FlexBox>
  )
}
