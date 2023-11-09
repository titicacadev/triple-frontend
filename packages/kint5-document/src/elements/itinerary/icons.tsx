import styled from 'styled-components'

interface IconDefaultProps {
  on?: boolean
  color?: string
  width?: number
  height?: number
}

interface ImageIconProps extends IconDefaultProps {
  /* icon name */
  name: string
}

const Icon = styled.svg`
  width: ${({ width = 36 }) => width}px;
  height: ${({ height = 36 }) => height}px;
`

function ImageIcon({
  width = 48,
  height = 48,
  name,
  ...props
}: ImageIconProps) {
  const src = `https://assets.triple.guide/images/${name}.png`
  return <img width={width} height={height} {...props} src={src} alt="" />
}

export function Bus(props: IconDefaultProps) {
  return (
    <ImageIcon
      name="ico_contents_trans_bus@3x"
      width={11}
      height={11}
      {...props}
    />
  )
}

export function Car(props: IconDefaultProps) {
  return (
    <ImageIcon
      name="ico_contents_trans_car@3x"
      width={11}
      height={11}
      {...props}
    />
  )
}

export function Walk(props: IconDefaultProps) {
  return (
    <ImageIcon
      name="ico_contents_trans_walk@3x"
      width={11}
      height={11}
      {...props}
    />
  )
}

export function Plane(props: IconDefaultProps) {
  return (
    <ImageIcon
      name="ico_contents_trans_plane@3x"
      width={11}
      height={11}
      {...props}
    />
  )
}

export function Tram(props: IconDefaultProps) {
  return (
    <ImageIcon
      name="ico_contents_trans_tram@3x-v2"
      width={11}
      height={11}
      {...props}
    />
  )
}

export function Cable(props: IconDefaultProps) {
  return (
    <ImageIcon
      name="ico_contents_trans_cable@3x"
      width={11}
      height={11}
      {...props}
    />
  )
}

export function Train(props: IconDefaultProps) {
  return (
    <ImageIcon
      name="ico_contents_trans_train@3x-v2"
      width={11}
      height={11}
      {...props}
    />
  )
}

export function Ship(props: IconDefaultProps) {
  return (
    <ImageIcon
      name="ico_contents_trans_ship@3x"
      width={11}
      height={11}
      {...props}
    />
  )
}

export function Download({
  color,
  width = 18,
  height = 18,
  ...rest
}: IconDefaultProps) {
  return (
    <Icon
      viewBox="0 0 18 18"
      fill="none"
      width={width}
      height={height}
      {...rest}
    >
      <path
        d="M11.5979 3.31982H13.8705C14.7642 3.31982 15.4875 4.05977 15.4875 4.97245V14.9372C15.4875 15.8499 14.7642 16.5898 13.8705 16.5898H3.83953C2.94587 16.5898 2.22253 15.8499 2.22253 14.9372V4.97245C2.22253 4.05977 2.94587 3.31982 3.83953 3.31982H6.1122"
        stroke="white"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.4348 9.20508L8.79114 11.9843"
        stroke="white"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.79168 1.18347V11.9847L6.14685 9.20547"
        stroke="white"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  )
}
