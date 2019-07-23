import * as React from 'react'
import Container from './container'
import Text from './text'
import styled, { css } from 'styled-components'
import { withField } from '../utils/form-field'
import { GetGlobalColor } from '../commons'

const RadioFrame = styled.div.attrs<{ name?: string }>({})`
  position: relative;
  padding: 11px 35px 11px 16px;
  border: 2px solid rgba(${GetGlobalColor('gray')}, 0.1);
  margin-bottom: 10px;
  box-sizing: border-box;

  &:last-child {
    margin-bottom: 0;
  }
`

const RadioContainer = styled.div.attrs<{ name?: string }>({})`
  display: table;
  width: 100%;
`

const Cell = styled.div<{ width: number }>`
  width: ${({ width }) => width || 100}%;
  display: table-cell;
  vertical-align: middle;
  word-break: break-all;
`

const Icon = styled.span<{ selected?: boolean }>`
  opacity: 0.5;
  display: inline-block;
  width: 22px;
  height: 22px;
  background-size: 22px 22px;
  background-repeat: no-repeat;
  background-position: -1px -1px;
  background-image: url('https://assets.triple.guide/images/radio-off@2x.png');
  vertical-align: bottom;

  ${({ selected }) =>
    selected &&
    css`
      opacity: 1;
      background-image: url('https://assets.triple.guide/images/radio-on@2x.png');
      transition: all 0.3s ease;
    `};
`

const GenderContainer = styled.div.attrs<{ name?: string; value?: string }>(
  {},
)<{
  selected?: boolean
}>`
  width: 50%;
  display: inline-block;
  padding: 15px 0;
  border: 1px solid rgba(${GetGlobalColor('gray')}, 0.1);
  border-radius: 2px;
  box-sizing: border-box;
  text-align: center;
  font-size: 16px;
  color: rgba(${GetGlobalColor('gray')}, 0.3);

  &:last-child {
    border-left: none;
  }

  ${({ selected }) =>
    selected &&
    css`
      color: rgb(${GetGlobalColor('blue')});
      border: 1px solid rgb(${GetGlobalColor('blue')});

      &:last-child {
        border: 1px solid rgb(${GetGlobalColor('blue')});
      }
    `};
`

export const Radio = withField(
  ({
    name,
    value,
    onChange,
    options,
  }: {
    name?: string
    value?: string
    onChange?: (e: React.SyntheticEvent, arg1: string) => any
    options: string[]
  }) => {
    return (
      <>
        {options.map((option, idx) => (
          <RadioFrame key={idx}>
            <RadioContainer
              name={name}
              onClick={(e?: React.SyntheticEvent) =>
                onChange && onChange(e, option)
              }
            >
              <Cell width={10}>
                <Icon selected={option === value} />
              </Cell>
              <Cell width={90}>
                <Text size="small">{option}</Text>
              </Cell>
            </RadioContainer>
          </RadioFrame>
        ))}
      </>
    )
  },
)

export const GenderSelector = withField(
  ({
    name,
    value,
    onChange,
  }: {
    name?: string
    value?: string
    onChange?: (e: React.SyntheticEvent, arg1: string) => any
  }) => {
    return (
      <Container>
        <GenderContainer
          name={name}
          value="MALE"
          selected={value === 'MALE'}
          onClick={(e: React.SyntheticEvent) => onChange && onChange(e, 'MALE')}
        >
          남자
        </GenderContainer>
        <GenderContainer
          name={name}
          value="FEMALE"
          selected={value === 'FEMALE'}
          onClick={(e: React.SyntheticEvent) =>
            onChange && onChange(e, 'FEMALE')
          }
        >
          여자
        </GenderContainer>
      </Container>
    )
  },
)
