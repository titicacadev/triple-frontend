import {
  useState,
  ForwardedRef,
  forwardRef,
  useEffect,
  useLayoutEffect,
  useRef,
  ReactNode,
} from 'react'
import { CSSProp } from 'styled-components'

import ArrowTopIcon from '../icons/arrow-top-icon'

import {
  Container,
  ContentContainer,
  Thumbnail,
  DetailContainer,
  TitleContainer,
  Title,
  ArrowButton,
  Label,
  Details,
  type LabelColor,
} from './elements'

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

type ReservationInfoActionType = 'default' | 'link'

interface ReservationInfoActionPropsBase {
  type?: ReservationInfoActionType
}

interface DefaultReservationInfoActionProps
  extends ReservationInfoActionPropsBase {
  type?: 'default'
  onClick?: () => void
}

interface LinkReservationInfoActionProps
  extends ReservationInfoActionPropsBase {
  type?: 'link'
  onClick: () => void
}

type ReservationInfoActionProps =
  | DefaultReservationInfoActionProps
  | LinkReservationInfoActionProps

export type ReservationInfoProps = {
  thumbnail?: string
  label?: {
    text: string
    color?: LabelColor
    css?: CSSProp
  }
  details?: {
    label: string
    value: string | string[]
  }[]
  title: string
  /**
   * 커스텀 액션 영역. ReactNode를 전달하면 자유롭게 버튼이나 다른 요소를 배치할 수 있습니다.
   */
  actions?: ReactNode
} & ReservationInfoActionProps

/**
 * nol-theme-provider를 사용하는 컴포넌트 입니다.
 */
function ReservationInfoImpl(
  {
    type = 'default',
    details = [],
    thumbnail,
    label,
    title,
    onClick,
    actions,
    ...props
  }: ReservationInfoProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const hasDetails = type !== 'link' && details.length > 0

  const [expanded, setExpanded] = useState(false)
  const [expandable, setExpandable] = useState(hasDetails)

  const titleRef = useRef<HTMLDivElement>(null)

  useIsomorphicLayoutEffect(() => {
    if (type !== 'link' && titleRef.current && !expandable) {
      setExpandable(
        titleRef.current.scrollHeight > titleRef.current.clientHeight,
      )
    }
  }, [])

  const handleClick =
    expandable || (type === 'link' && onClick)
      ? () => {
          if (expandable) {
            setExpanded(!expanded)
          }
          onClick?.()
        }
      : undefined

  return (
    <Container ref={ref} {...props}>
      <ContentContainer>
        {thumbnail ? <Thumbnail src={thumbnail} small={!hasDetails} /> : null}
        <DetailContainer
          expanded={expanded}
          onClick={handleClick}
          css={handleClick ? { cursor: 'pointer' } : {}}
        >
          <TitleContainer>
            {title ? (
              <Title
                ref={titleRef}
                maxLines={expanded ? undefined : 1}
                css={{
                  paddingTop: hasDetails ? '1.5px' : '5.5px',
                }}
              >
                {title}
              </Title>
            ) : null}
            {label ? (
              <Label color={label.color} css={label.css}>
                {label.text}
              </Label>
            ) : null}
            {expandable || type === 'link' ? (
              <ArrowButton
                expandable={expandable}
                expanded={expanded}
                css={{ top: hasDetails ? '5px' : '9.5px' }}
              >
                <ArrowTopIcon />
              </ArrowButton>
            ) : null}
          </TitleContainer>
          {hasDetails && (
            <Details expanded={expanded}>
              {details.map(({ label, value }) => (
                <div key={label}>
                  <dt>{label}</dt>
                  {typeof value === 'string' ? (
                    <dd>{value}</dd>
                  ) : (
                    <div>
                      {value.map((_value, index) => (
                        <dd key={index}>{_value}</dd>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </Details>
          )}
        </DetailContainer>
      </ContentContainer>
      {actions}
    </Container>
  )
}

export const ReservationInfo = forwardRef(ReservationInfoImpl)
