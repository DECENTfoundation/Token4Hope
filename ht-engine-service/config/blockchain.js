module.exports = {
    development: {
        symbol: 'T4H',
        defaultAssetAmount: process.env.DEFAULT_ASSET_AMOUNT,
        transferRatio: process.env.TRANSFER_RATIO,
        precision: 2,
        network: {
            id: process.env.BLOCKCHAIN_NETWORK_ID,
            endpoints: {
                wss: process.env.BLOCKCHAIN_NETWORK_SOCKET_URL,
                http: process.env.BLOCKCHAIN_NETWORK_HTTP_URL
            }
        },
        withdrawalChainId: process.env.CHARITY_WITHDRAWALS_ID
    },
    test: {
        symbol: 'T4H',
        defaultAssetAmount: process.env.DEFAULT_ASSET_AMOUNT,
        transferRatio: process.env.TRANSFER_RATIO,
        precision: 2,
        network: {
            id: process.env.BLOCKCHAIN_NETWORK_ID,
            endpoints: {
                wss: process.env.BLOCKCHAIN_NETWORK_SOCKET_URL,
                http: process.env.BLOCKCHAIN_NETWORK_HTTP_URL
            }
        },
        withdrawalChainId: process.env.CHARITY_WITHDRAWALS_ID
    },
    staging: {
        symbol: 'T4H',
        defaultAssetAmount: process.env.DEFAULT_ASSET_AMOUNT,
        transferRatio: process.env.TRANSFER_RATIO,
        precision: 2,
        network: {
            id: process.env.BLOCKCHAIN_NETWORK_ID,
            endpoints: {
                wss: process.env.BLOCKCHAIN_NETWORK_SOCKET_URL,
                http: process.env.BLOCKCHAIN_NETWORK_HTTP_URL
            }
        },
        withdrawalChainId: process.env.CHARITY_WITHDRAWALS_ID
    },
    production: {
        symbol: 'T4H',
        defaultAssetAmount: process.env.DEFAULT_ASSET_AMOUNT,
        transferRatio: process.env.TRANSFER_RATIO,
        precision: 2,
        network: {
            id: process.env.BLOCKCHAIN_NETWORK_ID,
            endpoints: {
                wss: process.env.BLOCKCHAIN_NETWORK_SOCKET_URL,
                http: process.env.BLOCKCHAIN_NETWORK_HTTP_URL
            }
        },
        withdrawalChainId: process.env.CHARITY_WITHDRAWALS_ID
    }
};
