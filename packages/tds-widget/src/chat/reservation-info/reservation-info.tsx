import { useRef, useState, ForwardedRef, forwardRef } from 'react'
import { CSSProp } from 'styled-components'

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
  LayoutContainer,
  type LabelColor,
} from './elements'

export interface ReservationInfoProps {
  thumbnail: string
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
 * ThemeProvider와 함께 사용해 주세요.
 */
function ReservationInfoImpl(
  { details = [], thumbnail, label, title, ...props }: ReservationInfoProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const hasDetails = details.length > 0

  const [expanded, setExpanded] = useState(false)

  const contentContainerRef = useRef<HTMLDivElement>(null)

  return (
    <LayoutContainer ref={ref} {...props}>
      <Container>
        <ContentContainer expanded={expanded} ref={contentContainerRef}>
          {thumbnail ? <Thumbnail src={thumbnail} small={!hasDetails} /> : null}
          <DetailContainer>
            <TitleContainer>
              {label ? (
                <Label color={label.color} css={label.css}>
                  {label.text}
                </Label>
              ) : null}
              {title ? <Title expanded={expanded}>{title}</Title> : null}
              {hasDetails ? (
                <ArrowButton
                  expanded={expanded}
                  onClick={() => setExpanded(!expanded)}
                />
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
    </LayoutContainer>
  )
}

export const ReservationInfo = forwardRef(ReservationInfoImpl)
