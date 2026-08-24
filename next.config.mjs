let userConfig = undefined
try {
  userConfig = await import('./v0-user-next.config')
} catch (e) {
  // ignore error
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },
  async headers() {
    return [
      {
        // Every HTML page can also be served as text/markdown (see middleware.ts),
        // so the cached variant must be keyed on Accept. This has to live in the
        // config rather than the middleware: Next overwrites a middleware-set
        // Vary on rendered pages with its own RSC value.
        //
        // The three RSC tokens are Next's own — they are repeated here so adding
        // Accept does not drop them and break router-prefetch caching.
        source: '/:path*',
        headers: [
          {
            key: 'Vary',
            value:
              'RSC, Next-Router-State-Tree, Next-Router-Prefetch, Accept, Accept-Encoding',
          },
        ],
      },
    ]
  },
}

mergeConfig(nextConfig, userConfig)

function mergeConfig(nextConfig, userConfig) {
  if (!userConfig) {
    return
  }

  for (const key in userConfig) {
    if (
      typeof nextConfig[key] === 'object' &&
      !Array.isArray(nextConfig[key])
    ) {
      nextConfig[key] = {
        ...nextConfig[key],
        ...userConfig[key],
      }
    } else {
      nextConfig[key] = userConfig[key]
    }
  }
}

export default nextConfig
