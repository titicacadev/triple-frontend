import React from 'react'
import styled from 'styled-components'
import { Modal } from '@titicaca/modals'
import { Text } from '@titicaca/core-elements'

import useUserVerification from './use-user-verification'

export default function VerificationRequest({
  onCancel,
}: {
  onCancel: Function
}) {
  const {
    verificationState: { verified },
    initiateVerification,
  } = useUserVerification({
    forceVerification: true,
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
        휴대폰 인증(최초 1회)이 필요합니다.
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
        <path
          d="m0 0h3858v955h-3858z"
          fill="#efefef"
          transform="translate(-626 -375)"
        />
        <g fill="#fff">
          <path d="m0 0h375v812h-375z" transform="translate(-158 -301)" />
          <path d="m0 0h375v812h-375z" transform="translate(-158 -301)" />
          <rect
            height="47"
            rx="2"
            stroke="#368fff"
            width="176"
            x="-127.5"
            y="-38.5"
          />
        </g>
        <rect fill="#368fff" height="48" rx="2" width="130" x="57" y="-39" />
        <path
          d="m0 0h375v812h-375z"
          fill="#3a3a3a"
          opacity=".7"
          transform="translate(-158 -301)"
        />
        <rect fill="#fff" height="272" rx="6" width="295" x="-118" y="-40" />
        <g>
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
      </g>
    </SvgWithPositioning>
  )
}
