import styled from 'styled-components'

const Element = styled.div`
  height: 0px;
`

export default function Anchor({
  value: { href },
}: {
  value: { href: string }
}) {
  return <Element id={href} />
}
