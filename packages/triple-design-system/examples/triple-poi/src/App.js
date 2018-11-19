import React, { Fragment, PureComponent } from 'react'
import {
  H1,
  H3,
  H4,
  HR1,
  HR2,
  Image,
  Paragraph,
  Rating,
  Container,
  Text,
  Icon,
  ImagePager,
  Button,
  Accordion,
  Segment,
  List,
  TripleDocument,
  Responsive,
  Navbar,
  Footer,
  AppBanner,
  PublicHeader,
} from '@titicaca/triple-design-system/src'
import sample from './sample.json'
import humps from 'humps'
import moment from 'moment-timezone'
import _ from 'lodash'

const DAY_OF_WEEK_NAMES = {
  1: '월',
  2: '화',
  3: '수',
  4: '목',
  5: '금',
  6: '토',
  7: '일',
}

function TodayBusinessHours({ timeZone, readableBusinessHours }) {
  const today = moment()
    .tz(timeZone)
    .day()

  const hours =
    _.chain(readableBusinessHours)
      .filter(({ dayOfWeek }) => dayOfWeek === today)
      .sortBy('from')
      .map(({ from, to }) => `${from} - ${to}`)
      .join(' / ')
      .value() || '휴무일'

  return (
    <Text bold color="blue" alpha={1} lineHeight={1.5}>{`오늘 ${hours}`}</Text>
  )
}

function WeeklyBusinessHours({ timeZone, readableBusinessHours }) {
  const today = moment()
    .tz(timeZone)
    .day()

  const hours = _.chain(readableBusinessHours)
    .groupBy('dayOfWeek')
    .mapValues(
      (hoursArray) =>
        _.chain(hoursArray)
          .sortBy('from')
          .map(({ from, to }) => `${from} - ${to}`)
          .join(' / ')
          .value() || '휴무일',
    )
    .value()

  const notations = _.chain(DAY_OF_WEEK_NAMES)
    .keys()
    .map((dayOfWeek) => ((parseInt(dayOfWeek) + today) % 7) + 1)
    .map((dayOfWeek) => `${DAY_OF_WEEK_NAMES[dayOfWeek]} ${hours[dayOfWeek]}`)
    .value()

  return (
    <>
      <Text bold color="blue" alpha={1} lineHeight={1.5}>
        {notations[notations.length - 1]}
      </Text>
      <Paragraph>{notations.slice(0, -1).join('\n')}</Paragraph>
    </>
  )
}

class BusinessHours extends PureComponent {
  state = { open: false }

  render() {
    const {
      props: { timeZone, readableBusinessHours },
      state: { open },
    } = this

    return (
      <Accordion>
        <Accordion.Title
          active={open}
          onClick={() => this.setState({ open: !open })}
        >
          <H3>이용가능시간, 휴무일</H3>
        </Accordion.Title>
        <Accordion.Folded active={open}>
          <TodayBusinessHours
            timeZone={timeZone}
            readableBusinessHours={readableBusinessHours}
          />
        </Accordion.Folded>
        <Accordion.Content active={open}>
          <WeeklyBusinessHours
            timeZone={timeZone}
            readableBusinessHours={readableBusinessHours}
          />
        </Accordion.Content>
      </Accordion>
    )
  }
}

function LocationSegment({ address, phone, url }) {
  return (
    <Segment margin={{ top: 10 }}>
      <List verticalGap={10}>
        <List.Item>
          <List.Icon name="map" size="small" />
          <List.Content>
            <Text size="small">{address}</Text>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name="call" size="small" />
          <List.Content>
            <Text size="small">{phone}</Text>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name="web" size="small" />
          <List.Content>
            <Text size="small">{url}</Text>
          </List.Content>
        </List.Item>
      </List>
      <Button.Container floated="right" margin={{ top: 15 }}>
        <Button compact>현지에서 길묻기</Button>
        <Button compact>길찾기</Button>
      </Button.Container>
    </Segment>
  )
}

function OptionalBasicInfoSection({
  poi: {
    directions,
    readableBusinessHours,
    fee,
    feeComment,
    estimatedDuration,
    tips,
  },
  timeZone,
}) {
  return (
    <Container margin={{ top: 30 }}>
      <List divided verticalGap={40}>
        {estimatedDuration && (
          <List.Item>
            <H3>권장체류시간</H3>
            <Paragraph margin={{ top: 5 }}>{estimatedDuration}</Paragraph>
          </List.Item>
        )}
        {directions && (
          <List.Item>
            <H3>가는방법</H3>
            <Paragraph margin={{ top: 5 }}>{directions}</Paragraph>
          </List.Item>
        )}
        {(readableBusinessHours || []).length > 0 && (
          <List.Item>
            <BusinessHours
              timeZone={timeZone}
              readableBusinessHours={readableBusinessHours}
            />
          </List.Item>
        )}
        {fee && (
          <List.Item>
            <H3 inline>이용료</H3>
            <H4 inline margin={{ left: 3 }}>
              {fee ? '유료' : '무료'}
            </H4>
            <Paragraph margin={{ top: 5 }}>{feeComment}</Paragraph>
          </List.Item>
        )}
        {(tips || []).length > 0 && (
          <List.Item>
            <H3>이곳의 이용팁</H3>
            {tips.map((tip, i) => (
              <Paragraph key={i} margin={{ top: 5 }}>
                {tip}
              </Paragraph>
            ))}
          </List.Item>
        )}
      </List>
    </Container>
  )
}

