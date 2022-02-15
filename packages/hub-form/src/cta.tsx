import { Button } from '@titicaca/core-elements'

export default function Cta({
  available,
  onSubmit,
  children,
}: React.PropsWithChildren<{
  available?: boolean
  onSubmit: (e: React.SyntheticEvent) => void
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
