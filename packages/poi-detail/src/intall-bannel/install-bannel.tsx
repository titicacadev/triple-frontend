import React from 'react'
import { Image } from '@titicaca/core-elements'
import { StaticIntersectionObserver } from '@titicaca/intersection-observer'

import { Bannel } from './type'

interface BannelProps {
  bannel: Bannel
}

export default function InstallBannel({ bannel }: BannelProps) {
  return (
    <StaticIntersectionObserver threshold={0.7} onChange={() => null}>
      <div>
        <Image borderRadius={6}>
          <Image.FixedRatioFrame frame="huge" onClick={() => null}>
            <Image.Img src={bannel && bannel.image} />
            <Image.Overlay
              padding={{ top: 16, bottom: 16, left: 16, right: 26 }}
            ></Image.Overlay>
          </Image.FixedRatioFrame>
        </Image>
      </div>
    </StaticIntersectionObserver>
  )
}
