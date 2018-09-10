import React, { Component } from 'react'
import {
  Title,
  H3,
  H4,
  Paragraph,
  LineBreak,
  Rating,
  Icon,
  Label,
  ImagePager,
  Button,
  Accordion,
  Segment,
  List,
  TripleDocument,
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

  return <H3>{`오늘 ${hours}`}</H3>
}

function WeeklyBusinessHours({ readableBusinessHours }) {
  const hoursNotations = _.chain(readableBusinessHours)
    .groupBy('dayOfWeek')
    .mapValues((hoursArray) =>
      _.chain(hoursArray)
        .sortBy('from')
        .map(({ from, to }) => `${from} - ${to}`)
        .join(' / ')
        .value(),
    )
    .value()

  const description = _.chain(DAY_OF_WEEK_NAMES)
    .keys()
    .map(
      (dayOfWeek) =>
        `${DAY_OF_WEEK_NAMES[dayOfWeek]} ${hoursNotations[dayOfWeek] ||
          '휴무일'}`,
    )
    .join('\n')
    .value()

  return (
    <Paragraph>
      <LineBreak>{description}</LineBreak>
    </Paragraph>
  )
}

class BusinessHours extends Component {
  constructor() {
    super()

    this.state = { open: false }
  }

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
          이용가능시간, 휴무일
        </Accordion.Title>
        <Accordion.Folded active={open}>
          <TodayBusinessHours
            timeZone={timeZone}
            readableBusinessHours={readableBusinessHours}
          />
        </Accordion.Folded>
        <Accordion.Content active={open}>
          <WeeklyBusinessHours readableBusinessHours={readableBusinessHours} />
        </Accordion.Content>
      </Accordion>
    )
  }
}

function LocationSegment({ address, phone, url }) {
  return (
    <Segment>
      <List>
        <List.Item>
          <List.Icon name="map" size="small" />
          <List.Content>{address}</List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name="call" size="small" />
          <List.Content>{phone}</List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name="web" size="small" />
          <List.Content>{url}</List.Content>
        </List.Item>
        <Button.Container floated="right">
          <Button compact>현지에서 길묻기</Button>
          <Button compact>길찾기</Button>
        </Button.Container>
      </List>
    </Segment>
  )
}

export default class App extends Component {
  render() {
    const {
      names,
      addresses,
      phoneNumber,
      officialSiteUrl,
      reviewPoint,
      reviewsCount,
      scrapsCount,
      image,
      featuredContent,
      readableBusinessHours,
      fee,
      feeComment,
    } = humps.camelizeKeys(sample)

    const timeZone = 'Asia/Tokyo'

    return (
      <div>
        <Title>{names.ko}</Title>
        <div>{names.local}</div>
        <Label>
          <Rating score={reviewPoint} />
          {reviewsCount}
        </Label>
        <Label>
          <Icon name="save" size="tiny" />
          {scrapsCount}
        </Label>
        <ImagePager images={[image, image]} />
        <Button.Group>
          <Button icon="save">저장하기</Button>
          <Button icon="star">리뷰·별점</Button>
          <Button icon="map">위치보기</Button>
          <Button icon="share">공유하기</Button>
        </Button.Group>
        <LocationSegment
          address={addresses.ko || addresses.en || addresses.local}
          phone={phoneNumber}
          url={officialSiteUrl}
        />
        <BusinessHours
          timeZone={timeZone}
          readableBusinessHours={readableBusinessHours}
        />
        <H3>이용료</H3>
        <H4>{fee ? '유료' : '무료'}</H4>
        <Paragraph>
          <LineBreak>{feeComment}</LineBreak>
        </Paragraph>
        <TripleDocument>{featuredContent}</TripleDocument>
      </div>
    )
  }
}
