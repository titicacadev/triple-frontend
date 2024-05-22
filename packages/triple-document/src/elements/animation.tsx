import { TripleHeader, TripleHeaderProps } from '@titicaca/triple-header'

export default function Animation({ value }: { value: TripleHeaderProps }) {
  return <TripleHeader>{value}</TripleHeader>
}
