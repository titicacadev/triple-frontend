import React from 'react'
import { Confirm } from '@titicaca/modals'

import useUserVerification from './use-user-verification'

export default function VerificationRequest({
  onCancel,
}: {
  onCancel: Function
}) {
  const { verifiedContact, initiateVerification } = useUserVerification({
    forceVerification: true,
  })

  return (
    <Confirm
      title="인증이 필요해요!"
      open={!verifiedContact}
      onConfirm={() => initiateVerification()}
      onCancel={() => onCancel()}
    >
      예약을 위해서는
      <br />
      휴대폰 인증(최초 1회)이 필요합니다.
    </Confirm>
  )
}
