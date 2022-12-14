import styled from 'styled-components'
import { Property } from 'csstype'
import { HTMLAttributes } from 'react'

import { Container, ContainerProps } from '../container'

export interface FlexBoxProps
  extends Omit<FlexItemOwnProps, 'flex'>,
    HTMLAttributes<Element> {
  /**
   * boolean
   */
  flex?: boolean
  /**
   * 아이템을 배치할 때 사용할 주축 및 방향(정방향, 역방향)을 지정합니다.
   * */
  flexDirection?: Property.FlexDirection
  /**
  * 컨테이너 내부의 아이템들을 강제로 한줄에 배치되게 할 것인지, 또는 가능한
        영역 내에서 벗어나지 않고 여러행으로 나누어 표현 할 것인지 결정하는
        속성입니다.
  * */
  flexWrap?: Property.FlexWrap
  /**
   * JustifyContent 는 주축 정렬을 제어합니다.
   * */
  justifyContent?: Property.JustifyContent
  /**
   * align-items 는 교차축 정렬을 제어합니다.
   * */
  alignItems?: Property.AlignItems
  alignContent?: Property.AlignContent
  /**
   * Gap은 행과 열 사이의 간격(거터)을 설정합니다.
   * */
  gap?: Property.Gap
  columnGap?: Property.ColumnGap
  rowGap?: Property.RowGap
}

export interface FlexItemOwnProps extends ContainerProps {
  /**
   * boolean
   */
  flex?: Property.Flex
  /**
   * flexGrow 는 컨테이너 요소 내부에서 할당 가능한 공간의 정도를 선언합니다.
   */
  flexGrow?: Property.FlexGrow
  /**
  * 컨테이너에 속한 아이템 크기가 컨테이너 보다 클 때 flexShrink 를 이용하면
        값에 따라 컨테이너에 맞게 축소됩니다.
  * */
  flexShrink?: Property.FlexShrink
  flexBasis?: Property.FlexBasis
  alignSelf?: Property.AlignSelf
  /**
   * order를 이용하여 컴포넌트 순서를 조절 할 수 있습니다.
   * */
  order?: Property.Order
}

const FlexItem = styled(Container)<FlexItemProps>((props) => ({
  flex: props.flex,
  flexGrow: props.flexGrow,
  flexShrink: props.flexShrink,
  flexBasis: props.flexBasis,
  alignSelf: props.alignSelf,
  order: props.order,
}))
export type FlexItemProps = FlexItemOwnProps & HTMLAttributes<Element>

const StyledFlexBox = styled(Container)<FlexBoxProps>((props) => ({
  display: props.flex ? 'flex' : undefined,
  flexDirection: props.flexDirection,
  flexWrap: props.flexWrap,
  justifyContent: props.justifyContent,
  alignItems: props.alignItems,
  alignContent: props.alignContent,
  gap: props.gap,
  columnGap: props.columnGap,
  rowGap: props.rowGap,
  flexGrow: props.flexGrow,
  flexShrink: props.flexShrink,
  flexBasis: props.flexBasis,
  alignSelf: props.alignSelf,
  order: props.order,
}))

/**
 * flex 속성을 추가하면 display: flex 가 적용됩니다.
 * FlexBox 는 Container 를 상속받아 구성되어있기 때문에 Container 의 Prop
 * 을 그대로 이용 할 수 있습니다.
 *
 * flex children 요소가 사용 가능한 flex, flexGrow, flexShrink, flexBasis,
 * alignSelf, order는 중첩된 구조의 flex 사용 시에만 사용 권장합니다.
 */
export const FlexBox = (props: FlexBoxProps) => {
  return <StyledFlexBox {...props} />
}

FlexBox.Item = FlexItem
