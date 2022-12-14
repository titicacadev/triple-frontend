import { useCallback } from 'react'
import { ActionSheetItem } from '@titicaca/action-sheet'
import { useI18n } from '@titicaca/i18n'

export default function CopyActionSheetItem({
  value,
  onCopy,
}: {
  value?: string | null
  onCopy: (value: string) => void
}) {
  const handleClick = useCallback(() => value && onCopy(value), [value, onCopy])
  const { t } = useI18n()

  return value ? (
    <ActionSheetItem
      onClick={handleClick}
      buttonLabel={t('common:copy', '복사')}
    >
      {value}
    </ActionSheetItem>
  ) : null
}
