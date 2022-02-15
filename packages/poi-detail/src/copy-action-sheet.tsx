import ActionSheet from '@titicaca/action-sheet'
import { TranslatedProperty } from '@titicaca/type-definitions'

import CopyActionSheetItem from './copy-action-sheet-item'

export default function CopyActionSheet({
  open,
  names: { primary, ko, en, local },
  onCopy,
  onClose,
}: {
  open: boolean
  names: TranslatedProperty
  onCopy: (value: string) => void
  onClose: () => void
}) {
  return (
    <ActionSheet open={open} onClose={onClose}>
      <CopyActionSheetItem value={primary || ko} onCopy={onCopy} />
      <CopyActionSheetItem value={en} onCopy={onCopy} />
      <CopyActionSheetItem value={local} onCopy={onCopy} />
    </ActionSheet>
  )
}
