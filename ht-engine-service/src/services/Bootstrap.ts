import * as AWS from "aws-sdk";

import { DCoreApi, DCoreSdk } from "dcorejs-sdk";
import * as Hapi from "hapi";
import { ContainerModule, interfaces } from "inversify";
import { Spec } from "swagger-schema-official";
import * as WebSocket from "ws";

import { AuthSchemeType, AuthScope, AuthScopeType, AuthStrategy, AuthStrategyType } from "../plugins/auth";
import { AwsFactory, AwsStorage } from "../plugins/aws";
import { BlockchainFactory, BlockchainTransport } from "../plugins/blockchain";
import { InitialSeedExecuter } from "../plugins/initial-seed/InitialSeedExecuter";
import { RouteInject } from "../plugins/router";
import { Agent, AgentService } from "./agent";
import { JwtAuthSchemeFactory, JwtAuthScopeService, JwtAuthSessionService, JwtAuthStrategyService } from "./auth/jwt";
import { AwsCloudfrontKeyProvider, AwsCloudfrontProvider, AwsSignerFactory, AwsStorageFactory } from "./aws";
import { AccountOperationService } from "./blockchain/operations/AccountOperationService";
import { PaymentOperationService } from "./blockchain/operations/PaymentOperationService";
import { AccountRepositoryService } from "./blockchain/repositories/AccountRepositoryService";
import { PaymentRepositoryService } from "./blockchain/repositories/PaymentRepositoryService";
import { BalanceService } from "./bussiness/BalanceService";
import { ChainAccountService } from "./bussiness/ChainAccountService";
import { ChainTransactionService } from "./bussiness/ChainTransactionService";
import { FamilyService } from "./bussiness/FamilyService";
import { OperationLogService } from "./bussiness/OperationLogService";
import { TransactionService } from "./bussiness/TransactionService";
import { EmailService } from "./email/EmailService";
import { FamilySeedService } from "./initial-seed/FamilySeedService";
import { ServiceType } from "./initial-seed/metadata/SeedType";
import { OrganizationSeedService } from "./initial-seed/OrganizationSeedService";
import { RateLimiterService } from "./rate-limiter/RateLimiterService";
import { RouteInjectService, RouterService } from "./router";
import { SessionService } from "./session";
import { SessionIdentity } from "./session/artifacts";
import { UserCacheService } from "./user-cache/UserCacheService";

