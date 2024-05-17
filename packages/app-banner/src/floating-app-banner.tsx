import { Container, FlexBox, Text } from '@titicaca/core-elements'

interface AppBannerProps {
  onClose?: () => void
}

export function DesktopFloatingAppBanner({ onClose }: AppBannerProps) {
  return (
    <Container
      css={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100vw',
        backgroundColor: 'var(--color-kint5-brand1)',
        height: 160,
        textAlign: 'center',
      }}
    >
      <button
        css={{
          position: 'absolute',
          top: 16,
          right: 16,
        }}
        onClick={onClose}
      >
        <img
          src="https://assets.triple.guide/images/triple-korea/floating-banner-close.svg"
          width={24}
          height={24}
          alt=""
        />
      </button>
      <FlexBox
        flex
        flexDirection="row"
        css={{
          margin: '0 auto',
          width: 'fit-content',
        }}
      >
        <Container
          css={{
            position: 'relative',
            height: 160,
            width: 140,
          }}
        >
          <img
            src="https://assets.triple.guide/images/triple-korea/floating-banner-app-preview.png"
            width={140}
            height={182}
            alt=""
            css={{
              position: 'absolute',
              left: 0,
              bottom: 0,
            }}
          />
        </Container>
        <Container
          css={{
            marginLeft: 22,
            maxWidth: 390,
            textAlign: 'left',
          }}
        >
          <Text
            size={22}
            bold
            css={{
              color: '#FFE814',
              marginTop: 33,
              whiteSpace: 'nowrap',
            }}
          >
            韓国旅行のコンシェルジュTRIPLE Korea
          </Text>
          <Text
            size={11}
            css={{
              fontWeight: 400,
              marginTop: 12,
              color: '#fff',
            }}
          >
            韓国旅行をお考え中ですか？インターパークがリリスした韓国旅行専門アプリ
            「TRIPLE Korea」をダウンロードしてみてください。 QRコードでTRIPLE
            Koreaをダウンロード
          </Text>
        </Container>
        <Container
          css={{
            borderRadius: '50%',
            border: '2px solid #fff',
            width: 'fit-content',
            height: 'fit-content',
            padding: '20px 18px 23px',
            margin: '40px 0 0 60px',
          }}
        >
          <img
            src="https://assets.triple.guide/images/triple-korea/floating-banner-app-icon.svg"
            width={40}
            height={32.4}
            alt=""
          />
        </Container>
        <Container
          css={{
            width: 80,
            height: 80,
            borderRadius: 6,
            backgroundColor: '#fff',
            padding: 7,
            margin: '40px 0 0 16px',
          }}
        >
          <img
            src="https://assets.triple.guide/images/triple-korea/floating-banner-app-qrcode.png"
            width={66}
            height={66}
            alt=""
          />
        </Container>
      </FlexBox>
    </Container>
  )
}

interface MobileFloatingAppBannerProps extends AppBannerProps {
  bottomGap?: number
}

export function MobileFloatingAppBanner({
  bottomGap = 0,
  onClose,
}: MobileFloatingAppBannerProps) {
  return (
    <Container
      css={{
        position: 'fixed',
        bottom: bottomGap,
        left: 0,
        backgroundColor: 'var(--color-kint5-brand1)',
        width: '100vw',
        height: 170,
        textAlign: 'center',
      }}
    >
      <button
        css={{
          position: 'absolute',
          top: 16,
          right: 16,
        }}
        onClick={onClose}
      >
        <img
          src="https://assets.triple.guide/images/triple-korea/floating-banner-close.svg"
          width={24}
          height={24}
          alt=""
        />
      </button>
      <Text
        size={16}
        bold
        css={{
          marginTop: 32,
          color: '#fff',
        }}
      >
        韓国旅行のコンシェルジュTRIPLE Korea
      </Text>
      <a
        href="https://itunes.apple.com/app/id6476254427"
        css={{
          display: 'block',
          padding: '9px 0',
          borderRadius: 28,
          backgroundColor: '#fff',
          width: '193px',
          margin: '16px auto 0',
        }}
      >
        <Text
          size={12}
          bold
          css={{
            color: 'var(--color-kint5-brand1)',
          }}
        >
          App Storeからダウンロード
        </Text>
      </a>
      <a
        href="https://play.google.com/store/apps/details?id=com.interparktriple.kint5"
        css={{
          display: 'block',
          padding: '9px 0',
          borderRadius: 28,
          backgroundColor: '#fff',
          width: '193px',
          margin: '8px auto 0',
        }}
      >
        <Text
          size={12}
          bold
          css={{
            color: 'var(--color-kint5-brand1)',
          }}
        >
          Google Playからダウンロード
        </Text>
      </a>
    </Container>
  )
}
