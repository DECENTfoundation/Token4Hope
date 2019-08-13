enum LoggerType {
    Error = "error",
    Info = "info",
}

enum LoggerFacility {
    Database = "database",
    Blockchain = "blockchain",
    Assembly = "assembly",
    Auth = "auth",
    Aws = "aws",
    Captcha = "captcha",
    InitialSeed = "initial-seed",
    Orm = "orm",
    RateLimiter = "rate-limiter",
    Router = "router",
    Session = "session",
    Hapi = "hapi",
    Email = "email",
    Notification = "notification",
}

export const LoggerTag = {
    ...LoggerType,
    ...LoggerFacility,
};
