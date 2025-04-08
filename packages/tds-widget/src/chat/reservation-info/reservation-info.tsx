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
 * 색상 변경이 필요한 경우, ReservationInfoThemeProvider와 함께 사용해 주세요.
 */
function ReservationInfoImpl(
  { details = [], thumbnail, label, title, ...props }: ReservationInfoProps,
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
      <ContentContainer
        css={{ alignItems: hasDetails || expanded ? 'flex-start' : 'center' }}
      >
        {thumbnail ? <Thumbnail src={thumbnail} small={!hasDetails} /> : null}
        <DetailContainer expanded={expanded}>
          <TitleContainer>
            {title ? (
              <Title ref={titleRef} maxLines={expanded ? undefined : 1}>
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
                onClick={() => setExpanded(!expanded)}
                css={{ top: hasDetails ? '5px' : '10px' }}
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
