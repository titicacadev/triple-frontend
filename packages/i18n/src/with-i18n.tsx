import React from 'react'
import { withTranslation, WithTranslation } from 'react-i18next'

export default function withI18n<T extends WithTranslation, S, L>(
  Component: React.ComponentType<T>,
): React.ComponentType<T> {
  const WrappedComponent = withTranslation()(Component)

  const NewComponent = (props: T) => (
    <WrappedComponent {...props} useSuspense={false} />
  )

  return NewComponent
}
