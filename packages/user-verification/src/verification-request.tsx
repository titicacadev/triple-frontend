import styled from 'styled-components'
import { Modal } from '@titicaca/modals'
import { Text } from '@titicaca/core-elements'

import { useUserVerification } from './use-user-verification'

/**
 * 구매 동선 등에서 인증 단계를 추가할 때 mount하는 컴포넌트입니다. 사용자가 인증 단계를 거치지 않았을 경우 Modal을 표시하고 인증을 요구합니다.

 */
function VerificationRequest({
  forceVerification,
  verificationContext,
  onCancel,
}: {
  /**
   * 컴포넌트 Mount와 동시에 인증 플로우로 유도할지 결정합니다.
   */
  forceVerification?: boolean
  /**
   * 사용자 인증이 이루어지는 맥락을 명시합니다.
   */
  verificationContext?: 'purchase' | 'cash'
  /**
   * Modal의 뒤로가기 액션에 대한 핸들러 함수입니다.
   */
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
  margin: 40px auto 10px;
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
