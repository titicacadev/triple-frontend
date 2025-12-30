import { useCallback } from 'react'
import { useTranslation } from '@titicaca/next-i18next'
import styled from 'styled-components'
import {
  Button,
  Container,
  Drawer,
  HR1,
  Section,
  Text,
  safeAreaInsetMixin,
  SafeAreaInsetMixinProps,
} from '@titicaca/core-elements'
import Popup from '@titicaca/popup'

const DrawerContentContainer = styled(Container)<SafeAreaInsetMixinProps>`
  ${safeAreaInsetMixin}
`

const IconContainer = styled.div`
  display: inline-block;
  height: 17px;
  margin-top: -2px;
  margin-bottom: -1px;
  margin-right: 2px;
  overflow-y: visible;
`

const Icon = styled.svg`
  display: block;
  width: 20px;
  height: 20px;
`

const CallButton = styled(Button)`
  font-size: 14px;
  line-height: 17px;
  padding-top: 16px;
  padding-bottom: 15px;
`

export default function AskToTheLocal({
  open,
  onClose,
  localName,
  localAddress,
  primaryName,
  phoneNumber,
  isDomestic,
}: {
  open: boolean
  onClose: () => void
  localName: string
  localAddress: string
  primaryName: string
  phoneNumber?: string
  isDomestic?: boolean
}) {
  const { t } = useTranslation('common-web')

  const handleCall = useCallback(() => {
    if (phoneNumber) {
      window.location.href = `tel:${phoneNumber}`
    }
  }, [phoneNumber])

  return (
    <Popup open={open} onClose={onClose} borderless>
      <Section
        css={{
          marginTop: 20,
        }}
      >
        <Text color="blue" size={36}>
          {localName}
        </Text>
        <Text margin={{ top: 10 }} size={28} css={{ lineHeight: '38px' }}>
          {localAddress}
        </Text>
        <HR1 compact css={{ marginTop: 20, marginBottom: 20 }} />
        <Text textStyle="M" alpha={0.7} css={{ marginBottom: 150 }}>
          {primaryName}
        </Text>
        {phoneNumber ? (
          <Drawer active={open}>
            <DrawerContentContainer
              css={{
                padding: '0 30px 10px',
                background: 'var(--color-white)',
              }}
            >
              <CallButton fluid borderRadius={4} onClick={handleCall}>
                <IconContainer>
                  <Icon viewBox="0 0 20 20">
                    <path
                      fill="#FFF"
                      fillRule="evenodd"
                      stroke="#FFF"
                      strokeWidth=".2"
                      d="M5.353 3.478L3.882 5.043c-.523.523-.51 1.613.035 2.99.607 1.53 1.782 3.214 3.308 4.74 1.525 1.526 3.21 2.7 4.74 3.307 1.379.547 2.467.558 2.99.035l1.565-1.565-2.701-2.606-2.076 2.171c-.168.168-.43.195-.626.065-1.005-.655-1.985-1.457-2.914-2.386-.927-.926-1.73-1.907-2.386-2.913-.13-.198-.101-.46.066-.627l2.17-2.17-2.7-2.606zm8.463 14.02c-.65 0-1.397-.163-2.218-.488-1.656-.656-3.46-1.91-5.08-3.53-1.621-1.62-2.874-3.425-3.53-5.08-.71-1.79-.643-3.234.187-4.064L4.74 2.771c.362-.36.954-.362 1.319 0l2.7 2.7c.176.176.274.41.274.66 0 .25-.098.484-.274.66l-1.88 1.88c.575.83 1.256 1.642 2.03 2.416.776.775 1.587 1.456 2.417 2.03l1.88-1.88c.363-.363.954-.363 1.319 0l2.7 2.701c.177.176.274.41.274.66 0 .25-.097.484-.274.66l-1.564 1.564c-.45.45-1.08.676-1.846.676h0z"
                    />
                  </Icon>
                </IconContainer>
                {t(['jeonhwahagi', '전화하기'])}
              </CallButton>
              {isDomestic ? null : (
                <Text
                  textStyle="S3"
                  alpha={0.5}
                  padding={{ top: 6, bottom: 0 }}
                >
                  {t([
                    'gugje-jeonhwa-yogeumi-bugwadoel-su-issseubnida.',
                    '국제 전화 요금이 부과될 수 있습니다.',
                  ])}
                </Text>
              )}
            </DrawerContentContainer>
          </Drawer>
        ) : null}
      </Section>
    </Popup>
  )
}
