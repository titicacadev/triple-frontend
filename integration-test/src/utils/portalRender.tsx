import React, { ReactNode } from 'react'
import { render, RenderOptions } from '@testing-library/react'

export function portalRender(
  children: ReactNode,
  options?: Omit<RenderOptions, 'queries'>,
) {
  return render(
    <>
      {children}
      <div id="triple-portal" />
    </>,
    options,
  )
}
