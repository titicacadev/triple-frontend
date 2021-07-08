import React from 'react'
import styled from 'styled-components'
import { ResourceListItem, Image } from '@titicaca/core-elements'

import { RegionData } from '../types'
import { useResourceClickHandler } from '../prop-context/resource-click-handler'
import useCommonEventTracker, {
  EventLog,
  EventTypeEnum,
} from '../use-event-tracker'

import ResourceList from './shared/resource-list'

export default function Regions({
  value: { regions },
  type,
  event,
}: {
  value: { regions: RegionData[] }
  type?: EventTypeEnum
  event?: EventLog
}) {
  const onResourceClick = useResourceClickHandler()
  const { trackCitySelectEvent } = useCommonEventTracker({ type })

  return (
    <ResourceList>
      {regions.map((region, index) => (
        <RegionListElement
          key={index}
          value={region}
          onClick={(e) => {
            if (!onResourceClick) {
              // TODO: triple-document 에러 처리 방법 설계
              return null
            }
            onResourceClick(e, region)
            type &&
              event &&
              trackCitySelectEvent({
                id: event.id,
                title: event.title,
                buttonName: region.source.names.local || '',
                regionId: region.id,
                contentType: 'region',
              })
          }}
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
