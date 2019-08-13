const CH_USERS = process.env.CH_USERS && JSON.parse(process.env.CH_USERS) || undefined;
const S1_USERS = process.env.S1_USERS && JSON.parse(process.env.S1_USERS) || undefined;
const S2_USERS = process.env.S2_USERS && JSON.parse(process.env.S2_USERS) || undefined;
const S3_USERS = process.env.S3_USERS && JSON.parse(process.env.S3_USERS) || undefined;

module.exports = {
    development: {
        initialSeeds: [
            {
                service: "family",
                seedData: [{
                    cardNumber: "000000",
                    privateKey: "TODO",
                    brainKey: "",
                    publicKey: "TODO",
                    chainId: "1.2.11919",
                    chainName: "t4h-family-000000",
                    password: "1111",
                }, {
                    cardNumber: "999999",
                    privateKey: "TODO",
                    brainKey: "",
                    publicKey: "TODO",
                    chainId: "1.2.11920",
                    chainName: "t4h-family-999999",
                    password: "1111",
                }]
            },
            {
                service: "organization",
                seedData: [{
                    role: "charity",
                    name: "Charity 1",
                    privateKey: "TODO",
                    brainKey: "",
                    publicKey: "TODO",
                    chainId: "1.2.11882",
                    chainName: "t4h-charity",
                    users: CH_USERS || JSON.parse('[{"email":"ch1@ch1.com","password":"TODO"},{"email":"ch2@ch1.com","password":"TODO"}]')
                }, {
                    role: "store",
                    name: "Store 1",
                    privateKey: "TODO",
                    brainKey: "",
                    publicKey: "TODO",
                    chainId: "1.2.11885",
                    chainName: "t4h-store1",
                    users: S1_USERS || JSON.parse('[{"email":"s1@s1.com","password":"TODO"},{"email":"s2@s1.com","password":"TODO"}]')
                }, {
                    role: "store",
                    name: "Store 2",
                    privateKey: "TODO",
                    brainKey: "",
                    publicKey: "TODO",
                    chainId: "1.2.11886",
                    chainName: "t4h-store2",
                    users: S2_USERS || JSON.parse('[{"email":"s1@s2.com","password":"TODO"},{"email":"s2@s2.com","password":"TODO"}]')
                }, {
                    role: "wallet",
                    name: "T4H Issuer",
                    privateKey: "",
                    brainKey: "",
                    publicKey: "",
                    chainId: "1.2.11878",
                    chainName: "t4h-issuer",
                    users: []
                }, {
                    role: "wallet",
                    name: "Tokens Verbrannt",
                    privateKey: "",
                    brainKey: "",
                    publicKey: "",
                    chainId: "1.2.11884",
                    chainName: "t4h-charity-returned",
                    users: []
                }]
            }
        ]
    },
    test: {
        initialSeeds: [
            {
                service: "family",
                seedData: [{
                    cardNumber: "123456",
                    privateKey: "TODO",
                    brainKey: "",
                    publicKey: "TODO",
                    chainId: "1.2.11919",
                    chainName: "t4h-family-000000",
                    password: "000000",
                }, {
                    cardNumber: "1234567",
                    privateKey: "TODO",
                    brainKey: "",
                    publicKey: "TODO",
                    chainId: "1.2.11920",
                    chainName: "t4h-family-999999",
                    password: "111111",
                }]
            },
            {
                service: "organization",
                seedData: [{
                    role: "charity",
                    name: "HT Charity",
                    email: "charity@ht.com",
                    privateKey: "TODO",
                    brainKey: "",
                    publicKey: "TODO",
                    chainId: "1.2.11882",
                    chainName: "t4h-charity",
                    password: "TODO",
                }, {
                    role: "store",
                    name: "HT Store",
                    email: "dcttesting1@gmail.com",
                    privateKey: "TODO",
                    brainKey: "",
                    publicKey: "TODO",
                    chainId: "1.2.11885",
                    chainName: "t4h-store1",
                    password: "TODO",
                }, {
                    role: "wallet",
                    name: "T4H Issuer",
                    privateKey: "",
                    brainKey: "",
                    publicKey: "",
                    chainId: "1.2.11878",
                    chainName: "t4h-issuer",
                    users: []
                }, {
                    role: "wallet",
                    name: "Tokens Verbrannt",
                    privateKey: "",
                    brainKey: "",
                    publicKey: "",
                    chainId: "1.2.11884",
                    chainName: "t4h-charity-returned",
                    users: []
                }]
            }
        ]
    },
    staging: {
        initialSeeds: [
            {
                service: "family",
                seedData: [{
                    cardNumber: "1",
                    privateKey: "TODO",
                    brainKey: "",
                    publicKey: "TODO",
                    chainId: "1.2.12110",
                    chainName: "t4h-card-dd83d397-1057-4454-a332-0c687c12e081",
                    password: "111111",
                }, {
                    cardNumber: "2",
                    privateKey: "TODO",
                    brainKey: "",
                    publicKey: "TODO",
                    chainId: "1.2.12111",
                    chainName: "t4h-card-e235b9a4-2b2e-40e0-aa61-0bc21c8cdf53",
                    password: "111111",
                }, {
                    cardNumber: "3",
                    privateKey: "TODO",
                    brainKey: "",
                    publicKey: "TODO",
                    chainId: "1.2.12125",
                    chainName: "t4h-card-436a6c21-70b4-43c4-8f76-91d600349268",
                    password: "111111",
                }, {
                    cardNumber: "4",
                    privateKey: "TODO",
                    brainKey: "",
                    publicKey: "TODO",
                    chainId: "1.2.12128",
                    chainName: "t4h-card-a6db11fc-9dcd-400d-976e-f296680d780f",
                    password: "111111",
                }, {
                    cardNumber: "888888",
                    privateKey: "TODO",
                    brainKey: "",
                    publicKey: "TODO",
                    chainId: "1.2.12129",
                    chainName: "t4h-card-20c66042-1ff1-4fe8-9416-032f099f1c9c",
                    password: "111111",
                }, {
                    cardNumber: "5",
                    privateKey: "TODO",
                    brainKey: "",
                    publicKey: "TODO",
                    chainId: "1.2.12141",
                    chainName: "t4h-card-a333e906-77b7-43ba-b6de-26729ee954fc",
                    password: "111111",
                }, {
                    cardNumber: "111112",
                    privateKey: "TODO",
                    brainKey: "",
                    publicKey: "TODO",
                    chainId: "1.2.12233",
                    chainName: "t4h-card-24494639-d3d3-44a5-98a3-7ebd0bfadbae",
                    password: "111111",
                }, {
                    cardNumber: "111113",
                    privateKey: "TODO",
                    brainKey: "",
                    publicKey: "TODO",
                    chainId: "1.2.12234",
                    chainName: "t4h-card-5ef3fc58-825f-445e-a668-abeac141490b",
                    password: "111111",
                }, {
                    cardNumber: "111114",
                    privateKey: "TODO",
                    brainKey: "",
                    publicKey: "TODO",
                    chainId: "1.2.12235",
                    chainName: "t4h-card-20088e83-e463-41c1-b77a-5cb670614a08",
                    password: "111111",
                }]
            },
            {
                service: "organization",
                seedData: [{
                    role: "charity",
                    name: "Hilfswerk Zentrale",
                    privateKey: "TODO",
                    brainKey: "",
                    publicKey: "TODO",
                    chainId: "1.2.12088",
                    chainName: "t4h-hilfswerk",
                    users: CH_USERS || JSON.parse('[{"email":"ch1@ch1.com","password":"TODO"},{"email":"ch2@ch1.com","password":"TODO"}]')
                }, {
                    role: "store",
                    name: "SOMA 7",
                    privateKey: "TODO",
                    brainKey: "",
                    publicKey: "TODO",
                    chainId: "1.2.12090",
                    chainName: "t4h-hilfswerk-soma7",
                    users: S1_USERS || JSON.parse('[{"email":"s1@s1.com","password":"TODO"},{"email":"s2@s1.com","password":"TODO"}]')
                }, {
                    role: "store",
                    name: "SOMA 16",
                    privateKey: "TODO",
                    brainKey: "",
                    publicKey: "TODO",
                    chainId: "1.2.12091",
                    chainName: "t4h-hilfswerk-soma16",
                    users: S2_USERS || JSON.parse('[{"email":"s1@s2.com","password":"TODO"},{"email":"s2@s2.com","password":"TODO"}]')
                }, {
                    role: "store",
                    name: "New Chance",
                    privateKey: "TODO",
                    brainKey: "",
                    publicKey: "TODO",
                    chainId: "1.2.12092",
                    chainName: "t4h-hilfswerk-new-chance",
                    users: S3_USERS || JSON.parse('[{"email":"s1@s3.com","password":"TODO"},{"email":"s2@s3.com","password":"TODO"},{"email":"s3@s3.com","password":"TODO"}]')
                }, {
                    role: "wallet",
                    name: "T4H Issuer",
                    privateKey: "",
                    brainKey: "",
                    publicKey: "",
                    chainId: "1.2.11878",
                    chainName: "t4h-issuer",
                    users: []
                }, {
                    role: "wallet",
                    name: "Tokens Verbrannt",
                    privateKey: "",
                    brainKey: "",
                    publicKey: "",
                    chainId: "1.2.12089",
                    chainName: "t4h-hilfswerk-withdrawn",
                    users: []
                }]
            }
        ]
    },
    production: {
        initialSeeds: []
    }
}
