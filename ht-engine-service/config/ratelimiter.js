module.exports = {
    development: {
        redis: {
            name: 'redisCache',
            partition: 'limit',
            url: process.env.GATEWAY_REDIS_LIMITER_URL,
            pools: {
                ratelimiter: {
                    expiresIn: 5000
                }
            }
        },
        maximalRequests: 3
    },
    test: {
        redis: {
            name: 'redisCache',
            partition: 'limit',
            url: process.env.GATEWAY_REDIS_LIMITER_URL,
            pools: {
                ratelimiter: {
                    expiresIn: 600000
                }
            }
        },
        maximalRequests: 3
    },
    staging: {
        redis: {
            name: 'redisCache',
            partition: 'limit',
            url: process.env.GATEWAY_REDIS_LIMITER_URL,
            pools: {
                ratelimiter: {
                    expiresIn: 600000
                }
            }
        },
        maximalRequests: 3
    },
    production: {
        redis: {
            name: 'redisCache',
            partition: 'limit',
            url: process.env.GATEWAY_REDIS_LIMITER_URL,
            pools: {
                ratelimiter: {
                    expiresIn: 600000
                }
            }
        },
        maximalRequests: 3
    }
}