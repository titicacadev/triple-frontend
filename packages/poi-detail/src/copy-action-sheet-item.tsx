import { useCallback } from 'react'
import { ActionSheet } from '@titicaca/action-sheet'
import { useTranslation } from '@titicaca/next-i18next'

export default function CopyActionSheetItem({
  value,
  onCopy,
}: {
  value?: string | null
  onCopy: (value: string) => void
}) {
  const { t } = useTranslation('common-web')

  const handleClick = useCallback(() => value && onCopy(value), [value, onCopy])

  return value ? (
    <ActionSheet.Item onClick={handleClick} buttonLabel={t('bogsa')}>
      {value}
    </ActionSheet.Item>
  ) : null
}
