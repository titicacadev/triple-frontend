import * as React from 'react'
import styled from 'styled-components'
import EGFlicking, { FlickingEvent } from '@egjs/flicking'
import Flicking from '@egjs/react-flicking'
import { Container, MarginPadding } from '@titicaca/triple-design-system'

const { NEXT: DIRECTION_NEXT } = EGFlicking.DIRECTION

export interface FlickingProps {
  margin?: MarginPadding
  borderRadius?: number
  currentPage?: number
  totalCount?: number
  onBeforePageChange?: (e?: FlickingEvent) => void
  onPageMove?: (e?: FlickingEvent) => void
  onPageChange?: (e?: FlickingEvent) => void
  pageLabelComponent?: (props: any) => JSX.Element
  children?: React.ReactNode
}

const TopRightControl = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
`

export class Pager extends React.PureComponent<FlickingProps> {
  state = {
    currentSlide: 0,
    pageVisibility: true,
  }

  componentDidMount() {
    this.setState({
      ...this.state,
      currentSlide: this.props.currentPage || 0,
    })
  }

  handleMoveStart = (e: FlickingEvent) => {
    const { index, direction } = e
    const { onBeforePageChange, totalCount } = this.props
    let { pageVisibility } = this.state

    if (
      (index === totalCount - 2 && direction === DIRECTION_NEXT) ||
      index === totalCount - 1
    ) {
      pageVisibility = false
    } else {
      pageVisibility = true
    }

    this.setState({ pageVisibility })

    onBeforePageChange && onBeforePageChange(e)
  }

  handleMove = (e: FlickingEvent) => {
    const { onPageMove } = this.props

    onPageMove && onPageMove(e)
  }

  handleMoveEnd = (e: FlickingEvent) => {
    const { index } = e
    const { onPageChange, totalCount } = this.props
    let { pageVisibility } = this.state

    if (index <= totalCount - 2) {
      pageVisibility = true
    }

    this.setState({
      pageVisibility,
      currentSlide: e.index,
    })

    onPageChange && onPageChange(e)
  }

  render() {
    const {
      margin,
      borderRadius,
      currentPage,
      children,
      pageLabelComponent,
    } = this.props
    const { currentSlide, pageVisibility } = this.state

    return (
      <Container
        position="relative"
        margin={margin}
        borderRadius={borderRadius}
      >
        <Flicking
          collectStatistics={false}
          zIndex={1}
          defaultIndex={currentPage || 0}
          autoResize={true}
          horizontal={true}
          bounce={[0, 0]}
          onMoveStart={this.handleMoveStart}
          onMove={this.handleMove}
          onMoveEnd={this.handleMoveEnd}
          duration={100}
        >
          {children}
        </Flicking>
        {pageVisibility && pageLabelComponent && (
          <TopRightControl>
            {pageLabelComponent({ currentSlide })}
          </TopRightControl>
        )}
      </Container>
    )
  }
}

export default Pager
