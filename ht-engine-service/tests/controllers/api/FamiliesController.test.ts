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

describe("Families controller test", () => {

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
        const req = RequestHelper.getByMethod(HttpMethod.Get, "/user/balanceByCard/123456");
        const res = await this.server.inject(req);

        assert.strictEqual(res.statusCode, 406);
    });

    it("missing content-type header", async () => {
        const req = RequestHelper.getByMethod(HttpMethod.Patch, "/family/123456", ["accept", "auth"], {}, this.token);
        const res = await this.server.inject(req);

        assert.strictEqual(res.statusCode, 415);
    });

    it("unauthorized request", async () => {
        const req = RequestHelper.getByMethod(HttpMethod.Patch, "/family/123456", ["accept"]);
        const res = await this.server.inject(req);

        assert.strictEqual(res.statusCode, 401);
    });

    // /user/balanceByCard/{cardNumber} GET
    it("check family balance by card", async () => {
        const req = RequestHelper.getByMethod(HttpMethod.Get, "/user/balanceByCard/123456", ["accept"]);
        const res = await this.server.inject(req);

        assert.strictEqual(res.statusCode, 200);

        const responseBody: Payload = JSON.parse(res.payload);
        assert.isAtLeast(parseInt(responseBody.amount, 10), 0);
        assert.strictEqual(responseBody.chainName, "t4h-family-000000");
    });

    it("check non-existing family balance by card", async () => {
        const req = RequestHelper.getByMethod(HttpMethod.Get, "/user/balanceByCard/000000", ["accept"]);
        const res = await this.server.inject(req);

        assert.strictEqual(res.statusCode, 404);
    });

    // /user/balanceByChainName/{chainName} GET
    it("check family balance by account name", async () => {
        const req = RequestHelper.getByMethod(HttpMethod.Get, "/user/balanceByChainName/t4h-family-000000", ["accept"]);
        const res = await this.server.inject(req);

        assert.strictEqual(res.statusCode, 200);

        const responseBody: Payload = JSON.parse(res.payload);
        assert.isAtLeast(parseInt(responseBody.amount, 10), 0);
        assert.strictEqual(responseBody.chainName, "t4h-family-000000");
    });

    it("check non-existing family balance by account name", async () => {
        const req = RequestHelper.getByMethod(HttpMethod.Get, "/user/balanceByChainName/t4h-family-000001", ["accept"]);
        const res = await this.server.inject(req);

        assert.strictEqual(res.statusCode, 404);
    });

    // /family/{cardNumber} PATCH
    it("change family pin", async () => {
        const req = RequestHelper.getByMethod(HttpMethod.Patch, "/family/123456", ["accept", "content", "auth"], {
            pin: "1234",
        }, this.token);
        const res = await this.server.inject(req);

        assert.strictEqual(res.statusCode, 204);
    });

    it("change family pin with empty data", async () => {
        const req = RequestHelper.getByMethod(HttpMethod.Patch, "/family/123456", ["accept", "content", "auth"], {}, this.token);
        const res = await this.server.inject(req);

        assert.strictEqual(res.statusCode, 400);
    });

    it("change family pin with invalid data", async () => {
        const req = RequestHelper.getByMethod(HttpMethod.Patch, "/family/123456", ["accept", "content", "auth"], {
            invalidAttribute: "abc",
        }, this.token);
        const res = await this.server.inject(req);

        assert.strictEqual(res.statusCode, 400);
    });

    it("change family pin with insufficient role", async () => {
        // signin
        const localToken = await AuthHelper.getUserToken(this.server, "dcttesting1@gmail.com", "12345");
        // change
        const req = RequestHelper.getByMethod(HttpMethod.Patch, "/family/123456", ["accept", "content", "auth"], {
            pin: "1234",
        }, localToken);
        const res = await this.server.inject(req);

        assert.strictEqual(res.statusCode, 403);
    });

    // /family POST
    it("register family", async () => {
        const req = RequestHelper.getByMethod(HttpMethod.Post, "/family", ["accept", "content", "auth"], {
            cardNumber: "123333",
            pin: "1234",
        }, this.token);
        const res = await this.server.inject(req);

        assert.strictEqual(res.statusCode, 201);
    });

    it("register family with empty data", async () => {
        const req = RequestHelper.getByMethod(HttpMethod.Post, "/family", ["accept", "content", "auth"], {}, this.token);
        const res = await this.server.inject(req);

        assert.strictEqual(res.statusCode, 400);
    });

    it("register family with invalid data", async () => {
        const req = RequestHelper.getByMethod(HttpMethod.Post, "/family", ["accept", "content", "auth"], {
            invalidAttribute: "abc",
        }, this.token);
        const res = await this.server.inject(req);

        assert.strictEqual(res.statusCode, 400);
    });

    it("register family with insufficient role", async () => {
        // signin
        const localToken = await AuthHelper.getUserToken(this.server, "dcttesting1@gmail.com", "12345");
        // register
        const req = RequestHelper.getByMethod(HttpMethod.Post, "/family", ["accept", "content", "auth"], {
            invalidAttribute: "abc",
        }, localToken);
        const res = await this.server.inject(req);

        assert.strictEqual(res.statusCode, 403);
    });

    it("register family with existing card number", async () => {
        const req = RequestHelper.getByMethod(HttpMethod.Post, "/family", ["accept", "content", "auth"], {
            cardNumber: "123456",
            pin: "1234",
        }, this.token);
        const res = await this.server.inject(req);

        assert.strictEqual(res.statusCode, 409);
    });

    // /family/payInStore POST
    it("family pay in store", async () => {
        // signin
        const localToken = await AuthHelper.getUserToken(this.server, "dcttesting1@gmail.com", "12345");
        // pay
        const req = RequestHelper.getByMethod(HttpMethod.Post, "/family/payInStore", ["accept", "content", "auth"], {
            amount: "0.01",
            cardNumber: "123456",
            pin: "000000",
        }, localToken);
        const res = await this.server.inject(req);

        assert.strictEqual(res.statusCode, 200);

        const responseBody: Payload = JSON.parse(res.payload);
        assert.strictEqual(responseBody.senderAddress, "t4h-family-000000");
        assert.strictEqual(responseBody.receiverAddress, "t4h-store1");
        assert.exists(responseBody.remainingBalance);
    });

    it("family pay with insufficient role", async () => {
        const req = RequestHelper.getByMethod(HttpMethod.Post, "/family/payInStore", ["accept", "content", "auth"], {
            amount: "0.01",
            cardNumber: "1234567",
            pin: "111111",
        }, this.token);
        const res = await this.server.inject(req);

        assert.strictEqual(res.statusCode, 403);
    });

    it("family pay with wrong credentials", async () => {
        // signin
        const localToken = await AuthHelper.getUserToken(this.server, "dcttesting1@gmail.com", "12345");
        // pay
        const req = RequestHelper.getByMethod(HttpMethod.Post, "/family/payInStore", ["accept", "content", "auth"], {
            amount: "0.01",
            cardNumber: "12345678",
            pin: "111112",
        }, localToken);
        const res = await this.server.inject(req);

        assert.strictEqual(res.statusCode, 422);
    });

    it("family pay with wrong data", async () => {
        // signin
        const localToken = await AuthHelper.getUserToken(this.server, "dcttesting1@gmail.com", "12345");
        // pay
        const req = RequestHelper.getByMethod(HttpMethod.Post, "/family/payInStore", ["accept", "content", "auth"], {
            amount: "100000",
            cardNumber: "1234567",
            pin: "111111",
        }, localToken);
        const res = await this.server.inject(req);

        assert.strictEqual(res.statusCode, 409);
    });

    it("family pay with empty data", async () => {
        // signin
        const localToken = await AuthHelper.getUserToken(this.server, "dcttesting1@gmail.com", "12345");
        // pay
        const req = RequestHelper.getByMethod(HttpMethod.Post, "/family/payInStore", ["accept", "content", "auth"], {}, localToken);
        const res = await this.server.inject(req);

        assert.strictEqual(res.statusCode, 400);
    });

    it("family pay with invalid data", async () => {
        // signin
        const localToken = await AuthHelper.getUserToken(this.server, "dcttesting1@gmail.com", "12345");
        // pay
        const req = RequestHelper.getByMethod(HttpMethod.Post, "/family/payInStore", ["accept", "content", "auth"], {
            invalidAttribute: "abc",
        }, localToken);
        const res = await this.server.inject(req);

        assert.strictEqual(res.statusCode, 400);
    });
});
