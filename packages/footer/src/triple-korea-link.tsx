import styled from 'styled-components'

const Link = styled.a`
  color: var(--color-gray500);
  font-size: 10px;
  text-decoration-line: underline;
  cursor: pointer;

  margin-top: 20px;
`

export function TripleKoreaLink() {
  return (
    <Link href="https://triple.global" target="_blank" rel="noreferrer">
      TRIPLE Korea for foreign travelers
    </Link>
  )
}
