import styled from 'styled-components'
import { useTranslation } from '@titicaca/next-i18next'
import { Container, FlexBox, Text } from '@titicaca/kint5-core-elements'

import { useReviewFilters } from './filter-context'

const CheckBox = styled.input`
  appearance: none;
  width: 24px;
  height: 24px;
  cursor: pointer;
  background-size: 100% 100%;
  border: 1px solid hotpink;
`

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
        <CheckBox readOnly type="checkbox" checked={checked} />
        {checked ? (
          <Container
            css={{ width: 24, height: 24, backgroundColor: 'black' }}
          />
        ) : (
          <Container
            css={{ width: 24, height: 24, backgroundColor: 'white' }}
          />
        )}
      </Container>
      <Text
        css={{
          fontSize: 14,
          fontWeight: 400,
          color: 'var(--color-kint5-gray60)',
        }}
      >
        {title}
      </Text>
    </FlexBox>
  )
}
