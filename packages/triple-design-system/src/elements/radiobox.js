import React from 'react'
import Container from './container'
import styled, { css } from 'styled-components'

const GenderBox = styled.div`
  width: 50%;
  display: inline-block;
  padding: 16px 0;
  border: 1px solid rgb(239, 239, 239);
  border-radius: 2px;
  box-sizing: border-box;
  text-align: center;
  font-size: 14px;
  color: rgba(58, 58, 58, 0.3);

  &:last-child {
    border-left: none;
  }

  ${({ selected }) =>
    selected &&
    css`
      color: #368fff;
      border: 1px solid #368fff;

      &:last-child {
        border: 1px solid #368fff;
      }
    `};
`

function GenderRadio({ name, value, setFieldValue }) {
  return (
    <Container>
      <GenderBox
        value="MALE"
        selected={value === 'MALE' ? true : false}
        onClick={() => {
          setFieldValue(name, 'MALE')
        }}
      >
        남자
      </GenderBox>
      <GenderBox
        value="FEMALE"
        selected={value === 'FEMALE' ? true : false}
        onClick={() => {
          setFieldValue(name, 'FEMALE')
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
