/** @type {import('next').NextConfig} */
const nextConfig = {

    webpack: (config, { isServer }) => {
        if (!isServer) {
          config.resolve = {
            ...config.resolve,
            fallback: {
              // fixes proxy-agent dependencies
              net: false,
              dns: false,
              fs: false,
              child_process: false,
              tls: false,
              assert: false,
              // fixes sentry dependencies
              process: false
            }
          };
        }
        return config;
      },
      sentry: {
        hideSourceMaps: true
      }
}

module.exports = nextConfig
