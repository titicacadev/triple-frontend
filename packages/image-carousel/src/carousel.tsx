import * as React from 'react'
import styled from 'styled-components'
import { FlickingEvent, FlickingOptions } from '@egjs/flicking'
import Flicking, { FlickingProps } from '@egjs/react-flicking'
import { Container, MarginPadding } from '@titicaca/core-elements'

export interface CarouselProps
  extends Partial<FlickingProps & FlickingOptions> {
  margin?: MarginPadding
  borderRadius?: number
  pageLabelRenderer: (params: { currentIndex: number }) => React.ReactNode
}

const CarouselContainer = styled(Container)`
  overflow: visible;

  img {
    pointer-events: none;
  }
`
const TopRightControl = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
`

export default class Carousel extends React.PureComponent<
  React.PropsWithChildren<CarouselProps>,
  { currentIndex: number }
> {
  static defaultProps: Partial<Carousel['props']> = {
    zIndex: 1,
    defaultIndex: 0,
    autoResize: true,
    horizontal: true,
    bounce: [0, 0],
    duration: 100,
  }

  state = { currentIndex: 0 }

  componentDidMount() {
    this.setState({
      currentIndex: this.props.defaultIndex || 0,
    })
  }

  handleMoveStart = (e: FlickingEvent) => {
    const { onMoveStart } = this.props

    onMoveStart && onMoveStart(e)
  }

  handleMove = (e: FlickingEvent) => {
    const { onMove } = this.props

    onMove && onMove(e)
  }

  handleMoveEnd = (e: FlickingEvent) => {
    const { onMoveEnd } = this.props

    this.setState({
      currentIndex: e.index,
    })

    onMoveEnd && onMoveEnd(e)
  }

  get flickingProps(): Partial<FlickingProps & FlickingOptions> {
    const {
      zIndex,
      defaultIndex,
      autoResize,
      horizontal,
      bounce,
      duration,
    } = this.props

    return {
      zIndex,
      defaultIndex,
      autoResize,
      horizontal,
      bounce,
      duration,
      collectStatistics: false,
      onMoveStart: this.handleMoveStart,
      onMove: this.handleMove,
      onMoveEnd: this.handleMoveEnd,
    }
  }

  render() {
    const { margin, borderRadius, pageLabelRenderer, children } = this.props
    const PageLabel: React.ComponentType<{ currentIndex: number }> = ({
      currentIndex,
    }) => {
      const Label = pageLabelRenderer({ currentIndex })

      return Label ? <TopRightControl>{Label}</TopRightControl> : null
    }

    return (
      <CarouselContainer
        position="relative"
        margin={margin}
        borderRadius={borderRadius}
      >
        <Flicking {...this.flickingProps}>{children}</Flicking>

        <PageLabel currentIndex={this.state.currentIndex} />
      </CarouselContainer>
    )
  }
}
