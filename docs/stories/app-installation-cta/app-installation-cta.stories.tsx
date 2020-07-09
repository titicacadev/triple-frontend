import React from 'react'
import { action } from '@storybook/addon-actions'
import { text, boolean, select } from '@storybook/addon-knobs'
import {
  ImageBanner,
  TextBanner,
  BannerCTA,
  FloatingButtonCTA,
  ChatbotCTA,
  BannerExitStrategy,
} from '@titicaca/app-installation-cta'

export default {
  title: 'app-installation-cta | AppInstallationCTA',
}

export function FloatingButton() {
  return (
    <FloatingButtonCTA
      appInstallLink={'https://triple.onelink.me/aZP6/21d43a81'}
      fixed={boolean('화면 고정', true)}
      trackEvent={() => {}}
      description={text('설명', '설명 텍스트가 들어갑니다.')}
      trackEventParams={{
        onShow: { ga: ['플로팅_설치하기_노출'] },
        onSelect: { ga: ['플로팅_설치하기_선택'] },
        onClose: { ga: ['플로팅_설치하기_닫기'] },
      }}
    />
  )
}

FloatingButton.story = {
  name: '트리플 앱 설치하기 버튼',
}

export function BaseImageBanner() {
  return (
    <ImageBanner
      imgUrl={text('이미지 URL', '')}
      installUrl={text('설치 URL', 'https://triple-dev.titicaca-corp.com')}
      onDismiss={action('banner dismissed')}
    />
  )
}

BaseImageBanner.story = {
  name: '이미지 배너',
}

export function BaseTextBanner() {
  return (
    <TextBanner
      message={text('표시할 메시지', '앱 다운로드시 가이드북 무료')}
      installUrl={text('설치 URL', 'https://triple-dev.titicaca-corp.com')}
    />
  )
}

BaseTextBanner.story = {
  name: '텍스트 배너',
}

export function BaseBannerCTA() {
  return (
    <div>
      <BannerCTA
        inventoryId={text(
          '표시할 배너의 인벤토리 ID',
          'app-install-cta-poi-v1',
        )}
        installUrl={text('설치 URL', 'https://triple-dev.titicaca-corp.com')}
        onDismiss={action('banner dismissed')}
      />

      <div style={{ height: '2000px' }} />
    </div>
  )
}

BaseBannerCTA.story = {
  name: '배너 CTA',
}

export function ChatBotBanner() {
  return (
    <div style={{ height: '600px', backgroundColor: '#fff' }}>
      <ChatbotCTA
        available={boolean('챗봇 사용 가능상태', false)}
        inventoryId={text(
          '표시할 배너의 인벤토리 ID',
          'app-install-cta-chatbot-v1',
        )}
        installUrl={text('설치 URL', 'https://triple.guide/magazine')}
        onDismiss={action('banner dismissed')}
      />
    </div>
  )
}

ChatBotBanner.story = {
  name: '챗봇 스타일 배너',
}

export function FloatingButtonWithChatBot() {
  return (
    <div style={{ height: '600px', backgroundColor: '#fff' }}>
      <FloatingButtonCTA
        exitStrategy={select(
          '플로팅 배너 퇴장 방식',
          [BannerExitStrategy.NONE, BannerExitStrategy.CHATBOT_READY],
          BannerExitStrategy.CHATBOT_READY,
        )}
        appInstallLink={'https://triple.onelink.me/aZP6/21d43a81'}
        fixed={true}
        trackEvent={() => {}}
        description="설명 텍스트가 들어갑니다."
        trackEventParams={{
          onShow: { ga: ['플로팅_설치하기_노출'] },
          onSelect: { ga: ['플로팅_설치하기_선택'] },
          onClose: { ga: ['플로팅_설치하기_닫기'] },
        }}
      />
      <ChatbotCTA
        available={boolean('챗봇 사용 가능상태', false)}
        inventoryId={text(
          '표시할 배너의 인벤토리 ID',
          'app-install-cta-chatbot-v1',
        )}
        installUrl={text('설치 URL', 'https://triple.guide/magazine')}
        onDismiss={action('banner dismissed')}
      />
    </div>
  )
}

FloatingButtonWithChatBot.story = {
  name: '챗봇 사용 가능시 플로팅 버튼 제거 예제',
}
