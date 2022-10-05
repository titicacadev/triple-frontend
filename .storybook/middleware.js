const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function proxyMiddleware(router) {
  router.use(
    '/api',
    createProxyMiddleware({
      target:
        process.env.API_URI_BASE || 'https://triple-dev.titicaca-corp.com',
      changeOrigin: true,
    }),
  )
}
