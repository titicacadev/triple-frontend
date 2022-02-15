import styled, { css } from 'styled-components'

import { FluidTable, Box } from '../common'

export interface Divider1Document {
  type: 'hr1'
  value: undefined
}

export interface Divider2Document {
  type: 'hr2'
  value: undefined
}

export interface Divider3Document {
  type: 'hr3'
  value: undefined
}

export interface Divider4Document {
  type: 'hr4'
  value: undefined
}

export interface Divider5Document {
  type: 'hr5'
  value: undefined
}

export interface Divider6Document {
  type: 'hr6'
  value: undefined
}

const resetHr = css`
  margin: 0;
  border: none;
`

const Hr = styled.hr<{ backgroundColor: string; height: number }>`
  ${resetHr}

  height: ${({ height }) => height}px;
  background-color: ${({ backgroundColor }) => backgroundColor};
`
const ImgContainer = styled.div`
  width: 100%;
  text-align: center;
`

const HrImg = styled.img`
  width: 130px;
  height: 37px;
`

export function Divider1View() {
  return (
    <FluidTable>
      <tbody>
        <tr>
          <Box padding={{ top: 50, bottom: 50, left: 30, right: 30 }}>
            <Hr height={1} backgroundColor="rgba(239, 239, 239, 1)" />
          </Box>
        </tr>
      </tbody>
    </FluidTable>
  )
}

export function Divider2View() {
  return (
    <FluidTable>
      <tbody>
        <tr>
          <Box padding={{ top: 50, bottom: 50, left: 0, right: 0 }}>
            <Hr height={10} backgroundColor="rgba(239, 239, 239, 1)" />
          </Box>
        </tr>
      </tbody>
    </FluidTable>
  )
}

export function Divider3View() {
  return (
    <FluidTable>
      <tbody>
        <tr>
          <Box padding={{ top: 0, bottom: 0, left: 0, right: 0 }}>
            <Hr height={10} backgroundColor="transparent" />
          </Box>
        </tr>
      </tbody>
    </FluidTable>
  )
}

export function Divider4View() {
  return (
    <FluidTable>
      <tbody>
        <tr>
          <Box padding={{ top: 40, bottom: 40, left: 0, right: 0 }}>
            <ImgContainer>
              <HrImg
                src="https://assets.triple.guide/images/img-line1@2x.png"
                alt="***"
              />
            </ImgContainer>
          </Box>
        </tr>
      </tbody>
    </FluidTable>
  )
}

export function Divider5View() {
  return (
    <FluidTable>
      <tbody>
        <tr>
          <Box padding={{ top: 40, bottom: 40, left: 0, right: 0 }}>
            <ImgContainer>
              <HrImg
                src="https://assets.triple.guide/images/img-line2@2x.png"
                alt="***"
              />
            </ImgContainer>
          </Box>
        </tr>
      </tbody>
    </FluidTable>
  )
}

export function Divider6View() {
  return (
    <FluidTable>
      <tbody>
        <tr>
          <Box padding={{ top: 40, bottom: 40, left: 0, right: 0 }}>
            <ImgContainer>
              <HrImg
                src="https://assets.triple.guide/images/img-line3@2x.png"
                alt="***"
              />
            </ImgContainer>
          </Box>
        </tr>
      </tbody>
    </FluidTable>
  )
}
