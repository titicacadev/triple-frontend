import {
  useState,
  ForwardedRef,
  forwardRef,
  useEffect,
  useLayoutEffect,
  useRef,
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

export interface ReservationInfoProps {
  onClick?: () => void
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
}

/**
 * nol-theme-provider를 사용하는 컴포넌트 입니다.
 */
function ReservationInfoImpl(
  {
    details = [],
    thumbnail,
    label,
    title,
    onClick,
    ...props
  }: ReservationInfoProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const hasDetails = details.length > 0

  const [expanded, setExpanded] = useState(false)
  const [expandable, setExpandable] = useState(hasDetails)

  const titleRef = useRef<HTMLDivElement>(null)

  useIsomorphicLayoutEffect(() => {
    if (titleRef.current && !expandable) {
      setExpandable(
        titleRef.current.scrollHeight > titleRef.current.clientHeight,
      )
    }
  }, [])

  return (
    <Container ref={ref} {...props}>
      <ContentContainer>
        {thumbnail ? <Thumbnail src={thumbnail} small={!hasDetails} /> : null}
        <DetailContainer
          expanded={expanded}
          onClick={
            expandable
              ? () => {
                  setExpanded(!expanded)
                  onClick?.()
                }
              : undefined
          }
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
            {expandable ? (
              <ArrowButton
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
    </Container>
  )
}

export const ReservationInfo = forwardRef(ReservationInfoImpl)
