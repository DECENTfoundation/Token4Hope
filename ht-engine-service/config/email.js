module.exports = {
    development: {
        withdrawal: {
            request: {
                Destination: {
                    BccAddresses: [],
                    CcAddresses: [],
                    ToAddresses: ["dcttesting1@gmail.com"],
                },
                Message: {
                    Body: {
                        Html: {
                            Charset: "UTF-8",
                            Data: "Sehr geehrtes Hilfswerk Team!<br><br>" +
                                "Der Shop mit dem Namen ${store_name} hat einen Umtausch von ${number_of_tokens} T4H in EUR angefordert. " +
                                "Sie sollten diese Transaktion bereits in Ihrer Übersicht angezeigt bekommen. " +
                                "Bitte kontrollieren Sie dies in der Transaktionsübersicht und überweisen Sie den angeforderten Betrag manuell auf das Bankkonto des Shops.<br><br>" +
                                "Diese Nachricht wurde automatisch vom Token 4 Hope generiert. Bitte nicht antworten.",
                        },
                    },
                    Subject: {
                        Charset: "UTF-8",
                        Data: "Der ${store_name} Shop hat ${number_of_tokens} T4H Tokens eingelöst",
                    },
                },
                Source: process.env.EMAIL_SOURCE,
            }
        }
    },
    test: {
        withdrawal: {
            request: {
                Destination: {
                    BccAddresses: [],
                    CcAddresses: [],
                    ToAddresses: ["dcttesting1@gmail.com"],
                },
                Message: {
                    Body: {
                        Html: {
                            Charset: "UTF-8",
                            Data: "Sehr geehrtes Hilfswerk Team!<br><br>" +
                                "Der Shop mit dem Namen ${store_name} hat einen Umtausch von ${number_of_tokens} T4H in EUR angefordert. " +
                                "Sie sollten diese Transaktion bereits in Ihrer Übersicht angezeigt bekommen. " +
                                "Bitte kontrollieren Sie dies in der Transaktionsübersicht und überweisen Sie den angeforderten Betrag manuell auf das Bankkonto des Shops.<br><br>" +
                                "Diese Nachricht wurde automatisch vom Token 4 Hope generiert. Bitte nicht antworten.",
                        },
                    },
                    Subject: {
                        Charset: "UTF-8",
                        Data: "Der ${store_name} Shop hat ${number_of_tokens} T4H Tokens eingelöst",
                    },
                },
                Source: process.env.EMAIL_SOURCE,
            }
        }
    },
    staging: {
        withdrawal: {
            request: {
                Destination: {
                    BccAddresses: [],
                    CcAddresses: [],
                    ToAddresses: ["dcttesting1@gmail.com"],
                },
                Message: {
                    Body: {
                        Html: {
                            Charset: "UTF-8",
                            Data: "Sehr geehrtes Hilfswerk Team!<br><br>" +
                                "Der Shop mit dem Namen ${store_name} hat einen Umtausch von ${number_of_tokens} T4H in EUR angefordert. " +
                                "Sie sollten diese Transaktion bereits in Ihrer Übersicht angezeigt bekommen. " +
                                "Bitte kontrollieren Sie dies in der Transaktionsübersicht und überweisen Sie den angeforderten Betrag manuell auf das Bankkonto des Shops.<br><br>" +
                                "Diese Nachricht wurde automatisch vom Token 4 Hope generiert. Bitte nicht antworten.",
                        },
                    },
                    Subject: {
                        Charset: "UTF-8",
                        Data: "Der ${store_name} Shop hat ${number_of_tokens} T4H Tokens eingelöst",
                    },
                },
                Source: process.env.EMAIL_SOURCE,
            }
        }
    },
    production: {
        withdrawal: {
            request: {
                Destination: {
                    BccAddresses: [],
                    CcAddresses: [],
                    ToAddresses: [],
                },
                Message: {
                    Body: {
                        Html: {
                            Charset: "UTF-8",
                            Data: "Sehr geehrtes Hilfswerk Team!<br><br>" +
                                "Der Shop mit dem Namen ${store_name} hat einen Umtausch von ${number_of_tokens} T4H in EUR angefordert. " +
                                "Sie sollten diese Transaktion bereits in Ihrer Übersicht angezeigt bekommen. " +
                                "Bitte kontrollieren Sie dies in der Transaktionsübersicht und überweisen Sie den angeforderten Betrag manuell auf das Bankkonto des Shops.<br><br>" +
                                "Diese Nachricht wurde automatisch vom Token 4 Hope generiert. Bitte nicht antworten.",
                        },
                    },
                    Subject: {
                        Charset: "UTF-8",
                        Data: "Der ${store_name} Shop hat ${number_of_tokens} T4H Tokens eingelöst",
                    },
                },
                Source: process.env.EMAIL_SOURCE,
            }
        }
    }
}
