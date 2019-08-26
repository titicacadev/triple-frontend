import React, { PureComponent } from 'react'
import { Carousel } from '@titicaca/triple-design-system'

export default class App extends PureComponent {
  render() {
    return (
      <div>
        <Carousel className="default-carousel">
          {[...Array(3)].map((_, i) => (
            <Carousel.Item key={i} className="default-carousel-item">
              Carousel Item
            </Carousel.Item>
          ))}
        </Carousel>

        <Carousel
          margin={{ top: 40, left: 30, right: 20, bottom: 10 }}
          className="carousel-with-margin"
        >
          {[...Array(3)].map((_, i) => (
            <Carousel.Item key={i}>Carousel Item</Carousel.Item>
          ))}
        </Carousel>

        <Carousel
          containerPadding={{ left: 30, right: 20 }}
          className="carousel-with-container-padding"
        >
          {[...Array(3)].map((_, i) => (
            <Carousel.Item key={i}>Carousel Item</Carousel.Item>
          ))}
        </Carousel>
      </div>
    )
  }
}