export default class App extends PureComponent {
  render() {
    const { source: poi } = humps.camelizeKeys(sample)
    const {
      names,
      addresses,
      phoneNumber,
      officialSiteUrl,
      reviewsRating,
      reviewsCount,
      scrapsCount,
      images,
      featuredContent,
      readableBusinessHours,
      directions,
      fee,
      feeComment,
      estimatedDuration,
      tips,
      externalLinks,
      pointGeolocation: {
        coordinates: [lng, lat],
      },
    } = poi

    const timeZone = 'Asia/Tokyo'

    return (
      <div>
        <Fragment>
          <Responsive maxWidth={599}>
            <AppBanner
              fixed
              title="트리플 - 해외여행 가이드"
              description="가이드북, 일정짜기, 길찾기, 맛집"
            />
          </Responsive>
          <Responsive minWidth={600}>
            <PublicHeader fixed />
          </Responsive>
        </Fragment>
        <Container
          centered
          minWidth={375}
          maxWidth={600}
          padding={{ top: 20, left: 30, right: 30 }}
        >
          <Text.Title>{names.ko}</Text.Title>
          <Text size="tiny" alpha={0.5}>
            {names.local}
          </Text>
          {(reviewsCount > 0 || scrapsCount > 0) && (
            <Container margin={{ top: 4 }}>
              {reviewsCount > 0 && (
                <>
                  <Rating score={reviewsRating} />
                  {` ${reviewsCount} `}
                </>
              )}
              {scrapsCount > 0 && (
                <>
                  <Icon name="save" size="tiny" />
                  {` ${scrapsCount}`}
                </>
              )}
            </Container>
          )}
        </Container>

        <Container
          centered
          minWidth={375}
          maxWidth={600}
          padding={{ top: 20, left: 20, right: 20 }}
        >
          <ImagePager images={images} />
          <Button.Group>
            <Button icon="saveEmpty">저장하기</Button>
            <Button icon="schedule">일정추가</Button>
            <Button icon="starEmpty">리뷰·별점</Button>
            <Button icon="share">공유하기</Button>
          </Button.Group>
        </Container>

        <HR1 margin={{ top: 8, left: 30, right: 30 }} />

        <Container
          centered
          minWidth={375}
          maxWidth={600}
          padding={{ top: 50, bottom: 30, left: 30, right: 30 }}
        >
          <TripleDocument>{featuredContent}</TripleDocument>
        </Container>

        <Container
          centered
          minWidth={375}
          maxWidth={600}
          padding={{ top: 50, bottom: 30, left: 30, right: 30 }}
        >
          <H1 margin={{ bottom: 20 }}>기본정보</H1>
          <Image
            size="mini"
            src={`https://maps.googleapis.com/maps/api/staticmap?key=AIzaSyB3tu84Pfb6F7zW16YughzMYtWGJKmJmFU&size=320x120&scale=2&center=${lat}%2C${lng}&zoom=16`}
          />
          <LocationSegment
            address={addresses.ko || addresses.en || addresses.local}
            phone={phoneNumber}
            url={officialSiteUrl}
          />
          <OptionalBasicInfoSection poi={poi} timeZone={timeZone} />
        </Container>

        <HR2 compact />

        <Container
          centered
          minWidth={375}
          maxWidth={600}
          padding={{ top: 50, bottom: 30, left: 30, right: 30 }}
        >
          <H1 margin={{ bottom: 10 }}>소셜 리뷰</H1>
          <List divided>
            {externalLinks.map(({ imageUrl, publisher, title, url }, i) => (
              <List.Item key={`external-link-${i}`} minHeight={106}>
                <Container floated="right" width="60" margin={{ top: 20 }}>
                  <Image src={imageUrl} frame="big" borderRadius={4} />
                </Container>
                <List.Content>
                  <H3 margin={{ top: 20 }}>{title}</H3>
                  <Text size="small" alpha={0.5} margin={{ top: 8 }}>
                    {publisher}
                  </Text>
                </List.Content>
              </List.Item>
            ))}
          </List>
        </Container>

        <Footer />
      </div>
    )
  }
}
