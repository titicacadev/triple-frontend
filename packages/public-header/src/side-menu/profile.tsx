import { Container, FlexBox, Text } from '@titicaca/core-elements'
import { useEventTrackingContext, useUser } from '@titicaca/react-contexts'
import styled from 'styled-components'

const Link = styled.a`
  font-size: 24px;
  font-weight: bold;
  text-decoration-line: underline;
  color: var(--color-gray);
`

const SocialIcon = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 6px;
`

const ProfileImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  box-shadow: 0 0 0 1px rgba(54, 54, 54, 0.02);
  outline-offset: -1px;
`

const Badge = styled.img`
  position: absolute;
  right: -8px;
  bottom: -4px;
  width: 30px;
  height: 30px;
`

const UserName = styled(Text)`
  margin-bottom: 4px;
  font-size: 24px;
  font-weight: bold;
`

const UserEmailOrProvider = styled(Text)`
  display: flex;
  align-items: flex-start;
  word-break: break-all;
  font-size: 13px;
  color: var(--color-gray600);
`

const PROVIDER_INFO = {
  TRIPLE: {
    label: '트리플',
    icon: undefined,
  },
  APPLE: {
    label: '애플',
    icon: 'https://assets.triple.guide/images/header/icon_apple@4x.png',
  },
  KAKAO: {
    label: '카카오',
    icon: 'https://assets.triple.guide/images/header/icon_kakao@4x.png',
  },
  FACEBOOK: {
    label: '페이스북',
    icon: 'https://assets.triple.guide/images/header/icon_facebook@4x.png',
  },
  NAVER: {
    label: '네이버',
    icon: 'https://assets.triple.guide/images/header/icon_naver@4x.png',
  },
  INVALID: {
    label: '',
    icon: undefined,
  },
}

const PROFILE_EVENT_METADATA_LABEL = {
  name: '닉네임',
  photo: '프로필사진',
}

const NOL_CONNECTED_LABEL = 'NOL 멤버스 계정'

export function Profile() {
  const user = useUser()
  const returnUrl = encodeURIComponent(location.href)
  const { trackEvent } = useEventTrackingContext()

  const onLoginClick = () => {
    trackEvent({ fa: { category: '메인메뉴', action: '로그인_선택' } })
  }

  if (!user) {
    return (
      <FlexBox flex css={{ padding: '20px 20px 30px', alignItems: 'center' }}>
        <Link href={`/login?returnUrl=${returnUrl}`} onClick={onLoginClick}>
          로그인
        </Link>
        <Text size={24} bold css={{ marginTop: -3 }}>
          /
        </Text>
        <Link href={`/login?returnUrl=${returnUrl}`} onClick={onLoginClick}>
          회원가입
        </Link>
      </FlexBox>
    )
  }

  const { provider, email, nolConnected, mileage } = user

  const { icon: providerIconSrc, label: providerLabel } =
    PROVIDER_INFO[provider] || {}
  const profileLabel = nolConnected
    ? NOL_CONNECTED_LABEL
    : email || providerLabel

  const badgeUrl = mileage?.badges[0]?.icon.image_url

  const onProfileClick = (
    referrer: keyof typeof PROFILE_EVENT_METADATA_LABEL,
  ) => {
    trackEvent({
      fa: {
        category: '메인메뉴',
        action: '프로필_선택',
        label: PROFILE_EVENT_METADATA_LABEL[referrer],
      },
    })
  }

  return (
    <FlexBox
      flex
      css={{ padding: 20, justifyContent: 'space-between', gap: 16 }}
    >
      <Container>
        <UserName onClick={() => onProfileClick('name')}>{user.name}</UserName>
        <UserEmailOrProvider>
          {!nolConnected && providerIconSrc ? (
            <SocialIcon src={providerIconSrc} alt="social login icon" />
          ) : null}
          {profileLabel}
        </UserEmailOrProvider>
      </Container>

      <Container
        css={{ position: 'relative', minWidth: 60, height: 60 }}
        onClick={() => onProfileClick('photo')}
      >
        <ProfileImage src={user.photo} alt="profile" />
        {badgeUrl ? <Badge src={badgeUrl} alt="badge" /> : null}
      </Container>
    </FlexBox>
  )
}
