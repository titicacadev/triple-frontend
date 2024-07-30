import { MenuItem } from './side-menu/type'

export const MIN_DESKTOP_WIDTH = 1142
export const TRANSITION_TIME = 250
export const HEADER_MOBILE_HEIGHT = 50
export const HEADER_DESKTOP_HEIGHT = 80
export const HEADER_SIDE_MENU_HASH = 'open.side-menu'

export const HEADER_ACTION_ITEMS = {
  login: {
    label: '로그인',
    href: '/login',
    eventAction: '헤더_로그인_선택',
  },
  booking: {
    label: '내 예약',
    href: '/my-bookings',
    eventAction: '헤더_내예약_선택',
  },
}

export const HEADER_SIDE_MENU_ITEMS: MenuItem[] = [
  {
    type: 'link',
    label: '내 예약',
    href: '/my-bookings',
    eventAction: '내예약_선택',
  },
  {
    type: 'link',
    label: '도시별 여행정보',
    href: '/trips/intro',
    eventAction: '라운지홈_선택',
    tooltipDescription: '무료로 확인해 보세요!',
  },
  {
    type: 'link',
    label: 'AI 추천 맞춤일정',
    href: '/trips/promotion/customized-schedule',
    eventAction: '맞춤일정_선택',
  },
  {
    type: 'accordion',
    label: '여행상품',
    defaultOpen: true,
    subItems: [
      {
        type: 'link',
        label: '항공',
        href: '/air',
        eventAction: '항공_선택',
      },
      {
        type: 'link',
        label: '숙소',
        href: '/hotels',
        eventAction: '숙소_선택',
      },
      {
        type: 'link',
        label: '투어·티켓',
        href: '/tna',
        eventAction: '투어티켓_선택',
      },
    ],
  },
]
