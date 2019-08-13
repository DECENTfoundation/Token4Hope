import * as Hapi from "hapi";
import * as _ from "lodash";
import { Spec } from "swagger-schema-official";

import { ComparisonResult, RegexPattern } from "../../utils/foundation";
import { ObjectCheckOf } from "../../utils/foundation/class";
import { MimeType } from "../../utils/http";
import { Authorization, Version } from "../../utils/http/headers";

export class Agent {

    public authorization?: Authorization;
    public version: Version;

    public consumes: string[];
    public produces: string[];
    public accept: Map<string, Map<string, string[]>>;

    private rootPath: string;
    private method: string;

    constructor(source: Spec | Hapi.Request) {
        if (ObjectCheckOf<Hapi.Request>(source, "headers")) {
            this.parseUsingRequest(source);
        } else {
            this.parseUsingSpec(source);
        }
    }

    public isMultipart(): boolean {
        return this.is(MimeType.Multipart);
    }

    public is(mimetype: MimeType): boolean {
        return _.includes(this.consumes, mimetype);
    }

    public isSupported(other: Agent): boolean {
        const method = other.accept.get(this.rootPath);
        if (!_.isNil(method)) {
            if (_.isEmpty(_.intersection(this.produces, method.get(this.method)))) {
                return false;
            }
        }
        return _.includes([
            ComparisonResult.Descending,
            ComparisonResult.Same,
        ], this.version.compare(other.version));
    }

    private parseUsingSpec(spec: Spec) {
        this.accept = new Map();
        this.version = new Version(spec);
        this.consumes = spec.consumes || [];
        this.produces = spec.produces || [];

        Object.keys(spec.paths).forEach((pathKey) => {
            const rootPath = pathKey.split("/")[1];
            const pathObj = spec.paths[pathKey] as any;
            let rootAccept = this.accept.get(rootPath);
            if (_.isNil(rootAccept)) {
                rootAccept = new Map();
            }
            Object.keys(pathObj).forEach((methodKey) => {
                const methodObj = pathObj[methodKey];
                let acceptList = rootAccept.get(methodKey);
                if (_.isNil(acceptList)) {
                    acceptList = spec.produces;
                }
                if (!_.isNil(methodObj.produces)) {
                    acceptList = _.concat(acceptList, methodObj.produces);
                }
                rootAccept.set(methodKey, acceptList);
            });
            this.accept.set(rootPath, rootAccept);
        });
    }

    private parseUsingRequest(request: Hapi.Request) {
        const accept = request.headers.accept || "";
        const auth = request.headers.authorization || "";

        this.rootPath = request.url.path.split("/")[1];
        this.method = request.method;

        this.authorization = new Authorization(auth);
        this.version = new Version(accept);

        const result = _.takeRight(_.take(accept.match(RegexPattern.Accept), 3), 2);

        this.produces = _.isEmpty(result) ? [] : `${_.first(result)}/${_.last(result)}`.split(",");
        this.consumes = [];
    }
}
