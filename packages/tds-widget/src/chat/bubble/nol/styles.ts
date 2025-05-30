import { css } from 'styled-components'

export const nolBackgroundColor = '#f9faff'

export const PARTNER_ROOM_BUBBLE_STYLE = {
  received: {
    alteredTextColor: 'var(--color-gray500)',
    css: css`
      color: var(--color-gray);
      line-height: 1.2;

      a {
        text-decoration: none;
      }
    `,
  },
  sent: {
    alteredTextColor: 'var(--color-white)',
    css: css`
      color: var(--color-gray);
      background-color: #d7e9ff;
      line-height: 1.2;

      a {
        color: var(--color-blue);
        text-decoration: none;
      }
    `,
  },
}

export const NOL_SPACING = {
  message: 6,
  messageGroup: 16,
  bubbleInfo: 4,
  failureHandler: 4,
  dateDivider: 20,
}

const NOL_BUBBLE_BASE_STYLE = css`
  font-size: 1.4rem;
  line-height: 1.9rem;
  font-weight: 400;
  padding: 12px 11px;
`

export const NOL_PARTNER_ROOM_BUBBLE_STYLE = {
  borderRadius: 24,
  arrowRadius: 4,
  white: {
    alteredTextColor: css`
      ${({ theme }) => theme.nol.colorNeutralB80}
    `,
    css: css`
      ${NOL_BUBBLE_BASE_STYLE}

      background-color: ${({ theme }) => theme.nol.colorNeutralW100};
      color: ${({ theme }) => theme.nol.colorNeutralB100};
      box-shadow: 0 0 0 1px #e4e7ff;

      a,
      button {
        color: ${({ theme }) => theme.nol.colorPrimaryNol};
      }

      a {
        text-decoration: underline;
      }

      button[disabled] {
        color: #b6b7bb;
      }
    `,
  },
  blue: {
    alteredTextColor: css`
      ${({ theme }) => theme.nol.colorNeutralW100}
    `,
    css: css`
      ${NOL_BUBBLE_BASE_STYLE}

      color: ${({ theme }) => theme.nol.colorNeutralW100};
      background-color: ${({ theme }) => theme.nol.colorPrimaryNol};

      a,
      button {
        color: inherit;
      }

      a {
        text-decoration: underline;
      }

      button[disabled] {
        color: #ffffff80;
      }
    `,
  },
}

const NOL_BUBBLE_INFO_BASE_STYLE = css`
  color: ${({ theme }) => theme.nol.colorNeutralG60};
  font-weight: 400;
`

const RETRY_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
  <path d="M12.1765 10.0957C11.4332 11.6604 9.83839 12.7422 7.99089 12.7422C5.43308 12.7422 3.35957 10.6687 3.35957 8.11086C3.35957 5.55305 5.43308 3.47954 7.99089 3.47954C9.96595 3.47954 11.6522 4.71586 12.3181 6.45682" stroke="white" stroke-width="1.3" stroke-linecap="round"/>
  <path d="M10.7359 6.33256L12.7017 6.60742L12.9765 4.64169" stroke="white" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`

const DELETE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
  <path d="M2 10L10 2" stroke="white" stroke-width="1.3" stroke-linecap="round"/>
  <path d="M2 2L10 10" stroke="white" stroke-width="1.3" stroke-linecap="round"/>
</svg>`

const getSVG = (svg: string) => {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

export const NOL_PARTNER_ROOM_BUBBLE_INFO_STYLE = {
  failureHandler: {
    css: css`
      border-radius: 8px;
      background-color: ${({ theme }) => theme.nol.colorBrandShoppingRed400};
      width: auto;
      position: relative;

      & > button {
        background-color: inherit;
        width: 27px;
        border: none;

        & > * {
          visibility: hidden;
        }

        &:first-of-type {
          background-image: url('${getSVG(RETRY_SVG)}');
          background-size: 16px 16px;
        }

        &:last-of-type {
          background-image: url('${getSVG(DELETE_SVG)}');
          background-size: 12px 12px;
        }
      }

      &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 1px;
        height: 16px;
        background-color: ${({ theme }) => theme.nol.colorNeutralW20};
      }
    `,
  },
  dateDivider: {
    css: css`
      ${NOL_BUBBLE_INFO_BASE_STYLE}
      margin-top: 40px;
      font-size: 1.2rem;
      line-height: 1.6rem;
    `,
  },
  dateTime: {
    css: css`
      ${NOL_BUBBLE_INFO_BASE_STYLE}

      font-size: 1rem;
      line-height: 1.4rem;
    `,
  },
  profile: {
    css: css`
      color: ${({ theme }) => theme.nol.colorNeutralG60};
      font-size: 1.1rem;
      line-height: 1.6rem;
      font-weight: 700;
      margin-bottom: 4px;
    `,
  },
  unreadCount: {
    css: css`
      color: ${({ theme }) => theme.nol.colorPrimaryNol};
    `,
  },
}
