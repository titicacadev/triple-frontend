import React, { PureComponent } from 'react'
import ReviewsList from '@titicaca/review'
import { storiesOf } from '@storybook/react'
// import Reviews from './reviews-list.sample.json'
import fetch from 'isomorphic-fetch'

class ReviewListStoriesComponent extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      reviews: undefined,
    }
  }

  async fetchSampleReviews() {
    const response = await fetch(
      // dev 유니버셜 스튜디오 재팬
      '/api/pois/37cd28e1-ef29-4ac5-8821-3bbdc8d52908/review',
    )
    const { data: reviews } = await response.json()
    this.setState({ reviews })
  }

  componentDidMount() {
    this.fetchSampleReviews()
  }

  render() {
    const { reviews } = this.state
    return reviews ? <ReviewsList reviews={reviews} /> : null
  }
}

storiesOf('ReviewsList', module).add('일반', () => (
  <ReviewListStoriesComponent />
))
