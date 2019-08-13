module.exports = {
    development: {
        name: 'redisCache',
        partition: 'sess',
        url: process.env.GATEWAY_REDIS_SESSION_URL,
        pools: {
            user: {
                expiresIn: 12 * 30 * 86400000
            },
            customer: {
                expiresIn: 12 * 30 * 86400000
            }
        }
    },
    test: {
        name: 'redisCache',
        partition: 'sess',
        url: process.env.GATEWAY_REDIS_SESSION_URL,
        pools: {
            user: {
                expiresIn: 12 * 30 * 86400000
            },
            customer: {
                expiresIn: 12 * 30 * 86400000
            }
        }
    },
    staging: {
        name: 'redisCache',
        partition: 'sess',
        url: process.env.GATEWAY_REDIS_SESSION_URL,
        pools: {
            user: {
                'expiresIn': 12 * 30 * 86400000
            },
            customer: {
                'expiresIn': 12 * 30 * 86400000
            }
        }
    },
    production: {
        name: 'redisCache',
        partition: 'sess',
        url: process.env.GATEWAY_REDIS_SESSION_URL,
        pools: {
            user: {
                expiresIn: 12 * 30 * 86400000
            },
            customer: {
                expiresIn: 12 * 30 * 86400000
            }
        }
    }
}