import { MouseEventHandler } from 'react'
import { useTranslation } from '@titicaca/next-i18next'
import styled from 'styled-components'
import { List, Text } from '@titicaca/kint5-core-elements'

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

const Image = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 12px;
`

export function RegionListElement({
  value,
  onClick,
}: {
  value: RegionData | null
  onClick?: MouseEventHandler
}) {
  const { t } = useTranslation('common-web')

  if (value) {
    const {
      nameOverride,
      source: { id, names, style },
    } = value

    return (
      <List.Item
        key={id}
        onClick={onClick}
        css={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          cursor: 'pointer',
          position: 'relative',
          ':not(:last-child)': { marginBottom: 20 },
        }}
      >
        <Image src={style && style.backgroundImageUrl} />
        <Text css={{ fontSize: 14, fontWeight: 700 }}>
          {nameOverride || names.ko || names.en || names.local}
        </Text>
        <Text
          css={{
            fontSize: 14,
            fontWeight: 700,
            color: 'var(--color-kint5-brand1)',
            position: 'absolute',
            right: 0,
            paddingRight: 12,
            background:
              "url('https://assets.triple-dev.titicaca-corp.com/images/kint5-ic-arrow-1-line-24.svg') no-repeat 100% 50%",
          }}
        >
          {t(['barogagi', '바로가기'])}
        </Text>
      </List.Item>
    )
  }

  return null
}
