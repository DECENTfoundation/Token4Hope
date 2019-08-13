module.exports = {
    secret: process.env.GATEWAY_SECRET || 'no-secret',
    jwt: {
        signing: {
            algorithm: 'HS256',
            expiresIn: '1d',
            audience: 'human.io',
            issuer: 'human.io'
        },
        verify: {
            algorithms: [
                'HS256'
            ],
            audience: 'human.io',
            issuer: 'human.io',
            ignoreExpiration: false
        }
    }
}