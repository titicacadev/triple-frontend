import { PoiType } from '@titicaca/content-type-definitions'
import { Card, Container, FlexBoxItem, Text } from '@titicaca/tds-ui'
import { styled } from 'styled-components'

const PoiCardContainer = styled(Card)`
  padding: 16px 15px;
  flex: 1;
`

const CardWrapper = styled(FlexBoxItem)`
  min-width: 200px;
`

const Divider = styled.div`
  margin: 12px 0;
  height: 1px;
  background-color: var(--color-gray50);
`

const Thumbnail = styled(Container)`
  width: 40px;
  height: 40px;
  overflow: hidden;
  border-radius: 4px;
  position: absolute;
  background: var(--color-gray20);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const POI_IMAGE_PLACEHOLDERS_SMALL: {
  [key in PoiType]: string
} = {
  attraction: 'https://assets.triple.guide/images/ico_blank_see_small@2x.png',
  restaurant: 'https://assets.triple.guide/images/ico_blank_eat_small@2x.png',
  hotel: 'https://assets.triple.guide/images/ico_blank_hotel_small@2x.png',
}

export default function PoiCard({
  type,
  name,
  description,
  memo,
  comment,
  imageUrl,
  onClickPoiCard,
}: {
  type: PoiType
  name: string
  description: string
  memo?: string
  comment?: string
  imageUrl?: string
  onClickPoiCard: () => void
}) {
  return (
    <CardWrapper flexGrow={1} as="a" onClick={onClickPoiCard}>
      <PoiCardContainer
        shadow="medium"
        radius={6}
        css={{ marginTop: 5, marginBottom: 8 }}
      >
        <Thumbnail>
          <img
            src={imageUrl || POI_IMAGE_PLACEHOLDERS_SMALL[type]}
            alt={name}
          />
        </Thumbnail>
        <Container css={{ marginTop: 1, minHeight: 40, paddingLeft: 50 }}>
          <Text size={16} bold ellipsis>
            {name}
          </Text>
          <Text size={13} color="gray500" lineHeight={1.4} padding={{ top: 6 }}>
            {description}
          </Text>
          {memo ? (
            <Text size={14} margin={{ top: 10 }} maxLines={2} lineHeight="18px">
              {memo}
            </Text>
          ) : null}
        </Container>
        {comment ? (
          <>
            <Divider />
            <Container css={{ display: 'flex' }}>
              <Text
                size={13}
                bold
                color="blue"
                margin={{ right: 6 }}
                css={{ flexShrink: 0 }}
              >
                추천
              </Text>
              <Text size={13} wordBreak="keep-all">
                {comment}
              </Text>
            </Container>
          </>
        ) : null}
      </PoiCardContainer>
    </CardWrapper>
  )
}
