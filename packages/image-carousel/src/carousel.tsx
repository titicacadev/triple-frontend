import * as React from 'react'
import styled from 'styled-components'
import EGFlicking, { FlickingEvent } from '@egjs/flicking'
import Flicking, { FlickingProps } from '@egjs/react-flicking'
import { Container, MarginPadding } from '@titicaca/triple-design-system'

const { NEXT: DIRECTION_NEXT } = EGFlicking.DIRECTION

export interface CarouselProps extends Partial<FlickingProps> {
  margin: MarginPadding
  borderRadius: number
  pageLabelComponent: (props: any) => JSX.Element
  children: React.ReactNode
  showMoreComponentHandler: (index: number) => React.ReactNode
  [key: string]: any
}

const TopRightControl = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
`

export class Carousel extends React.PureComponent<Partial<CarouselProps>> {
  static defaultProps: Partial<CarouselProps> = {
    zIndex: 1,
    defaultIndex: 0,
    autoResize: true,
    horizontal: true,
    bounce: [0, 0],
    duration: 100,
  }

  state = {
    currentIndex: 0,
    pageVisibility: true,
  }

  componentDidMount() {
    this.setState({
      currentIndex: this.props.defaultIndex || 0,
    })
  }

  handleMoveStart = (e: FlickingEvent) => {
    const { index, direction } = e
    const { onMoveStart, showMoreComponentHandler } = this.props
    const newIndex = index + (direction === DIRECTION_NEXT ? 1 : -1)

    this.setState({
      pageVisibility: !showMoreComponentHandler(newIndex),
    })

    onMoveStart && onMoveStart(e)
  }

  handleMove = (e: FlickingEvent) => {
    const { onMove } = this.props

    onMove && onMove(e)
  }

  handleMoveEnd = (e: FlickingEvent) => {
    const { index } = e
    const { onMoveEnd, showMoreComponentHandler } = this.props

    this.setState({
      pageVisibility: !showMoreComponentHandler(index),
      currentIndex: e.index,
    })

    onMoveEnd && onMoveEnd(e)
  }

  get flickingProps() {
    return {
      ...this.props,
      collectStatistics: false,
      onMoveStart: this.handleMoveStart,
      onMove: this.handleMove,
      onMoveEnd: this.handleMoveEnd,
    }
  }

  render() {
    const { margin, borderRadius, children, pageLabelComponent } = this.props
    const { currentIndex, pageVisibility } = this.state

    return (
      <Container
        position="relative"
        margin={margin}
        borderRadius={borderRadius}
      >
        <Flicking {...this.flickingProps}>{children}</Flicking>

        {pageVisibility && pageLabelComponent && (
          <TopRightControl>
            {pageLabelComponent({ currentIndex })}
          </TopRightControl>
        )}
      </Container>
    )
  }
}

export default Carousel
