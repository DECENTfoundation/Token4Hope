const url = require('url');

const ReplicationOption = () => {
    const options = {
        replication: {
            read: [],
            write: []
        }
    };
    if (process.env.GATEWAY_PG_READER_URL != null) {
        const schema = new url.URL(process.env.GATEWAY_PG_READER_URL);
        const database = schema.pathname.replace("/", "");
        options.replication.read = [
            { host: schema.host.split(":")[0], port: schema.port, username: schema.username, password: schema.password, database }
        ];
    }

    if (process.env.GATEWAY_PG_URL != null) {
        const schema = new url.URL(process.env.GATEWAY_PG_URL);
        const database = schema.pathname.replace("/", "");
        options.replication.write = [
            { host: schema.host.split(":")[0], port: schema.port, username: schema.username, password: schema.password, database }
        ];
    }
    console.log('DB:Replica options', JSON.stringify(options));
    return options;
}

module.exports = {
    development: {
        url: process.env.GATEWAY_PG_URL,
        dialect: 'postgres',
        benchmark: true,
        operatorsAliases: false,
        seederStorage: 'sequelize',
        seederStorageTableName: 'migrations',
        migrationStorage: 'sequelize',
        migrationStorageTableName: 'migrations',
        syncSchema: true,
        sync: {
            force: false
        },
        pool: {
            max: 5,
            min: 1,
            acquire: 30000,
            idle: 10000
        },
        define: {
            underscored: true,
            underscoredAll: true,
            paranoid: true,
            charset: 'utf8',
            dialectOptions: {
                collate: 'utf8_general_ci'
            },
            timestamps: true
        }
        // ...ReplicationOption()
    },
    test: {
        url: process.env.GATEWAY_PG_URL,
        dialect: 'postgres',
        logging: false,
        benchmark: true,
        native: true,
        operatorsAliases: false,
        syncSchema: true,
        sync: {
            force: true
        },
        pool: {
            max: 5,
            min: 1,
            acquire: 30000,
            idle: 10000
        },
        define: {
            underscored: true,
            underscoredAll: true,
            paranoid: true,
            charset: 'utf8',
            dialectOptions: {
                collate: 'utf8_general_ci'
            },
            timestamps: true
        }
        // ...ReplicationOption()
    },
    staging: {
        url: process.env.GATEWAY_PG_URL,
        dialect: 'postgres',
        benchmark: true,
        native: true,
        operatorsAliases: false,
        seederStorage: 'sequelize',
        seederStorageTableName: 'migrations',
        migrationStorage: 'sequelize',
        migrationStorageTableName: 'migrations',
        syncSchema: true,
        sync: {
            force: false
        },
        pool: {
            max: 5,
            min: 1,
            acquire: 30000,
            idle: 10000
        },
        define: {
            underscored: true,
            underscoredAll: true,
            paranoid: true,
            charset: 'utf8',
            dialectOptions: {
                collate: 'utf8_general_ci'
            },
            timestamps: true
        }
        //...ReplicationOption(),
    },
    production: {
        url: process.env.GATEWAY_PG_URL,
        dialect: 'postgres',
        benchmark: false,
        logging: false,
        native: true,
        operatorsAliases: false,
        seederStorage: 'sequelize',
        seederStorageTableName: 'migrations',
        migrationStorage: 'sequelize',
        migrationStorageTableName: 'migrations',
        syncSchema: true,
        sync: {
            force: false
        },
        pool: {
            max: 5,
            min: 1,
            acquire: 30000,
            idle: 10000
        },
        define: {
            underscored: true,
            underscoredAll: true,
            paranoid: true,
            charset: 'utf8',
            dialectOptions: {
                collate: 'utf8_general_ci'
            },
            timestamps: true
        }
        //...ReplicationOption(),
    }
}
