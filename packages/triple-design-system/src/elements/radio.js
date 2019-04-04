import React from 'react'
import Container from './container'
import Text from './text'
import styled, { css } from 'styled-components'
import withField from '../utils/form-field'

const COLORS = {
  blud: '54,143,255',
  gray: '58, 58, 58',
}

const RadioContainer = styled.div`
  position: relative;
  padding: 15px 35px 15px 45px;
  border: 1px solid rgba(${COLORS.gray}, 0.1);
  margin-bottom: 10px;

  &:last-child {
    margin-bottom: 0;
  }
`

const Icon = styled.span`
  position: absolute;
  left: 15px;
  top: 0;
  transform: translateY(50%);
  opacity: 0.5;
  display: inline-block;
  width: 22px;
  height: 22px;
  background-size: 22px 22px;
  background-repeat: no-repeat;
  background-position: -1px -1px;
  background-image: url('https://assets.triple.guide/images/radio-off@2x.png');

  ${({ selected }) =>
    selected &&
    css`
      opacity: 1;
      background-image: url('https://assets.triple.guide/images/radio-on@2x.png');
      transition: all 0.3s ease;
      transform: scale(1.1) translateY(50%);
    `};
`

const GenderContainer = styled.div`
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

export const Radio = withField(({ name, value, onSelect, options }) => {
  return (
    <>
      {options.map((option, idx) => (
        <RadioContainer key={idx} onClick={() => onSelect(name, option)}>
          <Icon selected={option === value} />
          <Text size="small">{option}</Text>
        </RadioContainer>
      ))}
    </>
  )
})

export const GenderSelector = withField(({ name, value, onClick }) => {
  return (
    <Container>
      <GenderContainer
        value="MALE"
        selected={value === 'MALE'}
        onClick={() => {
          onClick(name, 'MALE')
        }}
      >
        남자
      </GenderContainer>
      <GenderContainer
        value="FEMALE"
        selected={value === 'FEMALE'}
        onClick={() => {
          onClick(name, 'FEMALE')
        }}
      >
        여자
      </GenderContainer>
    </Container>
  )
})
