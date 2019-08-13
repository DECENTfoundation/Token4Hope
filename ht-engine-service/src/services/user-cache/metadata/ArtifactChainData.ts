import { Payload } from "../../../utils/payload";

export interface ArtifactChainData extends Payload {
    chainData: {
        purchasedApps: string[];
    };
}
