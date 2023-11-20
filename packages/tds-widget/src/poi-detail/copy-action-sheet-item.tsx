import { useCallback } from 'react'
import { ActionSheetItem } from '@titicaca/tds-ui'
import { useTranslation } from 'react-i18next'

export default function CopyActionSheetItem({
  value,
  onCopy,
}: {
  value?: string | null
  onCopy: (value: string) => void
}) {
  const { t } = useTranslation('triple-frontend')

  const handleClick = useCallback(() => value && onCopy(value), [value, onCopy])

  return value ? (
    <ActionSheetItem onClick={handleClick} buttonLabel={t('복사')}>
      {value}
    </ActionSheetItem>
  ) : null
}
