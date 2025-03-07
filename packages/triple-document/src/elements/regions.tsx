import { MouseEventHandler } from 'react'
import { useTranslation } from '@titicaca/triple-web'
import { styled } from 'styled-components'
import { ResourceListItem, Image } from '@titicaca/tds-ui'

import { RegionData } from '../types'
import { useResourceClickHandler } from '../prop-context/resource-click-handler'

import ResourceList from './shared/resource-list'

export default function Regions({
  value: { regions },
}: {
  value: { regions: RegionData[] }
}) {
  const onResourceClick = useResourceClickHandler()

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
  top: 7px;
  right: 0;
  padding: 8px 17px 7px;
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
  onClick?: MouseEventHandler
}) {
  const t = useTranslation()

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
        <Action>{t('바로가기')}</Action>
      </ResourceListItem>
    )
  }

  return null
}
