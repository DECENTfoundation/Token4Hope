import "mocha";
import "reflect-metadata";

import { assert } from "chai";

import { container } from "../../../src/plugins/assembly/AssemblyPlugin";
import { ServerBootstrap } from "../../../src/server/Bootstrap";
import { HttpMethod } from "../../../src/utils/http";
import { DataFactory } from "../../models/factories/DataFactory";
import { DatastoreFactory } from "../../models/factories/DatastoreFactory";
import { SessionStoreFactory } from "../../models/factories/SessionStoreFactory";
import { RequestHelper } from "../../utils/RequestHelper";

describe("Monitoring controller test", () => {

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

    // general tests
    it("missing accept header", async () => {
        const req = RequestHelper.getByMethod(HttpMethod.Get, "/healthcheck");
        const res = await this.server.inject(req);

        assert.strictEqual(res.statusCode, 406);
    });

    // /healthcheck GET
    it("user login with incorrect credentials", async () => {
        const req = RequestHelper.getByMethod(HttpMethod.Get, "/healthcheck", ["accept"]);
        const res = await this.server.inject(req);

        assert.strictEqual(res.statusCode, 200);
    });
});
