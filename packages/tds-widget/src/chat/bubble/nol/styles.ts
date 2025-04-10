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
  padding: 12px 16px;
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

      a {
        color: ${({ theme }) => theme.nol.colorPrimaryNol};
        text-decoration: underline;
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

      a {
        color: inherit;
        text-decoration: underline;
      }
    `,
  },
}

const NOL_BUBBLE_INFO_BASE_STYLE = css`
  color: ${({ theme }) => theme.nol.colorNeutralG60};
  font-weight: 400;
`

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
          background-image: url('https://assets.triple.guide/images/partners-center/talk_send_16.svg');
          background-size: 16px 16px;
        }

        &:last-of-type {
          background-image: url('https://assets.triple.guide/images/partners-center/close_12.svg');
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
