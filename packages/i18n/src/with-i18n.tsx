import React from 'react'
import { WithTranslation } from 'react-i18next'

import useI18n from './use-i18n'

export default function withI18n<T extends WithTranslation>(
  Component: React.ComponentType<T>,
): React.ComponentType<T> {
  const NewComponent = (props: T) => {
    const i18nProps = useI18n()

    return <Component {...props} {...i18nProps} />
  }

  return NewComponent
}
