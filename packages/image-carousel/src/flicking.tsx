// import React, { useState } from "react";
import * as React from 'react'
import styled from 'styled-components'
import { FlickingEvent } from '@egjs/flicking'
import Flicking from '@egjs/react-flicking'
import { Container, MarginPadding } from '@titicaca/triple-design-system'

export interface PageChangeEvent extends FlickingEvent {}
export interface FlickingProps {
  margin?: MarginPadding
  borderRadius?: number
  currentPage?: number
  onPageChange?: (e?: PageChangeEvent) => void
  pageLabelComponent?: (props: any) => JSX.Element
  children?: React.ReactNode
}

const TopRightControl = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
`

export default class Pager extends React.PureComponent<FlickingProps> {
  state = {
    currentSlide: 0,
  }

  componentDidMount() {
    this.setState({
      ...this.state,
      currentSlide: this.props.currentPage || 0,
    })
  }

  handleMoveEnd = (e: FlickingEvent) => {
    const { onPageChange } = this.props

    this.setState({
      ...this.state,
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
    const { currentSlide } = this.state

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
          onMoveEnd={this.handleMoveEnd}
          duration={100}
        >
          {children}
        </Flicking>
        {pageLabelComponent && (
          <TopRightControl>
            {pageLabelComponent({ currentSlide })}
          </TopRightControl>
        )}
      </Container>
    )
  }
}
// const Pager = ({
//   margin,
//   borderRadius,
//   currentPage,
//   onPageChange,
//   pageLabelComponent,
//   children,
// }: FlickingProps) => {
//   const [currentSlide, setCurrentSlide] = useState(currentPage || 0)
//   const handleMoveEnd = (e: FlickingEvent) => {
//     setCurrentSlide(e.index)
//     onPageChange && onPageChange(e)
//   }

//   return (
//     <Container position="relative" margin={margin} borderRadius={borderRadius}>
//       <Flicking
//         collectStatistics={false}
//         zIndex={1}
//         defaultIndex={currentPage || 0}
//         autoResize={true}
//         horizontal={true}
//         onMoveEnd={handleMoveEnd}
//         duration={100}
//       >
//         {children}
//       </Flicking>
//       {pageLabelComponent && (
//         <TopRightControl>
//           {pageLabelComponent({ currentSlide })}
//         </TopRightControl>
//       )}
//     </Container>
//   )
// }

// export default Pager
