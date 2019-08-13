module.exports = {
    development: {
        name: 'redisCache',
        partition: 'cache',
        url: process.env.GATEWAY_REDIS_CACHE_URL,
    },
    test: {
        name: 'redisCache',
        partition: 'cache',
        url: process.env.GATEWAY_REDIS_CACHE_URL,
    },
    staging: {
        name: 'redisCache',
        partition: 'cache',
        url: process.env.GATEWAY_REDIS_CACHE_URL,
    },
    production: {
        name: 'redisCache',
        partition: 'cache',
        url: process.env.GATEWAY_REDIS_CACHE_URL,
    }
}