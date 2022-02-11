import styled, { StyledComponentProps } from 'styled-components'

const HandleContainer = styled.div.attrs<{ percent: number }>(
  ({ percent }) => ({
    style: {
      left: `${percent}%`,
    },
  }),
)`
  position: absolute;
  width: 70px;
  height: 90px;
  transform: translate(-50%, -50%);
  z-index: 1;
`

const HandlePeg = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 18px;
  height: 18px;
  border-radius: 18px;
  border: solid 3px #368fff;
  background-color: #ffffff;
  transform: translate(-50%, -50%);
  z-index: 1;
`

export default function Handle(
  props: StyledComponentProps<'div', object, { percent: number }, never>,
) {
  return (
    <HandleContainer {...props}>
      <HandlePeg />
    </HandleContainer>
  )
}
