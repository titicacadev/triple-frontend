import React from 'react'
import Container from './container'
import styled, { css } from 'styled-components'

const COLORS = {
  blud: '54,143,255',
  gray: '58, 58, 58',
}

const GenderBox = styled.div`
  width: 50%;
  display: inline-block;
  padding: 16px 0;
  border: 1px solid rgba(${COLORS.gray}, 0.1);
  border-radius: 2px;
  box-sizing: border-box;
  text-align: center;
  font-size: 14px;
  color: rgba(${COLORS.gray}, 0.3);

  &:last-child {
    border-left: none;
  }

  ${({ selected }) =>
    selected &&
    css`
      color: rgb(${COLORS.blud});
      border: 1px solid rgb(${COLORS.blud});

      &:last-child {
        border: 1px solid rgb(${COLORS.blud});
      }
    `};
`

function GenderRadio({ name, value, onClick }) {
  return (
    <Container>
      <GenderBox
        value="MALE"
        selected={value === 'MALE' ? true : false}
        onClick={() => {
          onClick(name, 'MALE')
        }}
      >
        남자
      </GenderBox>
      <GenderBox
        value="FEMALE"
        selected={value === 'FEMALE' ? true : false}
        onClick={() => {
          onClick(name, 'FEMALE')
        }}
      >
        여자
      </GenderBox>
    </Container>
  )
}

export default function RadioBox({ gender, ...props }) {
  return gender ? <GenderRadio {...props} /> : null
}
