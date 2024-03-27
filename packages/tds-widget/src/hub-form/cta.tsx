import { PropsWithChildren, SyntheticEvent } from 'react'
import { Button } from '@titicaca/core-elements'

function Cta({
  available,
  onSubmit,
  children,
}: PropsWithChildren<{
  available?: boolean
  onSubmit: (e: SyntheticEvent) => void
}>) {
  return (
    <Button
      size="small"
      fluid
      borderRadius={4}
      disabled={!available}
      lineHeight="20px"
      onClick={available ? onSubmit : undefined}
    >
      {children}
    </Button>
  )
}

export default Cta
