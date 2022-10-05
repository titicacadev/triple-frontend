import styled from 'styled-components'
import { Modal } from '@titicaca/modals'
import { Text } from '@titicaca/core-elements'

import { useUserVerification } from './use-user-verification'

function VerificationRequest({
  forceVerification,
  verificationContext,
  onCancel,
}: {
  forceVerification?: boolean
  verificationContext?: 'purchase' | 'cash'
  onCancel: () => void
}) {
  const {
    verificationState: { verified },
    initiateVerification,
  } = useUserVerification({
    verificationContext,
    forceVerification:
      typeof forceVerification !== 'undefined' ? forceVerification : true,
  })

  return (
    <Modal open={verified === false}>
      <Icon />
      <Text bold center size="big" color="gray" margin={{ bottom: 10 }}>
        인증이 필요해요!
      </Text>
      <Text
        center
        size="small"
        lineHeight={1.38}
        color="gray"
        alpha={0.7}
        margin={{ bottom: 40 }}
      >
        예약을 위해서는
        <br />
        휴대폰 인증이 필요합니다. (최초 1회)
      </Text>
      <Modal.Actions>
        <Modal.Action onClick={() => onCancel()}>뒤로가기</Modal.Action>
        <Modal.Action onClick={() => initiateVerification()} color="blue">
          인증하기
        </Modal.Action>
      </Modal.Actions>
    </Modal>
  )
}

const SvgWithPositioning = styled.svg`
  display: block;
  margin: 40px auto 10px auto;
`

function Icon() {
  return (
    <SvgWithPositioning
      height="60"
      viewBox="0 0 60 60"
      width="60"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" fillRule="evenodd">
        <rect
          fill="#368fff"
          height="46.08"
          rx="3.84"
          width="30.08"
          x="14"
          y="7"
        />
        <path d="m17.2 10.84h23.68v37.12h-23.68z" fill="#fff" />
        <g stroke="#fff" strokeWidth="1.92">
          <circle cx="41.84" cy="42.52" fill="#3d8bf7" r="11.2" />
          <path
            d="m37.68 41.796 3.115 3.115 5.271-5.271"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </g>
    </SvgWithPositioning>
  )
}

export default VerificationRequest
