import "mocha";
import "reflect-metadata";

import { assert } from "chai";

import { container } from "../../../src/plugins/assembly/AssemblyPlugin";
import { ServerBootstrap } from "../../../src/server/Bootstrap";
import { HttpMethod } from "../../../src/utils/http";
import { Payload } from "../../../src/utils/payload";
import { DataFactory } from "../../models/factories/DataFactory";
import { DatastoreFactory } from "../../models/factories/DatastoreFactory";
import { SessionStoreFactory } from "../../models/factories/SessionStoreFactory";
import { AuthHelper } from "../../utils/AuthHelper";
import { RequestHelper } from "../../utils/RequestHelper";

describe("Chain account controller test", () => {

    before(async () => {
        container.unbindAll();
        container.snapshot();
        this.server = await ServerBootstrap();
    });

    beforeEach(async () => {
        await DatastoreFactory.sync(this.server);
        await DataFactory.seed(this.server);
    });

    afterEach(async () => {
        await DatastoreFactory.drop(this.server);
    });

    after(() => {
        SessionStoreFactory.flush(this.server);
        container.restore();
    });

    it("get token", async () => {
        this.token = await AuthHelper.getUserToken(this.server, "charity@ht.com", "12345");
    });

    // general tests
    it("missing accept header", async () => {
        const req = RequestHelper.getByMethod(HttpMethod.Get, "/accounts");
        const res = await this.server.inject(req);

        assert.strictEqual(res.statusCode, 406);
    });

    it("unauthorized request", async () => {
        const req = RequestHelper.getByMethod(HttpMethod.Get, "/accounts", ["accept"]);
        const res = await this.server.inject(req);

        assert.strictEqual(res.statusCode, 401);
    });

    // /accounts GET
    it("get all accounts", async () => {
        const req = RequestHelper.getByMethod(HttpMethod.Get, "/accounts", ["accept", "auth"], null, this.token);
        const res = await this.server.inject(req);

        assert.strictEqual(res.statusCode, 200);

        const responseBody: Payload = JSON.parse(res.payload);
        assert.exists(responseBody.charityTokens);
        assert.exists(responseBody.familyTokens);
        assert.exists(responseBody.storeTokens);
        assert.isNotEmpty(responseBody.accounts);
    });

    it("get all accounts with insufficient role", async () => {
        // signin
        const localToken = await AuthHelper.getUserToken(this.server, "dcttesting1@gmail.com", "12345");
        // get
        const req = RequestHelper.getByMethod(HttpMethod.Get, "/accounts", ["accept", "auth"], null, localToken);
        const res = await this.server.inject(req);

        assert.strictEqual(res.statusCode, 403);
    });

    // /accounts/{chainAccountName}/transactions
    it("get transaction history charity", async () => {
        // tslint:disable-next-line:max-line-length
        const req = RequestHelper.getByMethod(HttpMethod.Get, "/accounts/t4h-family-000000/transactions", ["accept", "auth"], null, this.token);
        const res = await this.server.inject(req);

        assert.strictEqual(res.statusCode, 200);

        const responseBody: Payload = JSON.parse(res.payload);
        assert.exists(responseBody.balance);
        assert.exists(responseBody.tokensReceived);
        assert.exists(responseBody.tokensSent);
        assert.isNotEmpty(responseBody.transactions);
    });

    it("get transaction history store", async () => {
        // signin
        const localToken = await AuthHelper.getUserToken(this.server, "dcttesting1@gmail.com", "12345");
        // get
        const req = RequestHelper.getByMethod(HttpMethod.Get, "/accounts/t4h-family-000000/transactions", ["accept", "auth"],
            null, localToken);
        const res = await this.server.inject(req);

        assert.strictEqual(res.statusCode, 200);

        const responseBody: Payload = JSON.parse(res.payload);
        assert.exists(responseBody.balance);
        assert.exists(responseBody.tokensReceived);
        assert.exists(responseBody.tokensSent);
        assert.isNotEmpty(responseBody.transactions);
    });

    it("get transaction history for non-existing name", async () => {
        // tslint:disable-next-line:max-line-length
        const req = RequestHelper.getByMethod(HttpMethod.Get, "/accounts/testName/transactions", ["accept", "auth"], null, this.token);
        const res = await this.server.inject(req);

        assert.strictEqual(res.statusCode, 404);
    });
});
