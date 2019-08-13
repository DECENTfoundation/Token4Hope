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

describe("Users controller test", () => {

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
        const req = RequestHelper.getByMethod(HttpMethod.Get, "/user/me");
        const res = await this.server.inject(req);

        assert.strictEqual(res.statusCode, 406);
    });

    it("missing content-type header", async () => {
        const req = RequestHelper.getByMethod(HttpMethod.Post, "/user/signin", ["accept", "auth"], {}, this.token);
        const res = await this.server.inject(req);

        assert.strictEqual(res.statusCode, 415);
    });

    it("unauthorized request", async () => {
        const req = RequestHelper.getByMethod(HttpMethod.Delete, "/user/signout", ["accept"]);
        const res = await this.server.inject(req);

        assert.strictEqual(res.statusCode, 401);
    });

    // /user/signin POST
    it("user login", async () => {
        const req = RequestHelper.getByMethod(HttpMethod.Post, "/user/signin", ["accept", "content"], {
            email: "charity@ht.com",
            password: "12345",
        });
        const res = await this.server.inject(req);

        assert.strictEqual(res.statusCode, 200);

        const responseBody: Payload = JSON.parse(res.payload);
        assert.isNotEmpty(responseBody.token);
    });

    it("user login with incorrect credentials", async () => {
        const req = RequestHelper.getByMethod(HttpMethod.Post, "/user/signin", ["accept", "content"], {
            email: "wrong@ht.com",
            password: "123",
        });
        const res = await this.server.inject(req);

        assert.strictEqual(res.statusCode, 422);
    });

    it("user login with invalid data", async () => {
        const req = RequestHelper.getByMethod(HttpMethod.Post, "/user/signin", ["accept", "content"], {
            invalidAttribute: "abc",
        });
        const res = await this.server.inject(req);

        assert.strictEqual(res.statusCode, 400);
    });

    // /user/signout DELETE
    it("user signout charity", async () => {
        // signin
        const localToken = await AuthHelper.getUserToken(this.server, "charity@ht.com", "12345");
        // signout
        const req = RequestHelper.getByMethod(HttpMethod.Delete, "/user/signout", ["accept", "auth"], null, localToken);
        const res = await this.server.inject(req);

        assert.strictEqual(res.statusCode, 204);
    });

    it("user signout store", async () => {
        // signin
        const localToken = await AuthHelper.getUserToken(this.server, "dcttesting1@gmail.com", "12345");
        // signout
        const req = RequestHelper.getByMethod(HttpMethod.Delete, "/user/signout", ["accept", "auth"], null, localToken);
        const res = await this.server.inject(req);

        assert.strictEqual(res.statusCode, 204);
    });

    it("user signout for already signed out user", async () => {
        // signin
        const localToken = await AuthHelper.getUserToken(this.server, "charity@ht.com", "12345");
        // signout
        const r = RequestHelper.getByMethod(HttpMethod.Delete, "/user/signout", ["accept", "auth"], null, localToken);
        await this.server.inject(r);
        // signout again
        const req = RequestHelper.getByMethod(HttpMethod.Delete, "/user/signout", ["accept", "auth"], null, localToken);
        const res = await this.server.inject(req);

        assert.strictEqual(res.statusCode, 401);
    });

    // /user/me GET
    it("get my user data charity", async () => {
        const req = RequestHelper.getByMethod(HttpMethod.Get, "/user/me", ["accept", "auth"], null, this.token);
        const res = await this.server.inject(req);

        assert.strictEqual(res.statusCode, 200);

        const responseBody: Payload = JSON.parse(res.payload);
        assert.strictEqual(responseBody.chainId, "1.2.11882");
        assert.strictEqual(responseBody.chainName, "t4h-charity");
        assert.strictEqual(responseBody.email, "charity@ht.com");
        assert.deepStrictEqual(responseBody.roles, ["charity"]);
    });

    it("get my user data store", async () => {
        // signin
        const localToken = await AuthHelper.getUserToken(this.server, "dcttesting1@gmail.com", "12345");
        // get
        const req = RequestHelper.getByMethod(HttpMethod.Get, "/user/me", ["accept", "auth"], null, localToken);
        const res = await this.server.inject(req);

        assert.strictEqual(res.statusCode, 200);

        const responseBody: Payload = JSON.parse(res.payload);
        assert.strictEqual(responseBody.chainId, "1.2.11885");
        assert.strictEqual(responseBody.chainName, "t4h-store1");
        assert.strictEqual(responseBody.email, "dcttesting1@gmail.com");
        assert.deepStrictEqual(responseBody.roles, ["store"]);
    });

    // /user/me PATCH
    it("change password charity", async () => {
        const req = RequestHelper.getByMethod(HttpMethod.Patch, "/user/me", ["accept", "content", "auth"], {
            oldPassword: "12345",
            password: "1234567",
        }, this.token);
        const res = await this.server.inject(req);

        assert.strictEqual(res.statusCode, 204);
    });

    it("change password store", async () => {
        // signin
        const localToken = await AuthHelper.getUserToken(this.server, "dcttesting1@gmail.com", "12345");
        // get
        const req = RequestHelper.getByMethod(HttpMethod.Patch, "/user/me", ["accept", "content", "auth"], {
            oldPassword: "12345",
            password: "1234567",
        }, localToken);
        const res = await this.server.inject(req);

        assert.strictEqual(res.statusCode, 204);
    });

    it("change password with incorrect old password", async () => {
        const req = RequestHelper.getByMethod(HttpMethod.Patch, "/user/me", ["accept", "content", "auth"], {
            oldPassword: "123",
            password: "1234567",
        }, this.token);
        const res = await this.server.inject(req);

        assert.strictEqual(res.statusCode, 422);
    });

    it("change password without old password", async () => {
        const req = RequestHelper.getByMethod(HttpMethod.Patch, "/user/me", ["accept", "content", "auth"], {
            password: "1234567",
        }, this.token);
        const res = await this.server.inject(req);

        assert.strictEqual(res.statusCode, 422);
    });

    it("change password with empty data", async () => {
        const req = RequestHelper.getByMethod(HttpMethod.Patch, "/user/me", ["accept", "content", "auth"], {}, this.token);
        const res = await this.server.inject(req);

        assert.strictEqual(res.statusCode, 400);
    });

    it("change password with invalid data", async () => {
        const req = RequestHelper.getByMethod(HttpMethod.Patch, "/user/me", ["accept", "content", "auth"], {
            invalidAttribute: "abc",
        }, this.token);
        const res = await this.server.inject(req);

        assert.strictEqual(res.statusCode, 400);
    });

    // /store/withdraw POST
    it("withdraw from store should not work", async () => {
        // signin
        const localToken = await AuthHelper.getUserToken(this.server, "dcttesting1@gmail.com", "12345");
        // withdraw
        const req = RequestHelper.getByMethod(HttpMethod.Post, "/store/withdraw", ["accept", "content", "auth"], {
            amount: "0.01",
        }, localToken);
        const res = await this.server.inject(req);

        assert.strictEqual(res.statusCode, 404);
    });
});
