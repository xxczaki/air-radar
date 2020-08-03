const withOptimizedImages = require('next-optimized-images');
const withOffline = require('next-offline');
const withTM = require('next-transpile-modules')(['geodesy']);

const nextConfig = {
	workboxOpts: {
		swDest: 'static/service-worker.js',
		runtimeCaching: [
			{
				urlPattern: /^https?.*/,
				handler: 'NetworkFirst',
				options: {
					cacheName: 'https-calls',
					networkTimeoutSeconds: 15,
					expiration: {
						maxEntries: 150,
						maxAgeSeconds: 30 * 24 * 60 * 60 // 1 month
					},
					cacheableResponse: {
						statuses: [0, 200]
					}
				}
			}
		]
	},
	reactStrictMode: true,
	experimental: {
		modern: true
	}
};

module.exports = withOptimizedImages((withOffline(withTM(nextConfig))));

