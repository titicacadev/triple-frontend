const proxy = require('http-proxy-middleware')

module.exports = function proxyMiddleware(router) {
  router.use(
    '/api',
    proxy({
      target:
        process.env.API_URI_BASE || 'https://triple-dev.titicaca-corp.com',
      changeOrigin: true,
    }),
  ),
    router.use(
      '/reply-api',
      proxy({
        target: 'https://reply.proxy.triple-dev.titicaca-corp.com',
        pathRewrite: { '^/reply-api': '' },
        changeOrigin: true,
      }),
    )
}
