/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  transpilePackages: [
    '@titicaca/tds-theme',
    '@titicaca/tds-ui',
    '@titicaca/triple-web',
    '@titicaca/triple-web-nextjs-pages',
  ],
}

export default nextConfig
