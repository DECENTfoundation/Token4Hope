module.exports = {
    development: {
        ses: {
            apiVersion: '2010-12-01',
            accessKeyId: process.env.AWS_OPERATOR_ACCESS_ID,
            secretAccessKey: process.env.AWS_OPERATOR_ACCESS_SECRET,
            region: process.env.AWS_SES_REGION,
        }
    },
    test: {
        ses: {
            apiVersion: '2010-12-01',
            accessKeyId: process.env.AWS_OPERATOR_ACCESS_ID,
            secretAccessKey: process.env.AWS_OPERATOR_ACCESS_SECRET,
            region: process.env.AWS_SES_REGION,
        }
    },
    staging: {
        ses: {
            apiVersion: '2010-12-01',
            accessKeyId: process.env.AWS_OPERATOR_ACCESS_ID,
            secretAccessKey: process.env.AWS_OPERATOR_ACCESS_SECRET,
            region: process.env.AWS_SES_REGION,
        }
    },
    production: {
        ses: {
            apiVersion: '2010-12-01',
            accessKeyId: process.env.AWS_OPERATOR_ACCESS_ID,
            secretAccessKey: process.env.AWS_OPERATOR_ACCESS_SECRET,
            region: process.env.AWS_SES_REGION,
        }
    }
}