export const Bootstrap = (): ContainerModule => {
    return new ContainerModule((bind) => {

        // Auth

        // tslint:disable-next-line:max-line-length
        bind<interfaces.Newable<AuthScope>>("Newable<AuthScope>").toConstructor<JwtAuthScopeService>(JwtAuthScopeService).whenTargetNamed(AuthScopeType.Jwt);
        // tslint:disable-next-line:max-line-length
        bind<Hapi.ServerAuthScheme>("ServerAuthScheme").toConstantValue(JwtAuthSchemeFactory.buildScheme()).whenTargetNamed(AuthSchemeType.Jwt);
        // tslint:disable-next-line:max-line-length
        bind<AuthStrategy<string, SessionIdentity & Hapi.AuthCredentials>>("AuthStrategy").to(JwtAuthStrategyService).whenTargetNamed(AuthStrategyType.Jwt);
        bind<JwtAuthSessionService>(JwtAuthSessionService).toSelf();

        // Aws

        bind<interfaces.Factory<AWS.S3>>("Factory<AWS.S3>").toFactory<AWS.S3>((context) => {
            return (source: Hapi.Request, storage: string): AWS.S3 => {
                const aws = context.container.get<AwsFactory>("Factory<Aws>");
                const options = aws(source).getOptions().s3[storage];
                const credentials = new AWS.Credentials(options.accessKeyId, options.secretAccessKey);

                return new AWS.S3({ credentials, apiVersion: options.apiVersion, region: options.region });
            };
        });

        bind<interfaces.Factory<AWS.SES>>("Factory<AWS.SES>").toFactory<AWS.SES>((context) => {
            return (source: Hapi.Request): AWS.SES => {
                const aws = context.container.get<AwsFactory>("Factory<Aws>");
                const options = aws(source).getOptions().ses;
                const credentials = new AWS.Credentials(options.accessKeyId, options.secretAccessKey);

                return new AWS.SES({ credentials, apiVersion: options.apiVersion, region: options.region });
            };
        });

        bind<interfaces.Factory<AWS.CloudFront.Signer>>("Factory<AWS.CloudFront.Signer>").toFactory<AWS.CloudFront.Signer>((context) => {
            return (source: Hapi.Request, storage: string, key: string): AWS.CloudFront.Signer => {
                const aws = context.container.get<AwsFactory>("Factory<Aws>");
                const options = aws(source).getOptions().cloudfront[storage];
                return new AWS.CloudFront.Signer(options.signerId, key);
            };
        });

        bind<AwsCloudfrontKeyProvider>("AwsCloudfrontKeyProvider").toProvider<string>((context) => {
            return async (source: Hapi.Request, storage: string): Promise<string> => {
                if (!context.container.isBound(AwsStorage.Key)) {

                    const storageFactory = context.container.get<AwsStorageFactory>("Factory<AWS.S3>");
                    const aws = context.container.get<AwsFactory>("Factory<Aws>");

                    const options = aws(source).getOptions().cloudfront[storage];
                    const key = await storageFactory(source, storage).getObject({
                        Bucket: options.signerSecretBucket,
                        Key: options.signerSecretName,
                    }).promise();

                    const data = Buffer.from(key.Body as any).toString("utf8");
                    context.container.bind<string>(AwsStorage.Key).toConstantValue(data);

                    return data;
                }

                return context.container.get<string>(AwsStorage.Key);
            };
        });

        bind<AwsCloudfrontProvider>("AwsCloudfrontProvider").toProvider<AWS.CloudFront.Signer>((context) => {
            return async (source: Hapi.Request, storage: string): Promise<AWS.CloudFront.Signer> => {

                const cloudfrontFactory = context.container.get<AwsSignerFactory>("Factory<AWS.CloudFront.Signer>");
                const key = await context.container.get<AwsCloudfrontKeyProvider>("AwsCloudfrontKeyProvider")(source, storage);

                return cloudfrontFactory(source, storage, key);
            };
        });

        // Bussiness

        bind<ChainAccountService>(ChainAccountService).toSelf();
        bind<FamilyService>(FamilyService).toSelf();
        bind<BalanceService>(BalanceService).toSelf();
        bind<ChainTransactionService>(ChainTransactionService).toSelf();
        bind<OperationLogService>(OperationLogService).toSelf();
        bind<TransactionService>(TransactionService).toSelf();

        // Blockchain

        bind<PaymentOperationService>(PaymentOperationService).toSelf();
        bind<PaymentRepositoryService>(PaymentRepositoryService).toSelf();

        bind<AccountOperationService>(AccountOperationService).toSelf();
        bind<AccountRepositoryService>(AccountRepositoryService).toSelf();

        bind<interfaces.Factory<DCoreApi>>("Factory<DCoreApi>").toFactory<DCoreApi>((context) => {
            return (source: Hapi.Request): DCoreApi => {
                const factory = context.container.get<BlockchainFactory>("Factory<Blockchain>");
                return DCoreSdk.createForHttp({ baseUrl: factory(source).getOptions().network.endpoints.http, rejectUnauthorized: false });
            };
        }).whenTargetNamed(BlockchainTransport.Http);

        bind<interfaces.Factory<DCoreApi>>("Factory<DCoreApi>").toFactory<DCoreApi>((context) => {
            return (source: Hapi.Request): DCoreApi => {
                const factory = context.container.get<BlockchainFactory>("Factory<Blockchain>");
                return DCoreSdk.createForWebSocket(
                    () => new WebSocket(factory(source).getOptions().network.endpoints.wss, { rejectUnauthorized: false }),
                );
            };
        }).whenTargetNamed(BlockchainTransport.Socket);

        // Router

        bind<RouterService>(RouterService).toSelf();
        bind<interfaces.Newable<RouteInject>>("Newable<RouteInject>").toConstructor<RouteInjectService>(RouteInjectService);

        // Session

        bind<SessionService>(SessionService).toSelf();

        // User Cache
        bind<UserCacheService>(UserCacheService).toSelf();

        // Rate Limiter

        bind<RateLimiterService>(RateLimiterService).toSelf();

        // Agent

        bind<AgentService>(AgentService).toSelf();
        bind<interfaces.Factory<Agent>>("Factory<Agent>").toFactory<Agent>(() => {
            return ((source: Spec | Hapi.Request): Agent => new Agent(source));
        });

        // Email
        bind<EmailService>(EmailService).to(EmailService);

        // Seed Executer
        bind<InitialSeedExecuter>("InitialSeedExecuter").to(FamilySeedService).whenTargetNamed(ServiceType.Family);
        bind<InitialSeedExecuter>("InitialSeedExecuter").to(OrganizationSeedService).whenTargetNamed(ServiceType.Organization);

    });
};
