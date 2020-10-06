import React from 'react'
import styled from 'styled-components'
import { ResourceListItem, Image } from '@titicaca/core-elements'

import ResourceList from './resource-list'
import { RegionData } from './types'

export default function Regions({
  value: { regions },
  onResourceClick,
}: {
  value: { regions: RegionData[] }
  onResourceClick?: (e: React.SyntheticEvent, region: RegionData) => void
}) {
  return (
    <ResourceList>
      {regions.map((region, index) => (
        <RegionListElement
          key={index}
          value={region}
          onClick={onResourceClick && ((e) => onResourceClick(e, region))}
        />
      ))}
    </ResourceList>
  )
}

const Name = styled.div`
  float: left;
  margin-left: 10px;
  height: 40px;
  line-height: 40px;
  text-align: left center;
  font-size: 16px;
  font-weight: bold;
  color: #3a3a3a;
`

const Action = styled.div`
  position: absolute;
  top: 3px;
  right: 0;
  padding-top: 8px;
  padding-bottom: 7px;
  padding-left: 17px;
  padding-right: 17px;
  text-align: center;
  font-size: 12px;
  font-weight: bold;
  color: #3a3a3a;
  border-radius: 17px;
  background-color: #fafafa;
`

export function RegionListElement({
  value,
  onClick,
}: {
  value: RegionData | null
  onClick?: React.MouseEventHandler
}) {
  if (value) {
    const {
      nameOverride,
      source: { id, names, style },
    } = value

    return (
      <ResourceListItem key={id} onClick={onClick}>
        <Image.Circular
          size="small"
          floated="left"
          src={style && style.backgroundImageUrl}
        />
        <Name>{nameOverride || names.ko || names.en || names.local}</Name>
        <Action>바로가기</Action>
      </ResourceListItem>
    )
  }

  return null
}
