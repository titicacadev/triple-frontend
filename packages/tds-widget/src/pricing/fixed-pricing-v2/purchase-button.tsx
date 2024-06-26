import { Button } from '@titicaca/tds-ui'

import { PurchaseButtonLoadingIndicator } from './purchase-button-loading-indicator'

export function PurchaseButton({
  loading,
  disabled,
  buttonText,
  onClick,
}: {
  loading: boolean
  disabled?: boolean
  buttonText?: string
  onClick?: () => void
}) {
  return (
    <Button
      as="button"
      fluid
      borderRadius={4}
      size="small"
      color={loading ? 'blue500' : 'blue'}
      disabled={disabled}
      onClick={onClick}
    >
      {loading ? (
        <PurchaseButtonLoadingIndicator loading={loading} />
      ) : (
        buttonText
      )}
    </Button>
  )
}
