import newWindow from './new-window'

test('새창열기 기능을 테스트합니다', () => {
  const href = 'https://triple.guide/'
  const routeExternally = jest.fn()

  const navigate = () => {}

  newWindow(
    {
      path: '/web-action/new-window',
      query: `href=${encodeURIComponent(href)}`,
    },
    { navigate, routeExternally },
  )

  expect(routeExternally).toHaveBeenCalledWith({ href, target: 'new' })
})
