import { RouteLink } from "../../plugins/router";
import { PayloadMetadata, SecurityMetadata, ValidationMetadata } from "./metadata";

export class RouteMetadataMount {
    public internal: boolean = false;
    public validation?: ValidationMetadata;
    public security?: SecurityMetadata;
    public payload?: PayloadMetadata;
    public linked?: RouteLink;
}
