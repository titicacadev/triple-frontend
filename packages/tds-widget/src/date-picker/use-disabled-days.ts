import { useMemo } from 'react'
import moment from 'moment'
import { BeforeModifier, AfterModifier } from 'react-day-picker'

export interface DisableDaysProps {
  disabledDays?: string[]
  beforeBlock?: string
  afterBlock?: string
}

export default function useDisabledDays({
  disabledDays,
  beforeBlock,
  afterBlock,
}: DisableDaysProps) {
  return useMemo(
    () => [
      ...(disabledDays || []).map((date) => moment(date).toDate()),
      beforeBlock || afterBlock
        ? ({
            before: beforeBlock ? moment(beforeBlock).toDate() : undefined,
            after: afterBlock ? moment(afterBlock).toDate() : undefined,
          } as BeforeModifier | AfterModifier) // HACK: before, after 중 하나만 존재할 때 undefiend 속성값을 허용하지 않아 타입 체크를 우회.
        : undefined,
    ],
    [afterBlock, beforeBlock, disabledDays],
  )
}
